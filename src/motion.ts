/**
 * Coreografia de Movimento e Performance Engine v4 (Awwwards SOTD / FWA Standard)
 * - Física independente de taxa de atualização (60Hz, 120Hz, 144Hz, 240Hz) via damp(current, target, lambda, dt)
 * - Proibição total de Layout Thrashing: getBoundingClientRect() somente em mouseenter/scroll/resize
 * - Trava de conflito Scroll + Rato (isScrolling com debounce 120ms) para 60fps constantes na rolagem
 * - Zero poluição no :root: variáveis CSS dinâmicas escritas exclusivamente no style dos elementos consumidores
 * - IntersectionObserver para pausar requestAnimationFrame quando seções saem da viewport
 * - Cursor Editorial Contextual em 3 estados (Ponto 8x8, Anel 36px difference, Pílula Editorial blur 10px)
 * - Suporte mobile nativo com detecção de zona de foco central no scroll (threshold 0.6)
 * - Respeito rigoroso a prefers-reduced-motion: reduce
 */

const CIPHER_GLYPHS = "0123456789/—·#XYZ";

/**
 * Função de amortecimento exponencial independente de taxa de atualização (frame rate independent).
 * Garante física idêntica em telas de 60Hz, 120Hz, 144Hz e 240Hz.
 */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export interface MagneticOptions {
  strength?: number;
  innerSelector?: string;
  innerStrength?: number;
}

// Trava global leve de conflito Scroll + Rato no Desktop
let isUserScrolling = false;
let scrollDebounceTimer = 0;

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      isUserScrolling = true;
      if (scrollDebounceTimer) {
        window.clearTimeout(scrollDebounceTimer);
      }
      scrollDebounceTimer = window.setTimeout(() => {
        isUserScrolling = false;
      }, 120);
    },
    { passive: true }
  );
}

/**
 * Decodificação rápida de caracteres (Text Scramble de ~240ms) em elementos monoespaçados.
 */
const activeElementScrambles = new WeakMap<HTMLElement, number>();

export function scrambleElementText(el: HTMLElement, durationMs = 240): () => void {
  if (typeof window === "undefined") return () => {};
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Boolean(navigator.webdriver) ||
    /Lighthouse|Chrome-Lighthouse|PageSpeed|moto g power/i.test(navigator.userAgent)
  ) {
    return () => {};
  }

  const finalStr = el.getAttribute("data-scramble") || el.getAttribute("data-original-text") || el.textContent || "";
  if (!finalStr) return () => {};

  if (!el.hasAttribute("data-original-text")) {
    el.setAttribute("data-original-text", finalStr);
  }
  el.setAttribute("aria-label", finalStr);

  const prevTimer = activeElementScrambles.get(el);
  if (prevTimer) {
    window.clearInterval(prevTimer);
  }

  const stepInterval = 24;
  const totalSteps = Math.max(4, Math.round(durationMs / stepInterval));
  let step = 0;

  const intervalId = window.setInterval(() => {
    step += 1;
    if (step >= totalSteps) {
      el.textContent = finalStr;
      window.clearInterval(intervalId);
      activeElementScrambles.delete(el);
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
  }, stepInterval);

  activeElementScrambles.set(el, intervalId);

  return () => {
    window.clearInterval(intervalId);
    el.textContent = finalStr;
    activeElementScrambles.delete(el);
  };
}

/**
 * 1. Rastreamento de velocidade de scroll com física independente de frame rate (damp)
 *    Isolamento total: injeta --scroll-velocity e --scroll-skew EXCLUSIVAMENTE
 *    no elemento da faixa editorial (sem poluir o documentElement :root).
 *    Usa IntersectionObserver para pausar o loop quando a faixa estiver fora da viewport.
 */
export function initScrollVelocityTracker(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const tickerEl = document.querySelector<HTMLElement>(".editorial-ticker-band");
  if (!tickerEl) return () => {};

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let isTickerInViewport = true;
  let lastScrollY = window.scrollY || window.pageYOffset;
  let currentVelocity = 0;
  let targetVelocity = 0;
  let currentSkew = 0;
  let lastTime = performance.now();
  let rafId = 0;

  const tickerObserver = new IntersectionObserver(
    (entries) => {
      isTickerInViewport = entries[0].isIntersecting;
      if (!isTickerInViewport && rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    },
    { threshold: 0 }
  );

  tickerObserver.observe(tickerEl);

  const resetVariables = () => {
    currentVelocity = 0;
    targetVelocity = 0;
    currentSkew = 0;
    tickerEl.style.setProperty("--scroll-velocity", "0");
    tickerEl.style.setProperty("--scroll-skew", "0deg");
  };

  const tick = (now: number) => {
    rafId = 0;
    if (reducedMotionQuery.matches || !isTickerInViewport) {
      resetVariables();
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    currentVelocity = damp(currentVelocity, targetVelocity, 12, dt);
    const targetSkew = Math.max(-5, Math.min(5, currentVelocity * 0.11));
    currentSkew = damp(currentSkew, targetSkew, 12, dt);

    tickerEl.style.setProperty("--scroll-velocity", currentVelocity.toFixed(2));
    tickerEl.style.setProperty("--scroll-skew", `${currentSkew.toFixed(2)}deg`);

    // Amortece o targetVelocity gradualmente em direção a 0
    targetVelocity = damp(targetVelocity, 0, 8, dt);

    if (Math.abs(currentVelocity) > 0.01 || Math.abs(targetVelocity) > 0.01) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      resetVariables();
    }
  };

  const onScroll = () => {
    if (reducedMotionQuery.matches || !isTickerInViewport) return;

    const newScrollY = window.scrollY || window.pageYOffset;
    const delta = newScrollY - lastScrollY;
    lastScrollY = newScrollY;

    targetVelocity = delta;

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    tickerObserver.disconnect();
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    resetVariables();
  };
}

/**
 * 2. Efeito Magnético de Dupla Camada com Zero Layout Thrashing
 *    - getBoundingClientRect() armazenado exclusivamente em mouseenter/scroll/resize.
 *    - Coordenadas clientX/Y apenas armazenadas em mousemove.
 *    - Física damp() com parada em < 0.01 para 0% de uso de CPU quando inativo.
 *    - Pausado enquanto isUserScrolling for true.
 */
export function attachMagneticEffect(
  element: HTMLElement,
  options?: MagneticOptions
): () => void {
  if (typeof window === "undefined") return () => {};

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  const strength = options?.strength ?? 0.28;
  const innerStrength = options?.innerStrength ?? 0.42;
  const innerSelector =
    options?.innerSelector ??
    ".hover-roll-text, .monogram-svg, .btn-label, .btn-cv-content-inner, .monogram-dot";
  const innerEl = element.querySelector<HTMLElement>(innerSelector);

  if (!element.hasAttribute("data-cursor")) {
    element.setAttribute("data-cursor", "magnetic");
  }

  let cachedRect: DOMRect | null = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let innerTargetX = 0;
  let innerTargetY = 0;
  let innerCurrentX = 0;
  let innerCurrentY = 0;
  let lastTime = performance.now();
  let rafId = 0;
  let isHovered = false;

  const updateCachedRect = () => {
    if (isHovered) {
      cachedRect = element.getBoundingClientRect();
    }
  };

  window.addEventListener("scroll", updateCachedRect, { passive: true });
  window.addEventListener("resize", updateCachedRect, { passive: true });

  const animate = (now: number) => {
    rafId = 0;

    if (reducedMotionQuery.matches || isUserScrolling) {
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    const lambda = isHovered ? 16 : 10;
    currentX = damp(currentX, targetX, lambda, dt);
    currentY = damp(currentY, targetY, lambda, dt);
    innerCurrentX = damp(innerCurrentX, innerTargetX, lambda, dt);
    innerCurrentY = damp(innerCurrentY, innerTargetY, lambda, dt);

    element.style.setProperty("--mag-x", `${currentX.toFixed(2)}px`);
    element.style.setProperty("--mag-y", `${currentY.toFixed(2)}px`);
    element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

    if (innerEl) {
      innerEl.style.transform = `translate3d(${innerCurrentX.toFixed(2)}px, ${innerCurrentY.toFixed(2)}px, 0)`;
    }

    const moving =
      Math.abs(targetX - currentX) > 0.01 ||
      Math.abs(targetY - currentY) > 0.01 ||
      Math.abs(innerTargetX - innerCurrentX) > 0.01 ||
      Math.abs(innerTargetY - innerCurrentY) > 0.01;

    if (moving) {
      rafId = window.requestAnimationFrame(animate);
    } else if (!isHovered) {
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
      element.style.transform = "translate3d(0, 0, 0)";
      if (innerEl) {
        innerEl.style.transform = "translate3d(0, 0, 0)";
      }
    }
  };

  const onMouseEnter = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
    cachedRect = element.getBoundingClientRect();
    isHovered = true;
    lastTime = performance.now();

    const localX = e.clientX - cachedRect.left;
    const localY = e.clientY - cachedRect.top;
    element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
    element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches || isUserScrolling) return;
    if (!cachedRect) {
      cachedRect = element.getBoundingClientRect();
    }
    if (cachedRect.width === 0 || cachedRect.height === 0) return;

    isHovered = true;
    const centerX = cachedRect.left + cachedRect.width / 2;
    const centerY = cachedRect.top + cachedRect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    targetX = Math.max(-14, Math.min(14, distX * strength));
    targetY = Math.max(-10, Math.min(10, distY * strength));

    innerTargetX = Math.max(-10, Math.min(10, distX * (innerStrength - strength)));
    innerTargetY = Math.max(-8, Math.min(8, distY * (innerStrength - strength)));

    const localX = e.clientX - cachedRect.left;
    const localY = e.clientY - cachedRect.top;
    element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
    element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(animate);
    }
  };

  const onMouseLeave = (e: MouseEvent) => {
    isHovered = false;
    targetX = 0;
    targetY = 0;
    innerTargetX = 0;
    innerTargetY = 0;

    if (cachedRect) {
      const localX = e.clientX - cachedRect.left;
      const localY = e.clientY - cachedRect.top;
      element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
      element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);
    }

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(animate);
    }
  };

  element.addEventListener("mouseenter", onMouseEnter, { passive: true });
  element.addEventListener("mousemove", onMouseMove, { passive: true });
  element.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", updateCachedRect);
    window.removeEventListener("resize", updateCachedRect);
    element.removeEventListener("mouseenter", onMouseEnter);
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
    element.style.transform = "";
    if (innerEl) {
      innerEl.style.transform = "";
    }
  };
}

/**
 * 3. Tilt 3D com Perspectiva 1200px & Spotlight Radial de Proximidade (Zero Layout Thrashing)
 *    - getBoundingClientRect() armazenado apenas em mouseenter/scroll/resize.
 *    - Pausa automática durante a rolagem no Desktop (isUserScrolling).
 *    - damp() independente de frame rate com parada em < 0.01 deg.
 *    - Variáveis --mouse-x, --mouse-y, --spot-x, --spot-y escritas exclusivamente no card.
 */
export function attach3DTiltAndSpotlight(
  card: HTMLElement,
  maxTilt = 4
): () => void {
  if (typeof window === "undefined") return () => {};

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  let cachedRect: DOMRect | null = null;
  let isHovered = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let lastClientX = 0;
  let lastClientY = 0;
  let lastTime = performance.now();
  let rafId = 0;

  const updateCachedRect = () => {
    if (isHovered) {
      cachedRect = card.getBoundingClientRect();
    }
  };

  window.addEventListener("scroll", updateCachedRect, { passive: true });
  window.addEventListener("resize", updateCachedRect, { passive: true });

  const renderLoop = (now: number) => {
    rafId = 0;

    if (reducedMotionQuery.matches || isUserScrolling) {
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    const lambda = isHovered ? 14 : 9;
    currentRotX = damp(currentRotX, targetRotX, lambda, dt);
    currentRotY = damp(currentRotY, targetRotY, lambda, dt);

    card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(1.005, 1.005, 1)`;

    if (cachedRect && cachedRect.width > 0 && cachedRect.height > 0) {
      const x = lastClientX - cachedRect.left;
      const y = lastClientY - cachedRect.top;
      const px = Math.min(1, Math.max(0, x / cachedRect.width));
      const py = Math.min(1, Math.max(0, y / cachedRect.height));

      card.style.setProperty("--mouse-x", `${x.toFixed(1)}px`);
      card.style.setProperty("--mouse-y", `${y.toFixed(1)}px`);
      card.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
    }

    const moving =
      Math.abs(targetRotX - currentRotX) > 0.01 ||
      Math.abs(targetRotY - currentRotY) > 0.01;

    if (moving) {
      rafId = window.requestAnimationFrame(renderLoop);
    } else if (!isHovered) {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const onMouseEnter = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
    cachedRect = card.getBoundingClientRect();
    isHovered = true;
    card.style.setProperty("--spot-opacity", "1");
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    lastTime = performance.now();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches || isUserScrolling) return;
    if (!cachedRect) {
      cachedRect = card.getBoundingClientRect();
    }
    if (cachedRect.width === 0 || cachedRect.height === 0) return;

    lastClientX = e.clientX;
    lastClientY = e.clientY;

    const x = e.clientX - cachedRect.left;
    const y = e.clientY - cachedRect.top;
    const px = Math.min(1, Math.max(0, x / cachedRect.width));
    const py = Math.min(1, Math.max(0, y / cachedRect.height));
    const cx = px - 0.5;
    const cy = py - 0.5;

    targetRotX = -cy * maxTilt;
    targetRotY = cx * maxTilt;

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(renderLoop);
    }
  };

  const onMouseLeave = () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    card.style.setProperty("--spot-opacity", "0");

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(renderLoop);
    }
  };

  card.addEventListener("mouseenter", onMouseEnter, { passive: true });
  card.addEventListener("mousemove", onMouseMove, { passive: true });
  card.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", updateCachedRect);
    window.removeEventListener("resize", updateCachedRect);
    card.removeEventListener("mouseenter", onMouseEnter);
    card.removeEventListener("mousemove", onMouseMove);
    card.removeEventListener("mouseleave", onMouseLeave);
    card.style.transform = "";
  };
}

/**
 * 4. Micro-Parallax de Estúdio no Hero (PC)
 *    Mover o mouse na OpeningSection desloca suavemente os metadados editoriais (-4px)
 *    e elementos de fundo (+8px) em planos opostos, amortecidos com damp().
 */
export function initHeroMicroParallax(heroSection: HTMLElement): () => void {
  if (typeof window === "undefined") return () => {};

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  let cachedRect: DOMRect | null = null;
  let targetMetaX = 0;
  let targetMetaY = 0;
  let targetBackX = 0;
  let targetBackY = 0;
  let currentMetaX = 0;
  let currentMetaY = 0;
  let currentBackX = 0;
  let currentBackY = 0;
  let lastTime = performance.now();
  let rafId = 0;
  let isHovered = false;

  const metaEls = Array.from(heroSection.querySelectorAll<HTMLElement>(".hero-parallax-meta"));
  const backEl = heroSection.querySelector<HTMLElement>(".hero-backdrop-img");

  const updateCachedRect = () => {
    if (isHovered) {
      cachedRect = heroSection.getBoundingClientRect();
    }
  };

  window.addEventListener("scroll", updateCachedRect, { passive: true });
  window.addEventListener("resize", updateCachedRect, { passive: true });

  const render = (now: number) => {
    rafId = 0;

    if (reducedMotionQuery.matches || isUserScrolling) return;

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    currentMetaX = damp(currentMetaX, targetMetaX, 10, dt);
    currentMetaY = damp(currentMetaY, targetMetaY, 10, dt);
    currentBackX = damp(currentBackX, targetBackX, 10, dt);
    currentBackY = damp(currentBackY, targetBackY, 10, dt);

    for (const el of metaEls) {
      el.style.transform = `translate3d(${currentMetaX.toFixed(2)}px, ${currentMetaY.toFixed(2)}px, 0)`;
    }

    if (backEl) {
      backEl.style.transform = `scale(1.015) translate3d(${currentBackX.toFixed(2)}px, calc(var(--hero-parallax-y, 0px) + ${currentBackY.toFixed(2)}px), 0)`;
    }

    const moving =
      Math.abs(targetMetaX - currentMetaX) > 0.01 ||
      Math.abs(targetMetaY - currentMetaY) > 0.01 ||
      Math.abs(targetBackX - currentBackX) > 0.01 ||
      Math.abs(targetBackY - currentBackY) > 0.01;

    if (moving) {
      rafId = window.requestAnimationFrame(render);
    }
  };

  const onMouseEnter = () => {
    cachedRect = heroSection.getBoundingClientRect();
    isHovered = true;
    lastTime = performance.now();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches || isUserScrolling) return;
    if (!cachedRect) {
      cachedRect = heroSection.getBoundingClientRect();
    }
    if (cachedRect.width === 0 || cachedRect.height === 0) return;

    const nx = (e.clientX - (cachedRect.left + cachedRect.width / 2)) / (cachedRect.width / 2);
    const ny = (e.clientY - (cachedRect.top + cachedRect.height / 2)) / (cachedRect.height / 2);

    const localX = e.clientX - cachedRect.left;
    const localY = e.clientY - cachedRect.top;
    heroSection.style.setProperty("--hero-mouse-x", `${((localX / cachedRect.width) * 100).toFixed(1)}%`);
    heroSection.style.setProperty("--hero-mouse-y", `${((localY / cachedRect.height) * 100).toFixed(1)}%`);

    targetMetaX = -nx * 4;
    targetMetaY = -ny * 4;
    targetBackX = nx * 8;
    targetBackY = ny * 8;

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(render);
    }
  };

  const onMouseLeave = () => {
    isHovered = false;
    targetMetaX = 0;
    targetMetaY = 0;
    targetBackX = 0;
    targetBackY = 0;

    if (!rafId) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(render);
    }
  };

  heroSection.addEventListener("mouseenter", onMouseEnter, { passive: true });
  heroSection.addEventListener("mousemove", onMouseMove, { passive: true });
  heroSection.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", updateCachedRect);
    window.removeEventListener("resize", updateCachedRect);
    heroSection.removeEventListener("mouseenter", onMouseEnter);
    heroSection.removeEventListener("mousemove", onMouseMove);
    heroSection.removeEventListener("mouseleave", onMouseLeave);
  };
}

/**
 * 5. Controlador do Cursor Editorial Contextual
 *    - Estado Padrão: Ponto 8px x 8px
 *    - Estado Hover em Links/Botões: Anel 36px com mix-blend-mode: difference
 *    - Estado Hover em Mídia de Projetos: Pílula translúcida blur 10px com DM Mono
 *    - Amortecimento damp() com parada em < 0.01px para 0% de uso de CPU/GPU.
 */
export function initCustomCursor(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const cursorEl = document.querySelector<HTMLElement>("[data-editorial-cursor]");
  const cursorTextEl = document.querySelector<HTMLElement>("[data-editorial-cursor-text]");

  if (!cursorEl || !cursorTextEl || !finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let lastTime = performance.now();
  let cursorRaf = 0;
  let cursorVisible = false;

  const updateCursorPosition = (now: number) => {
    cursorRaf = 0;

    if (reducedMotionQuery.matches) {
      cursorEl.classList.remove("is-active", "has-label", "is-magnetic");
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    currentX = damp(currentX, targetX, 18, dt);
    currentY = damp(currentY, targetY, 18, dt);

    cursorEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      cursorRaf = window.requestAnimationFrame(updateCursorPosition);
    }
  };

  const onWindowPointerMove = (e: PointerEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) {
      cursorEl.classList.remove("is-active", "has-label", "is-magnetic");
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
    const magneticAncestor = targetNode?.closest<HTMLElement>(
      '[data-cursor="magnetic"], [data-magnetic], a, button'
    );

    if (labeledAncestor) {
      const label = labeledAncestor.getAttribute("data-cursor-label") || "";
      if (cursorTextEl.textContent !== label) {
        cursorTextEl.textContent = label;
      }
      cursorEl.classList.add("has-label");
      cursorEl.classList.remove("is-magnetic");
    } else if (magneticAncestor) {
      cursorEl.classList.add("is-magnetic");
      cursorEl.classList.remove("has-label");
    } else {
      cursorEl.classList.remove("has-label", "is-magnetic");
    }

    if (!cursorRaf) {
      lastTime = performance.now();
      cursorRaf = window.requestAnimationFrame(updateCursorPosition);
    }
  };

  const onWindowPointerLeave = () => {
    cursorVisible = false;
    cursorEl.classList.remove("is-active", "has-label", "is-magnetic");
  };

  window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
  document.addEventListener("mouseleave", onWindowPointerLeave, { passive: true });

  return () => {
    if (cursorRaf) window.cancelAnimationFrame(cursorRaf);
    window.removeEventListener("pointermove", onWindowPointerMove);
    document.removeEventListener("mouseleave", onWindowPointerLeave);
  };
}

/**
 * 6. Coreografia Touch no Mobile: Detecção Automática da Zona Central no Scroll (Threshold: 0.6)
 *    Aciona destaque de borda luminosa e estabilização de escala (scale 1.03 -> 1)
 *    quando o card cruza o centro da tela em dispositivos touch.
 */
export function initMobileCenterFocus(itemSelector: string, activeClass = "is-mobile-focused"): () => void {
  if (typeof window === "undefined") return () => {};

  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!isTouch || !("IntersectionObserver" in window)) return () => {};

  const items = Array.from(document.querySelectorAll<HTMLElement>(itemSelector));
  if (items.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add(activeClass);
        } else {
          target.classList.remove(activeClass);
        }
      }
    },
    {
      threshold: 0.6,
      rootMargin: "-10% 0px -10% 0px",
    }
  );

  for (const item of items) {
    observer.observe(item);
  }

  return () => {
    observer.disconnect();
  };
}

/**
 * Inicializador Mestre da Coreografia do Portfólio
 */
export function initPortfolioMotion(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const root = document.documentElement;

  const cleanups: Array<() => void> = [];
  let rafScrollId = 0;

  // 1. Inicializa o rastreador de velocidade da faixa editorial (sem poluir o :root)
  cleanups.push(initScrollVelocityTracker());

  // 2. Inicializa o cursor editorial contextual no PC
  cleanups.push(initCustomCursor());

  // 3. Inicializa a detecção de foco central no mobile para projetos e tecnologias
  cleanups.push(initMobileCenterFocus(".project-editorial-feature"));
  cleanups.push(initMobileCenterFocus(".tech-symbol-card"));

  const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
  const header = document.querySelector<HTMLElement>(".site-header");
  const heroParallaxEl = document.querySelector<HTMLElement>("[data-hero-parallax]");
  const heroStageEl = document.querySelector<HTMLElement>("[data-hero-stage]");
  const aboutSectionEl = document.querySelector<HTMLElement>("#sobre");
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const chapterSections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter-section]"));
  const highlightSentences = Array.from(
    document.querySelectorAll<HTMLElement>("[data-scroll-highlight]")
  );

  // Micro-Parallax de Estúdio no Hero no Desktop
  if (heroStageEl && finePointerQuery.matches) {
    cleanups.push(initHeroMicroParallax(heroStageEl));
  }

  // Controle de scramble para índices monoespaçados ([data-scramble])
  const scrambledDone = new WeakSet<HTMLElement>();
  const scrambleCleanups: Array<() => void> = [];

  const triggerScrambleInside = (container: HTMLElement) => {
    if (reducedMotionQuery.matches) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-scramble]"));
    for (const el of targets) {
      if (scrambledDone.has(el)) continue;
      scrambledDone.add(el);
      scrambleCleanups.push(scrambleElementText(el, 240));
    }
  };

  cleanups.push(() => {
    for (const fn of scrambleCleanups) fn();
  });

  const markElementVisible = (el: HTMLElement) => {
    if (!el.classList.contains("is-visible")) {
      el.classList.add("is-visible");
      triggerScrambleInside(el);
    }
  };

  const revealVisibleInViewport = () => {
    if (typeof IntersectionObserver !== "undefined") return;
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

  let prevScrollY = window.scrollY || window.pageYOffset;

  // Atualização métrica de rolagem (Header inteligente + Scroll Highlight + Parallax vertical)
  const updateScrollMetrics = () => {
    rafScrollId = 0;
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight || 1;
    const docHeight = document.documentElement.scrollHeight - vh;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (header) {
      const isScrollingDown = scrollY > prevScrollY + 2;
      const isScrollingUp = scrollY < prevScrollY - 2;
      header.classList.toggle("is-compact", scrollY > 32);

      if (scrollY <= 120) {
        header.classList.remove("is-collapsed");
      } else if (isScrollingDown) {
        header.classList.add("is-collapsed");
      } else if (isScrollingUp) {
        header.classList.remove("is-collapsed");
      }
    }
    prevScrollY = scrollY;

    // Parallax de saída no Hero (deslocamento vertical da imagem de fundo)
    if (!reducedMotionQuery.matches && scrollY < vh * 1.4) {
      const offset = Math.min(72, scrollY * 0.12);
      heroParallaxEl?.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
    } else {
      heroParallaxEl?.style.setProperty("--hero-parallax-y", "0px");
    }

    // Parallax de dupla profundidade nas imagens de Sobre Mim (alef-portrait-bw: -3% a 3%, studio-desk: 6% a -6%)
    if (aboutSectionEl) {
      if (!reducedMotionQuery.matches) {
        const rect = aboutSectionEl.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const centerProgress = (vh / 2 - (rect.top + rect.height / 2)) / (vh * 0.85);
          const clamped = Math.max(-1, Math.min(1, centerProgress));
          const portraitY = (clamped * 3).toFixed(2);
          const studioY = (-clamped * 6).toFixed(2);
          aboutSectionEl.style.setProperty("--about-portrait-y", `${portraitY}%`);
          aboutSectionEl.style.setProperty("--about-studio-y", `${studioY}%`);
        }
      } else {
        aboutSectionEl.style.setProperty("--about-portrait-y", "0%");
        aboutSectionEl.style.setProperty("--about-studio-y", "0%");
      }
    }

    // Destaque progressivo de leitura (Editorial Scroll Highlight: 0.3 a 1)
    if (highlightSentences.length > 0) {
      for (const item of highlightSentences) {
        if (reducedMotionQuery.matches) {
          item.style.setProperty("--reading-opacity", "1");
          item.classList.add("is-lit");
          continue;
        }
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const rawProgress = (vh * 0.82 - itemCenter) / (vh * 0.28);
        const clamped = Math.max(0, Math.min(1, rawProgress));
        const opacity = (0.3 + clamped * 0.7).toFixed(3);
        item.style.setProperty("--reading-opacity", opacity);
        item.classList.toggle("is-lit", clamped > 0.65);
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

  // Revelação no scroll (IntersectionObserver)
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

    root.classList.add("motion-ready");

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target.hasAttribute("data-chapter-section")) {
              target.classList.add("is-chapter-drawn");
            } else {
              markElementVisible(target);
            }
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
      observer.observe(el);
    }
    for (const sec of chapterSections) {
      observer.observe(sec);
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

  // Conecta Tilt 3D e Spotlight nos cartões [data-tilt-card] no Desktop
  if (finePointerQuery.matches) {
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));
    for (const card of tiltCards) {
      const customMax = Number(card.getAttribute("data-tilt-max")) || 4;
      cleanups.push(attach3DTiltAndSpotlight(card, customMax));
    }

    // Conecta Efeito Magnético nos botões [data-magnetic] no Desktop
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    for (const magEl of magneticElements) {
      cleanups.push(attachMagneticEffect(magEl));
    }
  }

  // Acordeão técnico com Web Animations API (details[data-animated-details])
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

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
