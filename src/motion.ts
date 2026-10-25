/**
 * Motor de Movimento Ultra-Leve v5 (Cirurgia de Performance Extrema)
 * - Zero listeners contínuos de scroll em JavaScript (100% livre de layout thrashing e recalcs de estilo no scroll)
 * - Zero loops infinitos requestAnimationFrame: física direta via CSS transitions e rAF acionado apenas sob demanda
 * - Efeito Magnético leve com cache de dimensões em mouseenter e dispatch isolado por elemento
 * - Cursor Editorial Contextual de custo zero para o framebuffer
 * - IntersectionObserver Fire-Once absoluto: desinscrição imediata após ativação (0% de uso de CPU após reveal)
 */

export interface MagneticOptions {
  strength?: number;
  innerSelector?: string;
  innerStrength?: number;
}

/**
 * Utilitário de amortecimento exponencial puro (função matemática pura sem efeitos colaterais).
 */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/**
 * Stub de compatibilidade para leitura de velocidade de rolagem (sempre neutro para não gerar repaints).
 */
export function getScrollVelocity(): number {
  return 0;
}

/**
 * Stub leve de decodificação de texto para compatibilidade.
 */
export function scrambleElementText(_el: HTMLElement, _durationMs = 240): () => void {
  return () => {};
}

/**
 * Stub de compatibilidade para Tilt 3D (desativado para performance 60/120fps).
 */
export function attach3DTiltAndSpotlight(_card: HTMLElement, _maxTilt = 4): () => void {
  return () => {};
}

/**
 * Efeito Magnético Ultra-Leve para Desktop (MonogramLogo e CvButton)
 * - Não usa loops rAF contínuos nem damp() infinito.
 * - getBoundingClientRect() calculado exclusivamente no mouseenter.
 * - Atualiza transform via único rAF por evento mousemove.
 * - Retorna suavemente à posição original no mouseleave via CSS transition.
 */
export function attachMagneticEffect(
  element: HTMLElement,
  options?: MagneticOptions
): () => void {
  if (typeof window === "undefined") return () => {};

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  const strength = options?.strength ?? 0.28;
  const innerStrength = options?.innerStrength ?? 0.42;
  const innerSelector = options?.innerSelector;
  const innerEl = innerSelector ? element.querySelector<HTMLElement>(innerSelector) : null;

  element.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
  if (innerEl) {
    innerEl.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
  }

  let cachedRect: DOMRect | null = null;
  let rafPending = false;
  let targetX = 0;
  let targetY = 0;
  let innerTargetX = 0;
  let innerTargetY = 0;

  const onMouseEnter = () => {
    cachedRect = element.getBoundingClientRect();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!cachedRect) {
      cachedRect = element.getBoundingClientRect();
    }
    if (cachedRect.width === 0 || cachedRect.height === 0) return;

    const centerX = cachedRect.left + cachedRect.width / 2;
    const centerY = cachedRect.top + cachedRect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    targetX = Math.max(-14, Math.min(14, distX * strength));
    targetY = Math.max(-10, Math.min(10, distY * strength));

    if (innerEl) {
      innerTargetX = Math.max(-10, Math.min(10, distX * (innerStrength - strength)));
      innerTargetY = Math.max(-8, Math.min(8, distY * (innerStrength - strength)));
    }

    if (!rafPending) {
      rafPending = true;
      window.requestAnimationFrame(() => {
        rafPending = false;
        element.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0)`;
        if (innerEl) {
          innerEl.style.transform = `translate3d(${innerTargetX.toFixed(1)}px, ${innerTargetY.toFixed(1)}px, 0)`;
        }
      });
    }
  };

  const onMouseLeave = () => {
    cachedRect = null;
    element.style.transform = "translate3d(0, 0, 0)";
    if (innerEl) {
      innerEl.style.transform = "translate3d(0, 0, 0)";
    }
  };

  element.addEventListener("mouseenter", onMouseEnter, { passive: true });
  element.addEventListener("mousemove", onMouseMove, { passive: true });
  element.addEventListener("mouseleave", onMouseLeave, { passive: true });

  return () => {
    element.removeEventListener("mouseenter", onMouseEnter);
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
    element.style.transform = "";
    element.style.transition = "";
    if (innerEl) {
      innerEl.style.transform = "";
      innerEl.style.transition = "";
    }
  };
}

/**
 * Cursor Contextual Editorial Ultra-Leve (PC)
 * - 1 único elemento DOM leve, transladado exclusivamente via translate3d(x, y, 0).
 * - Sem backdrop-filter e sem mix-blend-mode: zero impacto no framebuffer da GPU.
 */
export function initCustomCursor(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointerQuery.matches || !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  const cursorEl = document.querySelector<HTMLElement>("[data-editorial-cursor]");
  const cursorTextEl = document.querySelector<HTMLElement>("[data-editorial-cursor-text]");
  if (!cursorEl) return () => {};

  let rafScheduled = false;
  let posX = -100;
  let posY = -100;
  let isVisible = false;

  const onPointerMove = (e: PointerEvent) => {
    posX = e.clientX;
    posY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursorEl.classList.add("is-active");
    }

    const targetNode = e.target as HTMLElement | null;
    const labeledAncestor = targetNode?.closest<HTMLElement>("[data-cursor-label]");
    const magneticAncestor = targetNode?.closest<HTMLElement>(
      '[data-cursor="magnetic"], [data-magnetic], a, button'
    );

    if (labeledAncestor && cursorTextEl) {
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

    if (!rafScheduled) {
      rafScheduled = true;
      window.requestAnimationFrame(() => {
        rafScheduled = false;
        cursorEl.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0)`;
      });
    }
  };

  const onMouseLeaveDoc = () => {
    isVisible = false;
    cursorEl.classList.remove("is-active", "has-label", "is-magnetic");
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("mouseleave", onMouseLeaveDoc, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("mouseleave", onMouseLeaveDoc);
  };
}

/**
 * Inicializador Mestre de Movimento
 * - Conecta IntersectionObserver "Fire-Once": desinscreve cada elemento assim que entra na tela.
 * - Conecta cursor e efeito magnético nos botões elegíveis.
 * - ZERO listeners de scroll em JavaScript.
 */
export function initPortfolioMotion(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  const root = document.documentElement;
  const cleanups: Array<() => void> = [];

  // 1. Inicializa o cursor contextual leve para ponteiros finos
  cleanups.push(initCustomCursor());

  // 2. Conecta Efeito Magnético nos botões [data-magnetic] no Desktop
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (finePointerQuery.matches) {
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    for (const magEl of magneticElements) {
      cleanups.push(attachMagneticEffect(magEl));
    }
  }

  // 3. Revelações no scroll: IntersectionObserver Fire-Once com margem antecipada (zero flash preto)
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const chapterSections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter-section]"));

  if ("IntersectionObserver" in window) {
    root.classList.add("motion-ready");

    // Revela imediatamente tudo o que estiver na primeira viewport e na dobra seguinte (zero espera)
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 900;
    const initialCutoff = windowHeight * 1.5;
    for (const el of revealElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= initialCutoff) {
        el.classList.add("is-visible");
      }
    }
    for (const sec of chapterSections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= initialCutoff) {
        sec.classList.add("is-chapter-drawn");
      }
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target.hasAttribute("data-chapter-section")) {
              target.classList.add("is-chapter-drawn");
            } else {
              target.classList.add("is-visible");
            }
            // Fire-once imediato: desinscreve o elemento para 0% de uso de CPU no restante da navegação
            revealObserver.unobserve(target);
          }
        }
      },
      {
        rootMargin: "450px 0px 450px 0px",
        threshold: 0.01,
      }
    );

    revealElements.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        revealObserver.observe(el);
      }
    });
    chapterSections.forEach((sec) => {
      if (!sec.classList.contains("is-chapter-drawn")) {
        revealObserver.observe(sec);
      }
    });

    // Fallback de segurança absoluto: após 2s, revela qualquer elemento residual
    const safetyTimer = window.setTimeout(() => {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      chapterSections.forEach((sec) => sec.classList.add("is-chapter-drawn"));
    }, 2000);

    cleanups.push(() => {
      revealObserver.disconnect();
      window.clearTimeout(safetyTimer);
    });
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    chapterSections.forEach((sec) => sec.classList.add("is-chapter-drawn"));
  }

  // 4. Acordeão técnico (details[data-animated-details])
  const detailsElements = Array.from(
    document.querySelectorAll<HTMLDetailsElement>("details[data-animated-details]")
  );

  for (const detailsEl of detailsElements) {
    const summaryEl = detailsEl.querySelector<HTMLElement>("summary");
    if (!summaryEl) continue;

    let currentAnimation: Animation | null = null;

    const onSummaryClick = (e: MouseEvent) => {
      if (typeof detailsEl.animate !== "function") return;
      e.preventDefault();

      if (currentAnimation) currentAnimation.cancel();
      const startHeight = `${detailsEl.offsetHeight}px`;

      if (detailsEl.open) {
        const endHeight = `${summaryEl.offsetHeight + 20}px`;
        detailsEl.style.overflow = "hidden";

        currentAnimation = detailsEl.animate(
          { height: [startHeight, endHeight] },
          { duration: 240, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
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
          { duration: 280, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
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
    for (const cleanup of cleanups) cleanup();
  };
}
