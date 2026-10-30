import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const cacheDirs = [
      path.join(os.homedir(), ".npm", "_npx"),
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "npm-cache", "_npx") : "",
    ].filter(Boolean);

    for (const npxCacheDir of cacheDirs) {
      if (!fs.existsSync(npxCacheDir)) continue;
      for (const entry of fs.readdirSync(npxCacheDir)) {
        const candidate = path.join(npxCacheDir, entry, "node_modules", "playwright", "index.mjs");
        if (fs.existsSync(candidate)) {
          return await import(pathToFileURL(candidate).href);
        }
      }
    }
    throw new Error("Playwright não encontrado. Execute `npx playwright install chromium`.");
  }
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function startStaticServer(port = 4173) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqUrl = (req.url || "/").split("?")[0];
      let filePath = path.join(DIST_DIR, reqUrl === "/" ? "index.html" : reqUrl);
      if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        const fourOhFour = path.join(DIST_DIR, "404.html");
        if (fs.existsSync(fourOhFour)) {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end(fs.readFileSync(fourOhFour));
          return;
        }
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      });
      res.end(fs.readFileSync(filePath));
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(null); // Server already running on port
      } else {
        reject(err);
      }
    });

    server.listen(port, "127.0.0.1", () => {
      resolve(server);
    });
  });
}

const VIEWPORTS = [
  { width: 320, height: 568, label: "320x568" },
  { width: 360, height: 740, label: "360x740" },
  { width: 375, height: 667, label: "375x667" },
  { width: 390, height: 844, label: "390x844" },
  { width: 414, height: 896, label: "414x896" },
  { width: 768, height: 1024, label: "768x1024" },
  { width: 820, height: 1180, label: "820x1180" },
  { width: 1024, height: 768, label: "1024x768" },
  { width: 1180, height: 820, label: "1180x820" },
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1920, height: 1080, label: "1920x1080" },
  { width: 667, height: 375, label: "667x375" },
  { width: 844, height: 390, label: "844x390" },
];

async function runAudit() {
  const mode = process.argv.includes("--before")
    ? "before"
    : process.argv.includes("--after")
    ? "after"
    : "current";

  const outDir = "/tmp/responsive";
  const subDir = path.join(outDir, mode);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(subDir, { recursive: true });

  const server = await startStaticServer(4173);
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });

  const allResults = [];

  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });

      await context.addInitScript(() => {
        try {
          window.sessionStorage.setItem("alef_editorial_preloader_v5", "seen");
        } catch {
          // ignore
        }
      });

      const page = await context.newPage();
      await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

      // Force eager loading on lazy images and scroll down to bottom to trigger IntersectionObservers
      await page.evaluate(async () => {
        const delay = (ms) => new Promise((r) => setTimeout(r, ms));
        document.querySelectorAll("img[loading='lazy']").forEach((img) => {
          img.setAttribute("loading", "eager");
        });
        const totalHeight = document.body.scrollHeight;
        const step = Math.max(250, Math.floor(window.innerHeight * 0.65));
        for (let y = 0; y <= totalHeight + step; y += step) {
          window.scrollTo(0, y);
          await delay(60);
        }
        window.scrollTo(0, 0);
        // Wait for reveal/curtain animations to finish
        await delay(1100);
      });

      // Ensure all images have finished loading and decoding
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll("img"));
        await Promise.all(
          imgs.map(async (img) => {
            if (!img.complete) {
              await new Promise((res) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", res, { once: true });
                setTimeout(res, 1500);
              });
            }
            if (typeof img.decode === "function") {
              try {
                await img.decode();
              } catch {
                // ignore
              }
            }
          })
        );
      });

      // Take full-page screenshot before injecting overflow-x: visible
      const screenshotPath = path.join(outDir, `${vp.label}.png`);
      const modeScreenshotPath = path.join(subDir, `${vp.label}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      fs.copyFileSync(screenshotPath, modeScreenshotPath);

      // Run measurements with html, body { overflow-x: visible !important }
      const report = await page.evaluate((checkTouchTargets) => {
        const prevHtmlOverflowX = document.documentElement.style.getPropertyValue("overflow-x");
        const prevBodyOverflowX = document.body.style.getPropertyValue("overflow-x");

        document.documentElement.style.setProperty("overflow-x", "visible", "important");
        document.body.style.setProperty("overflow-x", "visible", "important");

        const containedSections = Array.from(
          document.querySelectorAll(".hero-editorial-stage, .editorial-chapter")
        );
        const prevContains = containedSections.map((s) => s.style.getPropertyValue("contain"));
        containedSections.forEach((s) => s.style.setProperty("contain", "none", "important"));

        const vw = window.innerWidth;
        const docScrollWidth = document.documentElement.scrollWidth;
        const hasDocOverflow = docScrollWidth > vw;

        function getSelector(el) {
          if (!el || el.nodeType !== 1) return "";
          const tag = el.tagName.toLowerCase();
          const id = el.id ? `#${el.id}` : "";
          const cls =
            typeof el.className === "string" && el.className.trim()
              ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
              : "";
          return `${tag}${id}${cls}`;
        }

        function isVisible(el) {
          let cur = el;
          while (cur && cur.nodeType === 1) {
            if (cur.classList?.contains("sr-only") || cur.classList?.contains("skip-link")) {
              return false;
            }
            if (
              cur.getAttribute("aria-hidden") === "true" &&
              cur.classList?.contains("mobile-nav-drawer")
            ) {
              return false;
            }
            const style = window.getComputedStyle(cur);
            if (
              style.display === "none" ||
              style.visibility === "hidden" ||
              parseFloat(style.opacity) === 0
            ) {
              return false;
            }
            cur = cur.parentElement;
          }
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }

        function isClippedByHorizontalContainer(el) {
          let parent = el.parentElement;
          while (parent && parent !== document.body && parent !== document.documentElement) {
            const st = window.getComputedStyle(parent);
            const ox = st.overflowX;
            if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") {
              const pRect = parent.getBoundingClientRect();
              if (pRect.left >= -1 && pRect.right <= vw + 1) {
                return true;
              }
            }
            parent = parent.parentElement;
          }
          return false;
        }

        const overflowingElements = [];
        const smallTextElements = [];
        const clippedTextElements = [];

        const allElements = Array.from(document.querySelectorAll("*"));
        for (const el of allElements) {
          if (!isVisible(el)) continue;
          const rect = el.getBoundingClientRect();

          // 1. Horizontal overflow check
          if ((rect.right > vw + 1 || rect.left < -1) && !isClippedByHorizontalContainer(el)) {
            overflowingElements.push({
              selector: getSelector(el),
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
            });
          }

          // Check direct text content
          const hasDirectText = Array.from(el.childNodes).some(
            (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
          );

          const style = window.getComputedStyle(el);

          // 2. Font-size < 12px
          if (hasDirectText) {
            const fontSize = parseFloat(style.fontSize);
            if (fontSize < 11.95) {
              smallTextElements.push({
                selector: getSelector(el),
                fontSize: Math.round(fontSize * 100) / 100,
                text: el.textContent.trim().slice(0, 40),
              });
            }
          }

          // 3. Clipped text elements (scrollWidth > clientWidth with overflow hidden/clip)
          if (
            hasDirectText &&
            (style.overflowX === "hidden" || style.overflowX === "clip") &&
            !el.classList.contains("ticker-track-viewport") &&
            el.scrollWidth > el.clientWidth + 1
          ) {
            clippedTextElements.push({
              selector: getSelector(el),
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth,
              text: el.textContent.trim().slice(0, 40),
            });
          }
        }

        // 4. Touch targets (< 44x44px) on viewports <= 768px
        const smallTouchTargets = [];
        const interactiveEls = Array.from(
          document.querySelectorAll('a, button, [role="button"], input')
        ).filter((el) => isVisible(el));

        if (checkTouchTargets) {
          for (const el of interactiveEls) {
            const rect = el.getBoundingClientRect();
            if (rect.width < 43.5 || rect.height < 43.5) {
              smallTouchTargets.push({
                selector: getSelector(el),
                width: Math.round(rect.width * 10) / 10,
                height: Math.round(rect.height * 10) / 10,
                text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 35),
              });
            }
          }
        }

        // 5. Overlapping clickable elements
        const overlappingClickables = [];
        for (let i = 0; i < interactiveEls.length; i++) {
          for (let j = i + 1; j < interactiveEls.length; j++) {
            const a = interactiveEls[i];
            const b = interactiveEls[j];
            if (a.contains(b) || b.contains(a)) continue;
            const stA = window.getComputedStyle(a);
            const stB = window.getComputedStyle(b);
            if (stA.pointerEvents === "none" || stB.pointerEvents === "none") continue;

            const rA = a.getBoundingClientRect();
            const rB = b.getBoundingClientRect();
            const overlapX = Math.min(rA.right, rB.right) - Math.max(rA.left, rB.left);
            const overlapY = Math.min(rA.bottom, rB.bottom) - Math.max(rA.top, rB.top);
            if (overlapX > 1 && overlapY > 1) {
              overlappingClickables.push({
                a: getSelector(a),
                b: getSelector(b),
                overlapX: Math.round(overlapX),
                overlapY: Math.round(overlapY),
              });
            }
          }
        }

        // Restore styles
        containedSections.forEach((s, idx) => {
          if (prevContains[idx]) {
            s.style.setProperty("contain", prevContains[idx]);
          } else {
            s.style.removeProperty("contain");
          }
        });
        if (prevHtmlOverflowX) {
          document.documentElement.style.setProperty("overflow-x", prevHtmlOverflowX);
        } else {
          document.documentElement.style.removeProperty("overflow-x");
        }
        if (prevBodyOverflowX) {
          document.body.style.setProperty("overflow-x", prevBodyOverflowX);
        } else {
          document.body.style.removeProperty("overflow-x");
        }

        return {
          docScrollWidth,
          innerWidth: vw,
          hasDocOverflow,
          overflowingElements,
          smallTouchTargets,
          smallTextElements,
          clippedTextElements,
          overlappingClickables,
        };
      }, vp.width <= 768);

      // Also check mobile drawer when opened on viewports <= 1024px
      let mobileDrawerReport = null;
      if (vp.width <= 1024) {
        const toggleBtn = await page.$(".mobile-menu-toggle");
        if (toggleBtn) {
          await toggleBtn.click();
          await page.waitForTimeout(300);
          mobileDrawerReport = await page.evaluate((checkTouch) => {
            const drawer = document.getElementById("mobile-nav-drawer");
            if (!drawer) return null;
            const style = window.getComputedStyle(drawer);
            const isScrollable =
              style.overflowY === "auto" || style.overflowY === "scroll";
            const smallTargets = [];
            if (checkTouch) {
              const links = drawer.querySelectorAll("a, button");
              for (const el of links) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && (r.width < 43.5 || r.height < 43.5)) {
                  smallTargets.push({
                    selector: `${el.tagName.toLowerCase()}.${el.className.trim().split(/\s+/).join(".")}`,
                    width: Math.round(r.width * 10) / 10,
                    height: Math.round(r.height * 10) / 10,
                    text: (el.textContent || "").trim().slice(0, 30),
                  });
                }
              }
            }
            return {
              isScrollable,
              scrollHeight: drawer.scrollHeight,
              clientHeight: drawer.clientHeight,
              smallTargets,
            };
          }, vp.width <= 768);
          await toggleBtn.click();
          await page.waitForTimeout(100);
        }
      }

      allResults.push({
        viewport: vp.label,
        width: vp.width,
        height: vp.height,
        ...report,
        mobileDrawerReport,
      });

      await context.close();
    }
  } finally {
    await browser.close();
    if (server) server.close();
  }

  const reportJsonPath = path.join(outDir, `report-${mode}.json`);
  fs.writeFileSync(reportJsonPath, JSON.stringify(allResults, null, 2));

  console.log(`\n=== RELATÓRIO DE AUDITORIA RESPONSIVA (${mode.toUpperCase()}) ===\n`);
  let totalIssues = 0;
  for (const r of allResults) {
    const drawerSmall = r.mobileDrawerReport?.smallTargets?.length || 0;
    const overflowCount = r.overflowingElements.length;
    const touchCount = r.smallTouchTargets.length + drawerSmall;
    const textCount = r.smallTextElements.length;
    const clipCount = r.clippedTextElements.length;
    const overlapCount = r.overlappingClickables.length;

    totalIssues += overflowCount + touchCount + textCount + clipCount + overlapCount;

    console.log(
      `[${r.viewport.padEnd(9)}] scrollW=${r.docScrollWidth}/${r.innerWidth} | ` +
        `Estouro: ${overflowCount} (doc:${r.hasDocOverflow ? "SIM" : "NÃO"}) | ` +
        `Toque<44px: ${touchCount} | ` +
        `Texto<12px: ${textCount} | ` +
        `Cortado: ${clipCount} | ` +
        `Overlap: ${overlapCount}`
    );
  }
  console.log(`\nTotal de ocorrências encontradas: ${totalIssues}`);
  console.log(`Relatório detalhado salvo em: ${reportJsonPath}`);
  if (mode !== "before" && totalIssues > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
