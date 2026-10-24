# Verificação Técnica de URLs, Repositórios e Ativos — Portfólio Álef Felix Teixeira

Data da verificação: **22 de outubro de 2026**

---

## 1. Status das Publicações e Repositórios Oficiais

| Recurso | URL Verificada | Status HTTP / Resultado | Observação Factual |
| :--- | :--- | :--- | :--- |
| **Verso (URL histórica citada)** | `https://verso-sable.vercel.app/` | `HTTP 404 Not Found` (`DEPLOYMENT_NOT_FOUND`) | Reavaliada em 22/10/2026: o subdomínio `verso-sable` permanece desativado na Vercel. |
| **Verso (URL listada no GitHub)** | `https://verso-puce.vercel.app/` | `HTTP 404 Not Found` (`DEPLOYMENT_NOT_FOUND`) | Subdomínio antigo configurado no campo `homepage` do repositório também retorna `DEPLOYMENT_NOT_FOUND`. |
| **Verso (Deploy ativo do repositório)** | `https://verso-five-psi.vercel.app/` | **`HTTP 200 OK`** | **Operacional**. Título: `"Fé que veste. — VERSO"`. Utilizado no botão principal com nota de auditoria explícita sobre `verso-sable.vercel.app`. |
| **Verso (Repositório GitHub)** | `https://github.com/aleffelix15/verso` | **`HTTP 200 OK`** | `package.json` auditado: React 19, TypeScript 5.8, TanStack Start/Router/Query, Tailwind CSS 4, Framer Motion 14, Three.js, Zod, Vitest 4, SDK Mercado Pago. |
| **DECODE (Site publicado)** | `https://decode-ochre.vercel.app/` | **`HTTP 200 OK`** | **Operacional**. Experiência interativa Agosto Lilás funcionando no navegador (SPA). |
| **DECODE (Repositório GitHub)** | `https://github.com/aleffelix15/decode` | **`HTTP 200 OK`** | `decode-project/package.json` auditado: React 18, JavaScript (ES Modules), Vite 5, Tailwind CSS 3, Lucide React. |
| **NUDEMO (Site publicado)** | `https://nudem.vercel.app/` | **`HTTP 200 OK`** | **Operacional**. Título: `"Nubank Experience | Projeto demonstrativo"`. SPA com modelagem 3D WebGL (Three.js/R3F) e modo escuro. |
| **NUDEMO (Repositório GitHub)** | `https://github.com/aleffelix15/nudem` | **`HTTP 200 OK`** | `package.json` auditado: React 18.3, Three.js 0.160, @react-three/fiber 8.17, Framer Motion 11.15, Vite 5.4, Figtree Variable Font. |
| **Perfil GitHub** | `https://github.com/aleffelix15` | **`HTTP 200 OK`** | Perfil público acessível e validado. |
| **Perfil LinkedIn** | `https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/` | `HTTP 999` (Authwall do LinkedIn) | URL oficial mantida; o LinkedIn restringe leitura automatizada sem sessão autenticada. |

---

## 2. Classificação Transparente de Imagens (Reais vs. Conceituais)

Conforme diretriz editorial do projeto, todas as imagens são identificadas de forma explícita nas legendas (`<figcaption>`):

1. **Capturas e Fotografias Reais**:
   - `public/screens/verso.webp` e `.avif` (`1200×750`): **Captura real** obtida diretamente da publicação ativa do projeto **Verso** (`https://verso-five-psi.vercel.app/`).
   - `public/screens/decode.webp` e `.avif` (`1200×750`): **Captura real** obtida diretamente da publicação ativa do projeto **DECODE** (`https://decode-ochre.vercel.app/`).
   - `public/screens/nudemo-hero.webp`, `.avif` e `nudemo-app.webp`, `.avif` (`1200×750` e `640×400`): **Capturas reais** obtidas diretamente da publicação ativa do projeto **NUDEMO** (`https://nudem.vercel.app/`), cobrindo o cartão 3D físico e a interface Dark Mode do app.
   - `public/images/alef-portrait-bw.webp` e `.avif` (`1200×1500`): **Retrato real** em preto e branco de Álef Felix Teixeira (recurso LCP do Hero e composição de Sobre Mim).
2. **Ensaios Fotográficos Conceituais / Ilustrativos (Estúdio em Preto & Branco)**:
   - `public/images/studio-desk.webp` e `.avif` (`1120×700`): **Imagem conceitual ilustrativa** em preto e branco (bancada de desenvolvimento sobre madeira escura e concreto com teclado mecânico, fones de estúdio e microfone, **sem pessoas**), identificada na legenda como `FIG. 03 — Ensaio conceitual ilustrativo`.
