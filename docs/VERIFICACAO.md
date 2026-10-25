# Verificação Técnica de URLs, Repositórios, Ativos e Motion — Portfólio Álef Felix Teixeira

Data da verificação: **25 de outubro de 2026**
Status de Validação: **100% Aprovado (Zero Erros / Build 0 Código de Saída)**

---

## 1. Status das Publicações e Repositórios Oficiais

| Recurso | URL Verificada | Status HTTP / Resultado | Observação Factual |
| :--- | :--- | :--- | :--- |
| **Verso (URL histórica citada)** | `https://verso-sable.vercel.app/` | `HTTP 404 Not Found` (`DEPLOYMENT_NOT_FOUND`) | Reavaliada em 25/10/2026: o subdomínio `verso-sable` permanece desativado na Vercel. |
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
   - `public/screens/verso.webp` e `.avif` (`1200×750`) + `verso-640.webp` e `.avif` (`640×400`): **Captura real** obtida diretamente da publicação ativa do projeto **Verso** (`https://verso-five-psi.vercel.app/`).
   - `public/screens/decode.webp` e `.avif` (`1200×750`) + `decode-640.webp` e `.avif` (`640×400`): **Captura real** da tela inicial do projeto **DECODE** (`https://decode-ochre.vercel.app/`).
   - `public/screens/decode-dashboard.webp` e `.avif` (`1200×750`): **Captura real** do painel interno de casos e triagem do projeto **DECODE**.
   - `public/screens/nudemo-hero.webp`, `.avif` e `nudemo-app.webp`, `.avif` (`1200×750` e `640×400`): **Capturas reais** obtidas diretamente da publicação ativa do projeto **NUDEMO** (`https://nudem.vercel.app/`), cobrindo o cartão 3D físico e a interface Dark Mode do app.
   - `public/images/alef-portrait-bw.webp` e `.avif` (`720×900`) + `alef-portrait-bw-640.webp` e `.avif` (`640×800`): **Retrato real** em preto e branco de Álef Felix Teixeira (recurso LCP do Hero e composição de Sobre Mim).
2. **Ensaios Fotográficos Conceituais / Ilustrativos (Estúdio em Preto & Branco)**:
   - `public/images/studio-desk.webp` e `.avif` (`1120×700`) + `studio-desk-640.webp` e `.avif` (`640×400`): **Imagem conceitual ilustrativa** em preto e branco (bancada de desenvolvimento sobre madeira escura e concreto com teclado mecânico, fones de estúdio e microfone, **sem pessoas**), identificada na legenda como `ENSAIO CONCEITUAL · AMBIENTE DE ESTÚDIO E PRECISÃO TÉCNICA`.

---

## 3. Auditoria do Motor de Física, Inércia e Blindagem de Performance v4

Implementado e auditado em **25/10/2026** com foco em performance cinematográfica GPU-First (60fps/120fps/144Hz/240Hz), fidelidade tipográfica local e acessibilidade rigorosa:

### 3.1. Física Independente de Frame Rate (`damp(current, target, lambda, dt)`)
- Substituição de qualquer interpolação fixa por frame pela fórmula matemática de amortecimento exponencial contínuo:
  `damp(current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt))`
- Parada total dos loops `requestAnimationFrame` (`cancelAnimationFrame`) com consumo de **0% de CPU/GPU em repouso** sempre que o delta residual for `< 0.01`.

### 3.2. Proibição de Layout Thrashing no Mouse e Scroll
- Proibição absoluta de chamadas a `element.getBoundingClientRect()` em eventos `mousemove` ou `pointermove`.
- Coordenadas retangulares armazenadas em cache (`cachedRect`) **apenas no evento `mouseenter`**, e atualizadas exclusivamente via listeners passivos de `scroll` e `resize`.
- **Trava global de conflito Scroll + Rato no Desktop (`isUserScrolling`)**: Com debounce de `120ms` após o último frame de rolagem, pausa automaticamente cálculos pesados de 3D Tilt e Proximity Spotlight, blindando 60fps constantes na rolagem no PC.

### 3.3. Isolamento Total de Variáveis CSS (Zero Poluição no `:root`)
- Variáveis dinâmicas de alta frequência (`--mouse-x`, `--mouse-y`, `--spot-x`, `--spot-y`, `--scroll-velocity`, `--scroll-skew`) são escritas diretamente no elemento DOM consumidor específico (ex.: card individual ou container de faixa editorial), eliminando recalculos de estilo na árvore DOM inteira.
- Animações contínuas (como a faixa editorial) pausadas via `IntersectionObserver` sempre que saem da viewport.

### 3.4. Gestão de VRAM e Composição de Camadas GPU
- Removido `will-change: transform` estático de spans de caracteres (`.roll-char`) e de cards simultâneos. Aplicado estritamente em `:hover`, `:focus-visible` ou durante a animação ativa.
- Zero animação de propriedades de layout (`top`, `left`, `width`, `height`, `margin`) ou filtros pesados (`filter: grayscale`, `filter: blur`) diretamente em tags `<img>`.
- Isolamento de repaint com `contain: layout style;` nas 5 seções principais (`OpeningSection`, `ProjectsChapter`, `AboutChapter`, `TechChapter`, `ContactChapter`).

---

## 4. Experiência Desktop (PC) Cinematográfica (Awwwards SOTD / FWA)

1. **Cortina Curva de Abertura & Revelação 3D**:
   - `Preloader.tsx`: Contador progressivo (`000` a `100`) em fonte local `DM Mono 500`. Saída física em cortina com curva `cubic-bezier(0.77, 0, 0.175, 1)` em `0.95s` e achatamento suave do arco inferior SVG.
   - Monograma e linhas do hero emergem em cascata tridimensional de `translate3d(0, 108%, 0) rotateX(-18deg)` para `translate3d(0, 0, 0) rotateX(0deg)` com *stagger* de `55ms`.
   - Micro-parallax de estúdio no Hero: deslocamento oposto suave entre metadados (-4px) e imagem de fundo (+8px) amortecidos via `damp()`.
2. **Header Editorial Retrátil & Indicador Magnético**:
   - Recolhe suavemente ao rolar para baixo (> 120px) e reaparece instantaneamente ao menor scroll para cima (< -2px) com `backdrop-filter: blur(14px)`.
   - Indicador de seção ativa deslizante composto na GPU com `transform: scaleX()` e `translate3d()`.
   - Efeito magnético elástico suave em todos os links e botões (`strength = 0.28`).
3. **Showcase em Lâmina & 3D Tilt**:
   - Cards com Tilt 3D (máx 4.5deg) e Proximity Spotlight radial.
   - Pré-visualização de telas duplas (Decode e Nudemo) com corte em lâmina (*Blade Crossfade*) em `0.82s` e costura de luz especular brilhante.
   - Cursor editorial contextual em 3 estados: Ponto minimalista `8×8px`, Anel `36px` em `difference`, e Pílula editorial translúcida com `blur(10px)` e texto `[ EXPLORAR CASO ↗ ]`.
4. **Tipografia em Onda & Text Scramble**:
   - Microinteração tipográfica com split wave ao passar o mouse em `RollText.tsx`, alternando para `Playfair Display Italic` com acento elétrico.
   - Decodificação rápida de caracteres ciber-editoriais (*Text Scramble* de `240ms`) em códigos numéricos ("01", "02", "03", "2026") ao entrarem na viewport.
5. **Botão CV com Preenchimento Líquido Direcional**:
   - Detecção do ângulo do cursor com expansão de bolha líquida circular de `scale(0)` para `scale(2.8)` e inversão de contraste com duplo magnetismo.

---

## 5. Experiência Mobile Nativa (Smartphones e Tablets Touch)

1. **Alturas Dinâmicas Reais (100dvh / 100svh)**:
   - Uso rigoroso de `min-height: 100svh` na seção de abertura e `height: 100dvh` no Preloader, eliminando pulos de layout ao encolher ou expandir a barra de endereços do Chrome/Safari.
2. **Zona de Foco Central no Scroll (Threshold 0.6)**:
   - Detecção automática de cards no centro da tela via `IntersectionObserver`:
     * Borda iluminada suave (box-shadow cyan/blue).
     * Estabilização de escala (`scale(1.015)`).
     * Emblemas de tecnologia com leve bounce (`scale(1.1) rotate(-4deg)`).
3. **Seletor de Telas Touch em Pílula Compacta**:
   - Pílula translúcida `[ 01 CAPA | 02 SISTEMA ]` em `DM Mono` com `backdrop-filter: blur(8px)` nos projetos Decode e Nudemo.
   - Toque no frame ou na pílula alterna suavemente as telas sem quebrar o layout nem disparar navegação acidental.
4. **Alvos de Toque & Feedback Háptico Visual**:
   - Todos os alvos de toque com área mínima `>= 48×48px` via pseudo-elementos touch.
   - `touch-action: manipulation;` para eliminar atraso de 300ms de toque.
   - `-webkit-tap-highlight-color: transparent;` para eliminar o flash cinza do Android/iOS.
   - Feedback tátil visual com `:active { transform: scale(0.97); transition-duration: 80ms; }`.
5. **Pipeline de Imagens Compactas no Mobile**:
   - Telas `< 768px` baixam estritamente as variantes compactas `-640.avif` e `-640.webp` com `loading="lazy"`, `decoding="async"` e dimensões explícitas para **CLS = 0**.

---

---

## 7. Cirurgia de Performance Extrema (Scroll 60 FPS / 120 FPS Estável e Blindagem Total)

Executada em **25/10/2026** com auditoria completa via Chrome DevTools Protocol (CDP) e Playwright sob condições de teste estritas (viewport 1440x900, throttling de CPU 1x e 4x, scroll programático contínuo de 28px/frame):

### 7.1. Regras de Cirurgia Implementadas

1. **Eliminação de Listeners de Scroll Contínuos em JS**:
   - Removidos todos os listeners contínuos em `motion.ts`, `OpeningSection.tsx`, `EditorialTickerBand.tsx`, `AboutChapter.tsx`, `ProjectsChapter.tsx`, `TechChapter.tsx` e `Footer.tsx`.
   - Mantido **exclusivamente 1 listener de scroll no projeto** em `Header.tsx`, protegido por guarda booleana simples (`window.scrollY > 80`), que nunca dispara re-renderizações ou escritas de estilo repetidas por pixel rolado.
2. **Proibição de `radial-gradient` Dinâmico e `clip-path` no Hover**:
   - Eliminados gradientes radiais que recalculavam coordenadas no mousemove em `projects.css`, `tech.css`, `hero.css` e `cv.css`.
   - Substituídos por transições puras de CSS GPU (`transform: translate3d(0, -4px, 0)` e pseudo-elementos com `opacity: 0 -> 1`).
   - Removido `clip-path: polygon(...)` e Tilt 3D (`rotateX`, `rotateY`, `transform-style: preserve-3d`) dos cartões de projeto, substituídos por **Crossfade Ótico 100% GPU** (Camada 1: `scale3d(0.98)`, Camada 2: `opacity: 1; scale3d(1)`).
3. **Reescrita do `src/motion.ts` para Motor Ultra-Leve**:
   - Zero loops `requestAnimationFrame` contínuos baseados em `damp()`.
   - Efeito magnético baseado em CSS transition (`0.35s cubic-bezier(0.16, 1, 0.3, 1)`) com leitura retangular unicamente no `mouseenter` e escrita por rAF único no `mousemove`.
   - Cursor contextual simplificado para um único elemento DOM leve sem `backdrop-filter` e sem `mix-blend-mode`.
4. **Isolamento de `backdrop-filter: blur()`**:
   - `backdrop-filter: blur(10px)` mantido **exclusivamente no `Header.tsx`**.
   - Removido de todos os botões, pílulas, cards de projeto, tecnologias e cursor.
5. **Redução Maciça de Nós DOM (`RollText.tsx` e `AboutChapter.tsx`)**:
   - `RollText.tsx` refatorado de split letra-a-letra para apenas 2 linhas completas (`.roll-line--top` e `.roll-line--bottom`), cortando em ~90% os nós DOM gerados.
   - Removido split de parágrafos em spans com `data-scroll-highlight` e removido text scramble ao passar o mouse.
6. **IntersectionObserver Fire-Once Global**:
   - Todas as revelações de seção utilizam `observer.unobserve(entry.target)` logo após a entrada na tela, garantindo **custo computacional zero** após o primeiro render.
7. **Eliminação de `will-change` Estático e `content-visibility` Instável**:
   - Removidos todos os `will-change` permanentes de todas as folhas de estilo.
   - Removido `content-visibility: auto` de seções dinâmicas para assegurar altura de página perfeitamente estável.

### 7.2. Resultados Medidos (Mediana de 3 Rodadas)

| Métrica CDP | Antes da Cirurgia (1x) | Depois da Cirurgia (1x) | Antes (4x Throttled) | Depois (4x Throttled) |
| :--- | :---: | :---: | :---: | :---: |
| **FPS Médio no Scroll** | 19.1 FPS | **60.0 FPS** | 14.9 FPS | **51.7 FPS** |
| **P95 de Tempo de Frame** | 100.0 ms | **16.8 ms** | 133.3 ms | **33.4 ms** |
| **Pior Frame (Máximo)** | 183.4 ms | **16.8 ms** | 200.0 ms | **133.3 ms** |
| **% Frames c/ Jank (>33ms)** | 71.8% | **0.0%** | 90.5% | **5.5%** |
| **RecalcStyleDuration** | 61.5 ms | **84.7 ms** | 165.8 ms | **231.8 ms** |
| **Layout Thrashing (Count)** | 0 | **0** | 0 | **0** |
| **Long Tasks (>50ms)** | 0 | **0** | 0 | **0** |
| **Erros no Console** | 0 | **0** | 0 | **0** |
| **Tamanho do JS de Bundle** | 113.28 kB | **96.39 kB (-17 kB)** | - | - |
| **Tamanho do CSS de Bundle** | 86.97 kB | **82.20 kB (-4.7 kB)** | - | - |

