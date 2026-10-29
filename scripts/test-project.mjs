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

// 1. Test vercel.json structure & security headers
test("vercel.json contém cabeçalhos de segurança obrigatórios", () => {
  const content = JSON.parse(fs.readFileSync("vercel.json", "utf-8"));
  assert.ok(content.headers, "vercel.json deve conter headers");
  const secHeader = content.headers.find(h => h.source && h.source.includes("curriculo-alef-felix"));
  assert.ok(secHeader, "Regra de cabeçalhos de segurança globais deve existir");
  const keys = secHeader.headers.map(h => h.key);
  assert.ok(keys.includes("Content-Security-Policy"), "Falta Content-Security-Policy");
  assert.ok(keys.includes("X-Frame-Options"), "Falta X-Frame-Options");
  assert.ok(keys.includes("X-Content-Type-Options"), "Falta X-Content-Type-Options");
  assert.ok(keys.includes("Referrer-Policy"), "Falta Referrer-Policy");
  assert.ok(keys.includes("Permissions-Policy"), "Falta Permissions-Policy");
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
    "public/fonts/dm-mono-400-latin.woff2"
  ];
  for (const a of assets) {
    assert.ok(fs.existsSync(a), `Asset obrigatório não encontrado: ${a}`);
  }
});

console.log(`\nResultado dos testes: ${passed} passaram, ${failed} falharam.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("Todos os testes passaram com sucesso!");
}
