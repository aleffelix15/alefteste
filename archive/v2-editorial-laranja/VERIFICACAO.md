# Verificação de Sites e Links Externos — Frente 0

**Data da verificação:** 22 de outubro de 2026 (`2026-10-22T20:40-03:00`)  
**Método:** Navegador real headless (Google Chrome 126 via Playwright, viewport `1440×900`) + inspeção de resposta HTTP.

---

## 1. Resumo das URLs Verificadas

| Alvo | URL | Status HTTP | Título da Página | Resultado | Observação |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **VERSO (Deploy)** | https://verso-five-psi.vercel.app/ | `200 OK` | `Fé que veste. — VERSO` | **Verificado (Online)** | Aplicação carregou integralmente com banner, navegação e catálogo streetwear. |
| **DECODE (Deploy)** | https://decode-ochre.vercel.app/ | `200 OK` | `DECODE — Descriptografando a Violência` | **Verificado (Online)** | Aplicação interativa carregou sem erros, exibindo tela inicial da campanha Agosto Lilás. |
| **GitHub (Perfil)** | https://github.com/aleffelix15 | `200 OK` | `aleffelix15 (Alef Felix Teixeira) · GitHub` | **Verificado (Online)** | Perfil público acessível e ativo. |
| **GitHub (VERSO)** | https://github.com/aleffelix15/verso | `200 OK` | `GitHub - aleffelix15/verso · GitHub` | **Verificado (Online)** | Repositório público acessível com código-fonte e documentação. |
| **GitHub (DECODE)** | https://github.com/aleffelix15/decode | `200 OK` | `GitHub - aleffelix15/decode · GitHub` | **Verificado (Online)** | Repositório público acessível (`decode-project` na branch `master`). |
| **LinkedIn** | https://www.linkedin.com/in/alef-felix-teixeira-a5030b236/ | `999` (Authwall) | `Cadastre-se \| LinkedIn` | **Não verificado** | O LinkedIn redireciona acessos automatizados/anônimos para `/authwall` (`HTTP 999`). A URL declarada em `src/data.ts` foi mantida sem inferência de conteúdo interno. |

---

## 2. Capturas de Tela e Ativos Locais (`public/screens/`)

As capturas de tela em `public/screens/` foram inspecionadas e comparadas com a renderização ao vivo dos projetos:

1. **`public/screens/verso.webp`**
   - **Dimensões:** `1200×750 px` (proporção 16:10)
   - **Tamanho:** `102.568 bytes` (~100,2 KB — abaixo do teto de 120 KB)
   - **Decisão:** Mantida. Representa fielmente a página inicial em produção (`https://verso-five-psi.vercel.app/`).

2. **`public/screens/decode.webp`**
   - **Dimensões:** `1200×641 px`
   - **Tamanho:** `16.510 bytes` (~16,1 KB — abaixo do teto de 120 KB)
   - **Decisão:** Mantida. Representa fielmente a tela inicial em produção (`https://decode-ochre.vercel.app/`).

---

## 3. Conformidade com `src/data.ts`

- Nenhuma URL de projeto ou repositório retornou erro `404` ou `5xx`.
- Os status `"Demo"` (VERSO) e `"Publicado"` (DECODE), bem como os textos de `"Limitações reais registradas"`, permanecem inalterados conforme exigido em `AUDITORIA.md`.
