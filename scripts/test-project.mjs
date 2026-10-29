import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

console.log("=== EXECUTANDO TESTES AUTOMATIZADOS DO PROJETO ===\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

// Helper to recursively collect files
function getAllFiles(dir, filterFn) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        results = results.concat(getAllFiles(fullPath, filterFn));
      }
    } else if (!filterFn || filterFn(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

// 1. Test vercel.json structure & security headers (localizado pela presença da CSP)
test("vercel.json contém cabeçalhos de segurança obrigatórios e valores estritos", () => {
  const content = JSON.parse(fs.readFileSync("vercel.json", "utf-8"));
  assert.ok(content.headers, "vercel.json deve conter headers");
  
  // Localiza a regra global de headers pela presença da chave Content-Security-Policy
  const secRule = content.headers.find(h => Array.isArray(h.headers) && h.headers.some(hdr => hdr.key === "Content-Security-Policy"));
  assert.ok(secRule, "Regra global com Content-Security-Policy deve existir");
  
  const headerMap = new Map(secRule.headers.map(h => [h.key, h.value]));
  
  // CSP validation
  const csp = headerMap.get("Content-Security-Policy");
  assert.ok(csp, "Falta Content-Security-Policy na regra global");
  assert.ok(!csp.includes("'unsafe-eval'"), "CSP não pode conter 'unsafe-eval'");
  
  // Check script-src
  const scriptSrcMatch = csp.match(/script-src\s+([^;]+)/);
  assert.ok(scriptSrcMatch, "CSP deve definir script-src");
  assert.ok(!scriptSrcMatch[1].includes("'unsafe-inline'"), "script-src não pode conter 'unsafe-inline'");
  
  assert.ok(csp.includes("object-src 'none'"), "CSP deve conter object-src 'none'");
  assert.ok(csp.includes("base-uri 'self'"), "CSP deve conter base-uri 'self'");
  assert.ok(csp.includes("frame-ancestors 'none'"), "CSP deve conter frame-ancestors 'none'");
  
  // Security headers presence and values
  assert.strictEqual(headerMap.get("X-Content-Type-Options"), "nosniff", "X-Content-Type-Options deve ser nosniff");
  assert.strictEqual(headerMap.get("X-Frame-Options"), "DENY", "X-Frame-Options deve ser DENY");
  assert.ok(headerMap.has("Strict-Transport-Security"), "Falta Strict-Transport-Security (HSTS)");
  assert.strictEqual(headerMap.get("Cross-Origin-Opener-Policy"), "same-origin", "Cross-Origin-Opener-Policy (COOP) deve ser same-origin");
  assert.strictEqual(headerMap.get("Cross-Origin-Resource-Policy"), "same-origin", "Cross-Origin-Resource-Policy (CORP) deve ser same-origin");
  assert.ok(headerMap.has("Referrer-Policy"), "Falta Referrer-Policy");
  assert.ok(headerMap.has("Permissions-Policy"), "Falta Permissions-Policy");
});

// 2. Test index.html privacy & metadata
test("index.html não expõe número de telefone no JSON-LD", () => {
  const html = fs.readFileSync("index.html", "utf-8");
  assert.ok(!html.includes('"telephone"'), 'index.html ainda expõe o campo "telephone" no JSON-LD');
});

test("index.html possui metadados essenciais", () => {
  const html = fs.readFileSync("index.html", "utf-8");
  assert.ok(html.includes('<html lang="pt-BR">'), "Idioma deve ser pt-BR");
  assert.ok(html.includes('<meta name="viewport"'), "Viewport deve existir");
  assert.ok(html.includes('<meta property="og:title"'), "OpenGraph title deve existir");
});

// 3. Test data.ts integrity
test("src/data.ts possui todos os projetos e telas válidas", () => {
  const dataContent = fs.readFileSync("src/data.ts", "utf-8");
  assert.ok(dataContent.includes('id: "verso"'), "Projeto VERSO deve existir");
  assert.ok(dataContent.includes('id: "decode"'), "Projeto DECODE deve existir");
  assert.ok(dataContent.includes('id: "nudemo"'), "Projeto NUDEMO deve existir");
  
  // Verify that all declared screen base images exist on disk
  const screenMatches = Array.from(dataContent.matchAll(/base:\s*["']\/screens\/([^"']+)["']/g));
  assert.ok(screenMatches.length > 0, "Deve haver telas de projetos declaradas");
  for (const match of screenMatches) {
    const baseName = match[1];
    const avifPath = path.join("public", "screens", `${baseName}.avif`);
    const webpPath = path.join("public", "screens", `${baseName}.webp`);
    assert.ok(fs.existsSync(avifPath) || fs.existsSync(webpPath), `Imagem não encontrada para tela ${baseName}`);
  }
});

// 4. Test public assets
test("Assets estáticos críticos existem na pasta public/", () => {
  const assets = [
    "public/robots.txt",
    "public/sitemap.xml",
    "public/curriculo-alef-felix.pdf",
    "public/og-image.png",
    "public/favicon.svg",
    "public/fonts/bricolage-grotesque-latin.woff2",
    "public/fonts/dm-mono-400-latin.woff2",
    "public/404.html"
  ];
  for (const a of assets) {
    assert.ok(fs.existsSync(a), `Asset obrigatório não encontrado: ${a}`);
  }
});

// 5. Test XSS sinks in src/
test("src/ não contém sinks perigosos de XSS (dangerouslySetInnerHTML, innerHTML, eval)", () => {
  const srcFiles = getAllFiles("src", f => /\.(tsx?|jsx?)$/.test(f));
  const dangerousPatterns = [
    /dangerouslySetInnerHTML/,
    /\.innerHTML\b/,
    /\.outerHTML\b/,
    /\.insertAdjacentHTML\b/,
    /document\.write\b/,
    /\beval\s*\(/,
    /\bnew\s+Function\s*\(/
  ];
  
  for (const file of srcFiles) {
    const code = fs.readFileSync(file, "utf-8");
    for (const pattern of dangerousPatterns) {
      assert.ok(!pattern.test(code), `Padrão de XSS ${pattern} encontrado no arquivo ${file}`);
    }
  }
});

// 6. Test target="_blank" safety
test("Todos os links target='_blank' em src/ possuem rel com noopener", () => {
  const srcFiles = getAllFiles("src", f => /\.(tsx?|jsx?)$/.test(f));
  const linkRegex = /<a\b[^>]*target=["']_blank["'][^>]*>/gi;
  
  for (const file of srcFiles) {
    const code = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = linkRegex.exec(code)) !== null) {
      const tag = match[0];
      const hasRel = /rel=["'][^"']*noopener[^"']*["']/i.test(tag);
      assert.ok(hasRel, `Link externo target='_blank' sem rel='noopener' em ${file}: ${tag}`);
    }
  }
});

// 7. Test secrets and credentials exposure
test("Repositório não contém arquivos .env nem padrões de credenciais expostas", () => {
  const rootFiles = fs.readdirSync(".");
  const envFiles = rootFiles.filter(f => /^\.env(\..+)?$/i.test(f) && f !== ".env.example");
  assert.strictEqual(envFiles.length, 0, `Arquivos de ambiente encontrados: ${envFiles.join(", ")}`);
  
  const filesToCheck = getAllFiles("src", f => /\.(tsx?|jsx?|json|css)$/.test(f)).concat(["index.html", "vercel.json"]);
  const secretPatterns = [
    /\bsk-[a-zA-Z0-9_-]{20,}\b/,
    /\bghp_[a-zA-Z0-9]{30,}\b/,
    /\bAIza[0-9A-Za-z_-]{35}\b/,
    /\bAKIA[0-9A-Z]{16}\b/,
    /\bservice_role\b/i
  ];
  
  for (const file of filesToCheck) {
    const content = fs.readFileSync(file, "utf-8");
    for (const pattern of secretPatterns) {
      assert.ok(!pattern.test(content), `Possível credencial (${pattern}) encontrada no arquivo ${file}`);
    }
  }
});

console.log(`\nResultado dos testes: ${passed} passaram, ${failed} falharam.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("Todos os testes de segurança e integridade passaram com sucesso!");
}
