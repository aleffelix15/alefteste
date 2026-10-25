# Verificação Técnica de URLs, Repositórios, Ativos e Motion — Portfólio Álef Felix Teixeira

Data da verificação: **25 de outubro de 2026**

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
   - `public/images/studio-desk.webp` e `.avif` (`1120×700`): **Imagem conceitual ilustrativa** em preto e branco (bancada de desenvolvimento sobre madeira escura e concreto com teclado mecânico, fones de estúdio e microfone, **sem pessoas**), identificada na legenda como `ENSAIO CONCEITUAL · AMBIENTE DE ESTÚDIO E PRECISÃO TÉCNICA`.

---

## 3. Auditoria do Sistema de Animações e Coreografia Cinematográfica (Awwwards SOTD / FWA)

Implementado e auditado em **25/10/2026** com foco em performance GPU (60fps/120fps), fidelidade tipográfica local e acessibilidade rigorosa:

### 3.1. Tokens de Motion e Curvas Bézier Globais (`src/styles/tokens.css`)
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)`
- `--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1)`
- `--ease-curtain: cubic-bezier(0.77, 0, 0.175, 1)`
- `--scroll-velocity: 0` e `--scroll-skew: 0deg` (injetados dinamicamente no `documentElement`)

### 3.2. Motor de Física, Inércia e Cursor Contextual (`src/motion.ts`, `src/styles/motion.css`)
1. **`initScrollVelocityTracker()`**: Loop rAF otimizado que rastreia `scrollY`, interpola velocidade com lerp (`0.14`) e aplica inclinação limitada (`skew` entre `-5deg` e `5deg`). Só processa quando a velocidade amortecida for `> 0.05`.
2. **`attachMagneticEffect()`**: Sistema de atração magnética com dupla camada de profundidade (`strength = 0.28` no container e `innerStrength = 0.42` no elemento interno). Desativação automática em ponteiros touch e retorno suave com amortecimento.
3. **`attach3DTiltAndSpotlight()`**: Inclinação tridimensional com perspectiva de `1200px` (`maxTilt = 4.5deg`) combinada a feixe de luz radial de proximidade alimentado por `--mouse-x` e `--mouse-y`.
4. **`initCustomCursor()`**: Cursor flutuante leve com interpolação lerp (`0.18`) e 3 estados contextuais:
   - *Estado Padrão*: Ponto ciano de `8px × 8px`.
   - *Hover em Links/Botões (`[data-cursor="magnetic"]`)*: Anel de `36px` com `mix-blend-mode: difference`.
   - *Hover em Mídia de Projetos (`[data-cursor-label]`)*: Pílula editorial com `backdrop-filter: blur(10px)`, tipografia `DM Mono` (`dm-mono-500-latin.woff2`) exibindo rótulos editoriais como `[ EXPLORAR CASO ↗ ]`.

### 3.3. Coreografia de Abertura (`src/components/Preloader.tsx`, `src/components/OpeningSection.tsx`, `src/components/MonogramLogo.tsx`)
- **Preloader de Revista**: Contador progressivo (`000` → `100`) em `DM Mono` com saída em cortina curva física (`translate3d(0, -100%, 0)` em `0.95s` com `--ease-curtain`) achatando o arco inferior SVG.
- **Hero Title 3D**: Máscara tridimensional `.hero-line-mask-3d` com revelação de cada linha emergindo de `translate3d(0, 110%, 0) rotateX(-20deg)` para `translate3d(0, 0, 0) rotateX(0deg)` com *stagger* de `90ms` por linha em `1.1s var(--ease-out-expo)`.
- **MonogramLogo**: Traçado vetorial animado via `stroke-dasharray` / `stroke-dashoffset` e atração magnética interativa.
- **Parallax Diferencial no Hero**: Deslocamento diferencial entre o título principal e os metadados editoriais conforme o início do scroll.

### 3.4. Microinteração Tipográfica em Onda e Header Inteligente (`src/components/RollText.tsx`, `src/components/Header.tsx`)
- **`RollText` em Onda com Alternância Serif**: Quebra de string em células de caracteres com `--char-index`, transição escalonada de onda (`15ms` de delay por caractere) e nível inferior estilizado com `Playfair Display Italic` (`playfair-display-400-italic-latin.woff2`).
- **Header Direcional & Indicador Magnético**: Compactação inteligente ao rolar para baixo além de `120px` com `backdrop-filter: blur(14px)` e restauração imediata ao rolar para cima. Indicador ativo magnético GPU-First com `transform: scaleX()` e `transform-origin` dinâmico.

### 3.5. Faixa Editorial Reativa à Velocidade (`src/components/EditorialTickerBand.tsx`)
- Sincronização contínua entre a velocidade do scroll e o deslocamento horizontal do ticker, com inclinação `skewX(var(--scroll-skew))` nos itens e desaceleração suave de estúdio (playbackRate `0.22`) no hover.

### 3.6. Showcase Cinematográfico de Projetos (`src/components/ProjectsChapter.tsx`)
- **Revelação Dupla em Lâmina (*Blade Crossfade*)**: Camada 1 primária com máscara `clip-path: inset(12% 6% 12% 6% round 16px)` → `clip-path: inset(0% 0% 0% 0% round 16px)` e zoom-out `scale(1.12)` → `scale(1)` em `1.2s`. Camada 2 secundária com corte em lâmina `clip-path: polygon(...)` em `0.85s var(--ease-curtain)` com feixe especular brilhante acompanhando o corte.
- **Foco Seletivo**: No hover sobre um card de projeto, a opacidade dos cards irmãos é reduzida suavemente para `0.55` com `filter: grayscale(35%)`.

### 3.7. Narrativa Biográfica & Iluminação de Estúdio (`src/components/AboutChapter.tsx`, `src/components/TechChapter.tsx`)
- **Dupla Profundidade Fotográfica**: Parallax diferencial no scroll onde o retrato se move de `-3%` a `3%` e a mesa de estúdio responde de `6%` a `-6%`, com revelação de granulação editorial no hover.
- **Editorial Scroll Highlight**: Frases do manifesto transitando progressivamente de `opacity: 0.28` para `opacity: 1` conforme avançam pelo centro da viewport.
- **Mouse-Tracked Proximity Glow**: Borda iluminada em radial gradient de `420px` que se propaga pelos cards vizinhos ao ponteiro, acompanhada de micro-salto elástico nos ícones e decodificação scramble de `280ms` nos metadados `DM Mono`.

### 3.8. Botão Magnético de CV & Uncover Parallax no Rodapé (`src/components/CvButton.tsx`, `src/components/ContactChapter.tsx`, `src/components/Footer.tsx`)
- **CvButton com Directional Liquid Fill**: Preenchimento líquido radial a partir das coordenadas `--mouse-x` e `--mouse-y` da entrada do cursor, expandindo de `scale(0)` para `scale(2.8)` em `var(--ease-out-expo)`, com inversão de contraste e cascata vertical na seta de download.
- **CTA Cinético**: Letras de "Vamos conversar?" respondem à proximidade horizontal do ponteiro com inclinação/escala orgânica e seta diagonal de `45deg` em loop contínuo.
- **Uncover Parallax**: O rodapé emerge de trás de `ContactChapter.tsx` com assinatura monumental em escala de proporção editorial.

### 3.9. Testes de Compilação e Acessibilidade
- **Build de Produção**: `npm run build` executado com **código de saída 0 (zero erros e zero warnings)**.
- **Prefers-Reduced-Motion**: Testado rigorosamente em `src/styles/motion.css` e `src/motion.ts`; todas as transições espaciais são canceladas instantaneamente, mantendo acessibilidade e legibilidade plenas.
- **Semântica & Responsividade**: 100% de landmarks HTML preservados, sem `overflow-x` indesejado em resoluções mobile (`320px`), tablet (`768px`) e desktop (`1440px+`).
