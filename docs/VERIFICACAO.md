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
| **Perfil GitHub** | `https://github.com/aleffelix15` | **`HTTP 200 OK`** | Perfil público acessível e validado. |
| **Perfil LinkedIn** | `https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/` | `HTTP 999` (Authwall do LinkedIn) | URL oficial mantida; o LinkedIn restringe leitura automatizada sem sessão autenticada. |

---

## 2. Classificação Transparente de Imagens (Reais vs. Conceituais)

Conforme diretriz editorial do projeto, todas as imagens são identificadas de forma explícita nas legendas (`<figcaption>`):

1. **Capturas e Fotografias Reais**:
   - `public/screens/verso.webp` e `.avif` (`1200×750`): **Captura real** obtida diretamente da publicação ativa do projeto **Verso** (`https://verso-five-psi.vercel.app/`).
   - `public/screens/decode.webp` e `.avif` (`1200×750`): **Captura real** obtida diretamente da publicação ativa do projeto **DECODE** (`https://decode-ochre.vercel.app/`).
   - `public/images/about-setup.webp` e `.avif`: **Fotografia de arquivo** do ambiente de estudo e desenvolvimento.
2. **Ensaios Fotográficos Conceituais / Ilustrativos (Estúdio em Preto & Branco)**:
   - `public/images/studio-session.webp` e `.avif` (`1280×800`): **Imagem conceitual ilustrativa** em preto e branco (estúdio de concreto, poltronas de couro escuro, microfones articulados e notebook com código, **sem rostos ou pessoas fictícias**), identificada na legenda como `FIG. 00 — Ensaio conceitual ilustrativo`.
   - `public/images/studio-desk.webp` e `.avif` (`1120×700`): **Imagem conceitual ilustrativa** em preto e branco (bancada de desenvolvimento sobre madeira escura e concreto com teclado mecânico, fones de estúdio e microfone, **sem pessoas**), identificada na legenda como `FIG. 03 — Ensaio conceitual ilustrativo`.
