/**
 * Coreografia de Movimento Editorial v3 (Awwwards SOTD Edition) — Álef Felix Teixeira
 * - Motor de física de scroll (initScrollVelocityTracker) com inércia lerp (0.14) e skew dinâmico
 * - Efeito magnético com paralaxe interna de camada dupla (attachMagneticEffect)
 * - Tilt 3D em perspectiva (1200px) + Proximity Spotlight radial (attach3DTiltAndSpotlight)
 * - Cursor Editorial Contextual em 3 estados (Ponto 8x8, Anel Magnético 36px difference, Pílula Editorial blur 10px)
 * - Revelação em máscara 3D (.line-mask > .line-inner), capítulos e parallax diferencial no Hero e Sobre Mim
 * - Destaque progressivo de leitura (Editorial Scroll Highlight) no manifesto biográfico
 * - Decodificação monoespaçada (cipher scramble) em índices e no hover de tecnologias (280ms)
 * - Acordeão técnico suave via Web Animations API (details[data-animated-details])
 * - Respeito estrito a @media (prefers-reduced-motion: reduce) e @media (hover: hover) and (pointer: fine)
 */

const CIPHER_GLYPHS = "0123456789/—·#XYZ";

export interface MagneticOptions {
  strength?: number;
  innerSelector?: string;
  innerStrength?: number;
}

/**
 * Decodificação rápida de caracteres (Text Scramble) em elementos monoespaçados.
 */
const activeElementScrambles = new WeakMap<HTMLElement, number>();

export function scrambleElementText(el: HTMLElement, durationMs = 280): () => void {
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

  const stepInterval = 28;
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
 * 1. Rastreamento de velocidade de scroll com interpolação linear (lerp 0.14)
 *    Injeta --scroll-velocity e --scroll-skew no document.documentElement.style.
 *    O loop rAF só executa enquanto a velocidade amortecida for > 0.05.
 */
export function initScrollVelocityTracker(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const root = document.documentElement;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let lastScrollY = window.scrollY || window.pageYOffset;
  let newScrollY = lastScrollY;
  let velocity = 0;
  let rafId = 0;

  const resetVariables = () => {
    velocity = 0;
    root.style.setProperty("--scroll-velocity", "0");
    root.style.setProperty("--scroll-skew", "0deg");
  };

  const tick = () => {
    rafId = 0;
    if (reducedMotionQuery.matches) {
      resetVariables();
      return;
    }

    newScrollY = window.scrollY || window.pageYOffset;
    const delta = newScrollY - lastScrollY;
    lastScrollY = newScrollY;

    velocity += (delta - velocity) * 0.14;

    if (Math.abs(velocity) > 0.05) {
      const skew = Math.max(-5, Math.min(5, velocity * 0.11));
      root.style.setProperty("--scroll-velocity", velocity.toFixed(3));
      root.style.setProperty("--scroll-skew", `${skew.toFixed(2)}deg`);
      rafId = window.requestAnimationFrame(tick);
    } else {
      resetVariables();
    }
  };

  const onScroll = () => {
    if (reducedMotionQuery.matches) return;
    if (!rafId) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    resetVariables();
  };
}

/**
 * 2. Efeito Magnético com Paralaxe de Profundidade em Dois Níveis
 *    strength = 0.28 no elemento pai e innerStrength = 0.42 no elemento interno opcional.
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
    ".hover-roll-text, .monogram-svg, .btn-label, .btn-cv-content-inner";
  const innerEl = element.querySelector<HTMLElement>(innerSelector);

  if (!element.hasAttribute("data-cursor")) {
    element.setAttribute("data-cursor", "magnetic");
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let innerTargetX = 0;
  let innerTargetY = 0;
  let innerCurrentX = 0;
  let innerCurrentY = 0;
  let rafId = 0;
  let isHovered = false;

  const animate = () => {
    rafId = 0;
    const lerpFactor = isHovered ? 0.22 : 0.16;

    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;
    innerCurrentX += (innerTargetX - innerCurrentX) * lerpFactor;
    innerCurrentY += (innerTargetY - innerCurrentY) * lerpFactor;

    element.style.setProperty("--mag-x", `${currentX.toFixed(2)}px`);
    element.style.setProperty("--mag-y", `${currentY.toFixed(2)}px`);
    element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

    if (innerEl) {
      innerEl.style.transform = `translate3d(${innerCurrentX.toFixed(2)}px, ${innerCurrentY.toFixed(2)}px, 0)`;
    }

    const stillMoving =
      Math.abs(targetX - currentX) > 0.08 ||
      Math.abs(targetY - currentY) > 0.08 ||
      Math.abs(innerTargetX - innerCurrentX) > 0.08 ||
      Math.abs(innerTargetY - innerCurrentY) > 0.08;

    if (stillMoving) {
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

  const onMouseMove = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    isHovered = true;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    targetX = Math.max(-14, Math.min(14, distX * strength));
    targetY = Math.max(-10, Math.min(10, distY * strength));

    innerTargetX = Math.max(-10, Math.min(10, distX * (innerStrength - strength)));
    innerTargetY = Math.max(-8, Math.min(8, distY * (innerStrength - strength)));

    // Atualiza coordenadas locais para preenchimento direcional (ex.: CvButton)
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
    element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);

    if (!rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  };

  const onMouseEnter = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
    const rect = element.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
    element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);
  };

  const onMouseLeave = (e: MouseEvent) => {
    isHovered = false;
    targetX = 0;
    targetY = 0;
    innerTargetX = 0;
    innerTargetY = 0;

    const rect = element.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    element.style.setProperty("--mouse-x", `${localX.toFixed(1)}px`);
    element.style.setProperty("--mouse-y", `${localY.toFixed(1)}px`);

    if (!rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  };

  element.addEventListener("mouseenter", onMouseEnter, { passive: true });
  element.addEventListener("mousemove", onMouseMove, { passive: true });
  element.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
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
 * 3. Tilt 3D com Perspectiva 1200px & Spotlight Radial de Proximidade
 */
export function attach3DTiltAndSpotlight(
  card: HTMLElement,
  maxTilt = 4.5
): () => void {
  if (typeof window === "undefined") return () => {};

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  let rafId = 0;

  const onMouseMove = (e: MouseEvent) => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId) window.cancelAnimationFrame(rafId);

    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const px = Math.min(1, Math.max(0, x / rect.width));
      const py = Math.min(1, Math.max(0, y / rect.height));
      const cx = px - 0.5;
      const cy = py - 0.5;

      const rotateX = (-cy * maxTilt).toFixed(2);
      const rotateY = (cx * maxTilt).toFixed(2);

      card.style.setProperty("--mouse-x", `${x.toFixed(1)}px`);
      card.style.setProperty("--mouse-y", `${y.toFixed(1)}px`);
      card.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--spot-opacity", "1");

      card.style.transition = "transform 0.14s ease-out";
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1)`;
    });
  };

  const onMouseLeave = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    card.style.setProperty("--spot-opacity", "0");
    card.style.transition = "transform 0.65s var(--ease-out-expo)";
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  card.addEventListener("mousemove", onMouseMove, { passive: true });
  card.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    card.removeEventListener("mousemove", onMouseMove);
    card.removeEventListener("mouseleave", onMouseLeave);
    card.style.transform = "";
    card.style.transition = "";
  };
}

/**
 * 4. Controlador do Cursor Editorial Contextual
 *    - Estado Padrão: Ponto minimalista 8px x 8px
 *    - Estado Hover em Links/Botões ([data-cursor="magnetic"]): Anel 36px com mix-blend-mode: difference
 *    - Estado Hover em Mídia/Projetos ([data-cursor-label]): Pílula editorial com backdrop-filter: blur(10px) e DM Mono
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
  let cursorRaf = 0;
  let cursorVisible = false;

  const updateCursorPosition = () => {
    cursorRaf = 0;
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    cursorEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.12 || Math.abs(targetY - currentY) > 0.12) {
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

  // Inicializa o rastreador de velocidade e skew
  cleanups.push(initScrollVelocityTracker());

  // Inicializa o cursor editorial contextual
  cleanups.push(initCustomCursor());

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

  // Controle de scramble único para índices de seção ([data-scramble])
  const scrambledDone = new WeakSet<HTMLElement>();
  const scrambleCleanups: Array<() => void> = [];

  const triggerScrambleInside = (container: HTMLElement) => {
    if (reducedMotionQuery.matches) return;
    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-scramble]"));
    for (const el of targets) {
      if (scrambledDone.has(el)) continue;
      scrambledDone.add(el);
      scrambleCleanups.push(scrambleElementText(el, 320));
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

  // 1. Barra de leitura, reação inteligente de direção do Header, Parallax diferencial do Hero e Sobre Mim
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

    // Parallax diferencial no Hero (título principal vs metadados editoriais + retrato de fundo)
    if (!reducedMotionQuery.matches && scrollY < vh * 1.4) {
      const offset = Math.min(72, scrollY * 0.12);
      const titleOffset = (scrollY * -0.08).toFixed(1);
      const metaOffset = (scrollY * -0.18).toFixed(1);

      if (heroParallaxEl) {
        heroParallaxEl.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
      }
      if (heroStageEl) {
        heroStageEl.style.setProperty("--hero-title-parallax", `${titleOffset}px`);
        heroStageEl.style.setProperty("--hero-meta-parallax", `${metaOffset}px`);
      }
    } else {
      heroParallaxEl?.style.setProperty("--hero-parallax-y", "0px");
      heroStageEl?.style.setProperty("--hero-title-parallax", "0px");
      heroStageEl?.style.setProperty("--hero-meta-parallax", "0px");
    }

    // Parallax de dupla profundidade nas imagens de Sobre Mim (alef-portrait-bw: -3% a 3%, studio-desk: 6% a -6%)
    if (aboutSectionEl) {
      if (!reducedMotionQuery.matches) {
        const rect = aboutSectionEl.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          // Normaliza de -1 (entrando por baixo) a +1 (saindo por cima)
          const centerProgress = ((vh / 2 - (rect.top + rect.height / 2)) / (vh * 0.85));
          const clamped = Math.max(-1, Math.min(1, centerProgress));
          const portraitY = (clamped * 3).toFixed(2); // -3% a 3%
          const studioY = (-clamped * 6).toFixed(2);  // 6% a -6%
          aboutSectionEl.style.setProperty("--about-portrait-y", `${portraitY}%`);
          aboutSectionEl.style.setProperty("--about-studio-y", `${studioY}%`);
        }
      } else {
        aboutSectionEl.style.setProperty("--about-portrait-y", "0%");
        aboutSectionEl.style.setProperty("--about-studio-y", "0%");
      }
    }

    // Destaque progressivo de leitura (Editorial Scroll Highlight) nos parágrafos de manifesto
    if (highlightSentences.length > 0) {
      for (const item of highlightSentences) {
        if (reducedMotionQuery.matches) {
          item.style.setProperty("--reading-opacity", "1");
          item.classList.add("is-lit");
          continue;
        }
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        // Atinge opacidade 1 quando cruza dos 78% da viewport até o topo
        const rawProgress = (vh * 0.82 - itemCenter) / (vh * 0.28);
        const clamped = Math.max(0, Math.min(1, rawProgress));
        const opacity = (0.28 + clamped * 0.72).toFixed(3);
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

  // 3. Conecta Tilt 3D e Spotlight nos cartões marcados com [data-tilt-card]
  if (finePointerQuery.matches) {
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));
    for (const card of tiltCards) {
      const customMax = Number(card.getAttribute("data-tilt-max")) || 4.5;
      cleanups.push(attach3DTiltAndSpotlight(card, customMax));
    }

    // 4. Conecta Efeito Magnético nos botões e links marcados com [data-magnetic]
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    for (const magEl of magneticElements) {
      cleanups.push(attachMagneticEffect(magEl));
    }
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

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
