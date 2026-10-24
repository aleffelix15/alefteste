/**
 * Coreografia de Movimento Editorial v2 — Álef Felix Teixeira
 * - Revelação em máscara tipográfica (.line-mask > .line-inner) e capítulos via IntersectionObserver + fallback no scroll
 * - Cortina de revelação fotográfica de câmara escura (.photo-curtain-wrap)
 * - Decodificação monoespaçada (cipher scramble) nos índices de capítulo ([data-scramble])
 * - Cursor editorial contextual ([data-editorial-cursor] + [data-cursor-label]) com interpolação suave
 * - Paralaxe suave de profundidade no cenário fotográfico do estúdio (Hero)
 * - Botões e links magnéticos ([data-magnetic]) + texto em rolagem dupla (.hover-roll-text)
 * - Luz direcional sutil de estúdio ([data-tilt-card]) em dispositivos com ponteiro fino (sem tilt 3D exagerado)
 * - Acordeão técnico suave via Web Animations API (details[data-animated-details])
 * - Respeito estrito a prefers-reduced-motion: reduce
 */

const CIPHER_GLYPHS = "0123456789/—·#";

export function initPortfolioMotion(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const root = document.documentElement;

  const cleanups: Array<() => void> = [];
  let rafScrollId = 0;

  const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
  const header = document.querySelector<HTMLElement>(".site-header");
  const heroParallaxEl = document.querySelector<HTMLElement>("[data-hero-parallax]");
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const chapterSections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter-section]"));

  // Controle de scramble para índices monoespaçados ([data-scramble])
  const scrambledDone = new WeakSet<HTMLElement>();
  const activeScrambleTimers = new Set<number>();

  const triggerScrambleInside = (container: HTMLElement) => {
    if (reducedMotionQuery.matches) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-scramble]"));
    for (const el of targets) {
      if (scrambledDone.has(el)) continue;
      scrambledDone.add(el);

      const finalStr = el.getAttribute("data-scramble") || el.textContent || "";
      if (!finalStr) continue;

      el.setAttribute("aria-label", finalStr);
      const totalSteps = 10;
      let step = 0;

      const intervalId = window.setInterval(() => {
        step += 1;
        if (step >= totalSteps || reducedMotionQuery.matches) {
          el.textContent = finalStr;
          window.clearInterval(intervalId);
          activeScrambleTimers.delete(intervalId);
          return;
        }

        const lockCount = Math.floor((step / totalSteps) * finalStr.length);
        let nextText = "";
        for (let i = 0; i < finalStr.length; i++) {
          const ch = finalStr[i];
          if (ch === " " || i < lockCount) {
            nextText += ch;
          } else {
            nextText += CIPHER_GLYPHS[(i + step * 3) % CIPHER_GLYPHS.length];
          }
        }
        el.textContent = nextText;
      }, 32);

      activeScrambleTimers.add(intervalId);
    }
  };

  cleanups.push(() => {
    for (const timerId of activeScrambleTimers) {
      window.clearInterval(timerId);
    }
    activeScrambleTimers.clear();
  });

  const markElementVisible = (el: HTMLElement) => {
    if (!el.classList.contains("is-visible")) {
      el.classList.add("is-visible");
      triggerScrambleInside(el);
    }
  };

  const revealVisibleInViewport = () => {
    const vh = window.innerHeight;
    for (const el of revealElements) {
      if (el.classList.contains("is-visible")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.96) {
        markElementVisible(el);
      }
    }
    for (const sec of chapterSections) {
      if (sec.classList.contains("is-chapter-drawn")) continue;
      const rect = sec.getBoundingClientRect();
      if (rect.top <= vh * 0.92) {
        sec.classList.add("is-chapter-drawn");
      }
    }
  };

  // 1. Barra de leitura de capítulo, cabeçalho compacto & paralaxe suave do estúdio
  const updateScrollMetrics = () => {
    rafScrollId = 0;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (header) {
      header.classList.toggle("is-compact", scrollY > 32);
    }

    if (heroParallaxEl) {
      if (!reducedMotionQuery.matches && scrollY < window.innerHeight * 1.4) {
        const offset = Math.min(72, scrollY * 0.12);
        heroParallaxEl.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
      } else {
        heroParallaxEl.style.setProperty("--hero-parallax-y", "0px");
      }
    }

    revealVisibleInViewport();
  };

  const onScroll = () => {
    if (!rafScrollId) {
      rafScrollId = window.requestAnimationFrame(updateScrollMetrics);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafScrollId) {
      window.cancelAnimationFrame(rafScrollId);
    }
  });

  // 2. Revelação gradual durante a rolagem (IntersectionObserver + fallback imediato)
  let observer: IntersectionObserver | null = null;

  const setupReveal = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ready");
      for (const el of revealElements) {
        el.classList.add("is-visible");
      }
      for (const sec of chapterSections) {
        sec.classList.add("is-chapter-drawn");
      }
      return;
    }

    const vh = window.innerHeight;
    const initiallyVisible = new Set<HTMLElement>();
    for (const el of revealElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.96) {
        initiallyVisible.add(el);
      }
    }

    root.classList.add("motion-ready");

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
            const target = entry.target as HTMLElement;
            markElementVisible(target);
            observer?.unobserve(target);
          }
        }
      },
      {
        rootMargin: "0px 0px 48px 0px",
        threshold: 0.01,
      }
    );

    for (const el of revealElements) {
      if (initiallyVisible.has(el)) {
        markElementVisible(el);
      } else {
        observer.observe(el);
      }
    }
  };

  setupReveal();
  onScroll();

  const onReducedMotionChange = () => {
    setupReveal();
    updateScrollMetrics();
  };

  reducedMotionQuery.addEventListener("change", onReducedMotionChange);
  cleanups.push(() => {
    reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
    observer?.disconnect();
    root.classList.remove("motion-ready");
  });

  // 3. Luz direcional sutil nas pranchas e cartões ([data-tilt-card])
  const plateElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));

  for (const plateEl of plateElements) {
    let spotRaf = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (spotRaf) window.cancelAnimationFrame(spotRaf);

      spotRaf = window.requestAnimationFrame(() => {
        spotRaf = 0;
        const rect = plateEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const relX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const relY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

        plateEl.style.setProperty("--spot-x", `${(relX * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-y", `${(relY * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-opacity", "1");
      });
    };

    const handlePointerLeave = () => {
      if (spotRaf) {
        window.cancelAnimationFrame(spotRaf);
        spotRaf = 0;
      }
      plateEl.style.setProperty("--spot-opacity", "0");
    };

    plateEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    plateEl.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    cleanups.push(() => {
      if (spotRaf) window.cancelAnimationFrame(spotRaf);
      plateEl.removeEventListener("pointermove", handlePointerMove);
      plateEl.removeEventListener("pointerleave", handlePointerLeave);
    });
  }

  // 4. Botões e links magnéticos ([data-magnetic])
  const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

  for (const magEl of magneticElements) {
    let magRaf = 0;

    const onMagMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (magRaf) window.cancelAnimationFrame(magRaf);

      magRaf = window.requestAnimationFrame(() => {
        magRaf = 0;
        const rect = magEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = Math.max(-7, Math.min(7, (clientX - centerX) * 0.16));
        const deltaY = Math.max(-5, Math.min(5, (clientY - centerY) * 0.16));

        magEl.style.setProperty("--mag-x", `${deltaX.toFixed(2)}px`);
        magEl.style.setProperty("--mag-y", `${deltaY.toFixed(2)}px`);
      });
    };

    const onMagLeave = () => {
      if (magRaf) {
        window.cancelAnimationFrame(magRaf);
        magRaf = 0;
      }
      magEl.style.setProperty("--mag-x", "0px");
      magEl.style.setProperty("--mag-y", "0px");
    };

    magEl.addEventListener("pointermove", onMagMove, { passive: true });
    magEl.addEventListener("pointerleave", onMagLeave, { passive: true });

    cleanups.push(() => {
      if (magRaf) window.cancelAnimationFrame(magRaf);
      magEl.removeEventListener("pointermove", onMagMove);
      magEl.removeEventListener("pointerleave", onMagLeave);
    });
  }

  // 5. Acordeão técnico com Web Animations API (details[data-animated-details])
  const detailsElements = Array.from(
    document.querySelectorAll<HTMLDetailsElement>("details[data-animated-details]")
  );

  for (const detailsEl of detailsElements) {
    const summaryEl = detailsEl.querySelector<HTMLElement>("summary");
    const contentEl = detailsEl.querySelector<HTMLElement>(".audit-drawer");
    if (!summaryEl || !contentEl) continue;

    let currentAnimation: Animation | null = null;

    const onSummaryClick = (e: MouseEvent) => {
      if (reducedMotionQuery.matches || typeof detailsEl.animate !== "function") {
        return;
      }

      e.preventDefault();

      if (currentAnimation) {
        currentAnimation.cancel();
      }

      const startHeight = `${detailsEl.offsetHeight}px`;

      if (detailsEl.open) {
        const endHeight = `${summaryEl.offsetHeight + 20}px`;
        detailsEl.style.overflow = "hidden";

        currentAnimation = detailsEl.animate(
          { height: [startHeight, endHeight] },
          { duration: 280, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );

        currentAnimation.onfinish = () => {
          detailsEl.open = false;
          detailsEl.style.height = "";
          detailsEl.style.overflow = "";
          currentAnimation = null;
        };
        currentAnimation.oncancel = () => {
          detailsEl.style.height = "";
          detailsEl.style.overflow = "";
        };
      } else {
        detailsEl.open = true;
        const endHeight = `${detailsEl.offsetHeight}px`;
        detailsEl.style.overflow = "hidden";

        currentAnimation = detailsEl.animate(
          { height: [startHeight, endHeight] },
          { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );

        currentAnimation.onfinish = () => {
          detailsEl.style.height = "";
          detailsEl.style.overflow = "";
          currentAnimation = null;
        };
        currentAnimation.oncancel = () => {
          detailsEl.style.height = "";
          detailsEl.style.overflow = "";
        };
      }
    };

    summaryEl.addEventListener("click", onSummaryClick);
    cleanups.push(() => {
      summaryEl.removeEventListener("click", onSummaryClick);
      currentAnimation?.cancel();
    });
  }

  // 6. Cursor Editorial Contextual ([data-editorial-cursor])
  const cursorEl = document.querySelector<HTMLElement>("[data-editorial-cursor]");
  const cursorTextEl = document.querySelector<HTMLElement>("[data-editorial-cursor-text]");

  if (cursorEl && cursorTextEl) {
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let cursorRaf = 0;
    let cursorVisible = false;

    const updateCursorPosition = () => {
      cursorRaf = 0;
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;

      cursorEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
        cursorRaf = window.requestAnimationFrame(updateCursorPosition);
      }
    };

    const onWindowPointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) {
        cursorEl.classList.remove("is-active", "has-label");
        return;
      }

      targetX = e.clientX;
      targetY = e.clientY;

      if (!cursorVisible) {
        currentX = targetX;
        currentY = targetY;
        cursorVisible = true;
        cursorEl.classList.add("is-active");
      }

      const targetNode = e.target as HTMLElement | null;
      const labeledAncestor = targetNode?.closest<HTMLElement>("[data-cursor-label]");

      if (labeledAncestor) {
        const label = labeledAncestor.getAttribute("data-cursor-label") || "";
        if (cursorTextEl.textContent !== label) {
          cursorTextEl.textContent = label;
        }
        cursorEl.classList.add("has-label");
      } else {
        cursorEl.classList.remove("has-label");
      }

      if (!cursorRaf) {
        cursorRaf = window.requestAnimationFrame(updateCursorPosition);
      }
    };

    const onWindowPointerLeave = () => {
      cursorVisible = false;
      cursorEl.classList.remove("is-active", "has-label");
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    document.addEventListener("mouseleave", onWindowPointerLeave, { passive: true });

    cleanups.push(() => {
      if (cursorRaf) window.cancelAnimationFrame(cursorRaf);
      window.removeEventListener("pointermove", onWindowPointerMove);
      document.removeEventListener("mouseleave", onWindowPointerLeave);
    });
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
