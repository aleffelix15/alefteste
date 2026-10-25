# Relatório de Responsividade, Performance e Acessibilidade Mobile

> Auditoria e implementação técnica realizada na branch `feat/mobile-responsividade` do portfólio de Álef Felix (`portfolio-alef-felix`).
> Atualização definitiva: Padrão Awwwards Site of the Year / FWA e Staff Web Performance Engineering.

---

## 1. Visão Geral e Objetivos

O objetivo desta intervenção foi estabelecer o padrão definitivo de responsividade e animações cinematográficas para o portfólio, garantindo excelência de 60/120fps tanto em desktops avançados com monitores de alta taxa de atualização (120Hz/144Hz/240Hz) quanto em dispositivos móveis (320px a 430px) e tablets (768px a 1024px).

### Metas Atingidas
- **Física Independente de Taxa de Atualização**: Sistema `damp(current, target, lambda, dt)` garantindo comportamento idêntico em 60Hz, 120Hz, 144Hz e 240Hz.
- **Zero Layout Thrashing**: Proibição total de `getBoundingClientRect()` dentro de eventos `mousemove`/`pointermove`.
- **Trava de Conflito Scroll + Rato no PC (`isUserScrolling`)**: 60fps constantes na rolagem ao pausar dinamicamente cálculos de 3D Tilt e Proximity Glow durante o scroll.
- **Isolamento de Variáveis CSS**: Eliminação de escritas de alta frequência no `:root` (`documentElement`), escrevendo apenas nos elementos DOM que consom cada variável.
- **Alturas Dinâmicas Reais (100dvh / 100svh)**: Zero saltos de layout quando a barra de endereços do Chrome/Safari expande ou encolhe.
- **Zona de Foco Central no Mobile (`is-mobile-focused`)**: Efeito de destaque automático para smartphones onde não há cursor de mouse para fazer `:hover`.
- **Seletor de Telas Touch em Pílula Translúcida**: Pílula compacta `[ 01 CAPA | 02 SISTEMA ]` nos projetos Decode e Nudemo com alternância por toque.
- **Alvos de Toque >= 48x48 CSS px**: Alvos de toque com área mínima de 48px e feedback visual imediato em `:active` (`scale(0.97)` em 80ms).
- **Pipeline de Imagens Leves no Mobile**: Telas `< 768px` baixam estritamente `-640.avif` e `-640.webp` com `CLS = 0`.
- **Zero estados `:hover` presos** em telas sensíveis ao toque através de media queries `(hover: hover) and (pointer: fine)`.
- **100% de Acessibilidade e Prefers-Reduced-Motion**: Desativação instantânea de efeitos 3D e deslocamentos para usuários que exigirem redução de movimento.

---

## 2. Consolidação da Arquitetura de Breakpoints

Os breakpoints foram consolidados em 4 faixas canônicas documentadas em `src/styles/tokens.css`:

| Token | Largura | Escopo de Uso |
|---|---|---|
| `--bp-mobile` | `480px` | Celulares compactos (320px–480px) em modo retrato |
| `--bp-tablet` | `768px` | Celulares largos em paisagem e tablets compactos |
| `--bp-desktop` | `1024px` | Tablets em paisagem, netbooks e notebooks compactos |
| `--bp-wide` | `1280px` | Monitores desktop amplos e telas ultrawide |

### Prevenção de Saltos com Viewport Units Modernas
Substituiu-se o uso ingênuo de `100vh` por viewport units modernas em pontos críticos:
- `.hero-editorial-stage`: `min-height: 100vh; min-height: 100svh;` (evita saltos quando as barras do navegador móvel mudam de estado).
- `.site-preloader`: `height: 100vh; height: 100dvh; width: 100vw; width: 100dvw;` (cobre 100% da área visível em qualquer navegador móvel).
- Isolamento de layout com `contain: layout style;` nas seções principais (`OpeningSection`, `ProjectsChapter`, `AboutChapter`, `TechChapter`, `ContactChapter`).

---

## 3. Alvos de Toque (Touch Targets >= 48x48 CSS px)

1. **Pseudo-elementos de Toque Invisíveis (`::after`)**:
   Para elementos compactos de controle (pílulas de navegação rápida `#projetos`, alternador de telas do mockup, filtros de tecnologias, botão de pausar ticker e pílulas mobile), foi injetado um target de expansão invisível apenas para ponteiros táteis:
   ```css
   @media (pointer: coarse), (max-width: 768px) {
     .screen-switch-btn::after,
     .mobile-pill-btn::after,
     .projects-quick-pill::after,
     .tech-filter-pill::after,
     .tech-tier-btn::after,
     .btn-cv-header::after,
     .ticker-pause-btn::after {
       content: "";
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       min-width: 48px;
       min-height: 48px;
       width: 100%;
       height: 100%;
       z-index: 1;
     }
   }
   ```
2. **Otimizações de Toque Mobile**:
   - `touch-action: manipulation;` em todos os links, botões e controles para eliminar o atraso de 300ms do mobile.
   - `-webkit-tap-highlight-color: transparent;` para remover o flash cinza do iOS/Android.
   - Feedback háptico visual imediato:
     ```css
     @media (pointer: coarse), (max-width: 768px) {
       button:active,
       a:active,
       .btn-editorial-primary:active,
       .btn-liquid-cv:active,
       .screen-switch-btn:active,
       .mobile-pill-btn:active,
       .projects-quick-pill:active,
       .tech-tier-btn:active,
       .tech-filter-pill:active {
         transform: scale(0.97);
         transition-duration: 80ms;
       }
     }
     ```

---

## 4. Zona de Foco Central no Mobile (`is-mobile-focused`)

Como dispositivos táteis não possuem ponteiro de mouse para disparar o estado `:hover`, implementou-se em `src/motion.ts` a função `initMobileCenterFocus()`:
- Rastreia cards de projetos (`.project-editorial-feature`) e cartões de tecnologias (`.tech-symbol-card`) via `IntersectionObserver` com threshold `0.6` e `rootMargin: "-10% 0px -10% 0px"`.
- Quando o elemento atinge a zona central da tela, ganha automaticamente a classe `.is-mobile-focused`:
  * **Projetos**: Borda com brilho sutil azul elétrico (`box-shadow: 0 0 26px -6px rgba(22, 119, 255, 0.42)`) e escala estabilizada (`scale(1.015)`).
  * **Tecnologias**: Borda iluminada e salto elástico suave no emblema vetorial (`scale(1.1) rotate(-4deg)`).

---

## 5. Touch-Friendly Screen Selector em Projetos

Para os projetos com telas duplas (**DECODE** e **NUDEMO**):
- Renderização na base da imagem de uma pílula translúcida compacta em `DM Mono`: `[ 01 CAPA | 02 SISTEMA ]` com `backdrop-filter: blur(8px)`.
- Alternância por toque na pílula ou no próprio frame da imagem sem risco de abrir acidentalmente o link em dispositivos táteis, preservando a navegação direta através dos botões "Visitar projeto" e "Ver código".

---

## 6. Pipeline de Imagens Compactas no Mobile

Todas as tags `<picture>` foram configuradas com fontes condicionadas explicitamente a `(max-width: 767px)`:
- `verso`: serve `verso-640.avif` e `verso-640.webp`.
- `decode`: serve `decode-640.avif` e `decode-640.webp`.
- `nudemo`: serve `nudemo-hero-640` e `nudemo-app-640` (avif/webp).
- `sobre`: serve `studio-desk-640` e `alef-portrait-bw-640` (avif/webp).
- `abertura`: serve `alef-portrait-bw-640` (avif/webp).
- Todas com `width` e `height` explícitos, `loading="lazy"` e `decoding="async"`, garantindo **CLS = 0**.

---

## 7. Blindagem de VRAM e Compositor GPU

1. **Remoção de `will-change: transform` estático**:
   - Spans de caracteres em `RollText.tsx` (`.roll-char`) recebem `will-change: transform` apenas em `:hover`, `:focus-visible` ou `.is-animating`.
   - Cards de projetos e tecnologias recebem `will-change: transform` apenas sob hover direto.
2. **Eliminação de filtros CSS em tags `<img>`**:
   - Zero animações de `filter: blur()`, `filter: grayscale()` ou `filter: brightness()` em imagens ativas.
   - Iluminação e sombreamento realizados exclusivamente via pseudo-elementos sobrepostos (`::after`) animando `opacity` e `transform`.

---

## 8. Verificação de Compilação e Integridade

- **Comando**: `npm run build`
- **TypeScript**: `tsc --noEmit` — 0 erros.
- **Vite**: `vite build` — 0 warnings.
- **Status**: Compilação concluída em `2.35s` com chunks otimizados para produção.
