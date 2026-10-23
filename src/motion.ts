/**
 * Coreografia de Movimento Editorial — Álef Felix Teixeira
 * - Revelação em máscara tipográfica (.line-mask > .line-inner) e capítulos via IntersectionObserver + fallback no scroll
 * - Paralaxe suave de profundidade no cenário fotográfico do estúdio (Hero)
 * - Botões e links magnéticos ([data-magnetic]) com física amortecida
 * - Tilt 3D sutil (±3°) + luz direcional de estúdio ([data-tilt-card]) em dispositivos com mouse
 * - Acordeão técnico suave via Web Animations API (details[data-animated-details])
 * - Respeito estrito a prefers-reduced-motion: reduce
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

  const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
  const header = document.querySelector<HTMLElement>(".site-header");
  const heroParallaxEl = document.querySelector<HTMLElement>("[data-hero-parallax]");
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  const revealVisibleInViewport = () => {
    const vh = window.innerHeight;
    for (const el of revealElements) {
      if (el.classList.contains("is-visible")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.96) {
        el.classList.add("is-visible");
      }
    }
  };

  // 1. Barra de leitura de capítulo, cabeçalho compacto & paralaxe suave do estúdio
  const updateScrollMetrics = () => {
    rafScrollId = 0;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (header) {
      header.classList.toggle("is-compact", scrollY > 32);
    }

    if (heroParallaxEl) {
      if (!reducedMotionQuery.matches && scrollY < window.innerHeight * 1.4) {
        const offset = Math.min(72, scrollY * 0.12);
        heroParallaxEl.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
      } else {
        heroParallaxEl.style.setProperty("--hero-parallax-y", "0px");
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
      return;
    }

    const vh = window.innerHeight;
    const initiallyVisible = new Set<HTMLElement>();
    for (const el of revealElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.96) {
        initiallyVisible.add(el);
      }
    }

    root.classList.add("motion-ready");

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
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
      if (initiallyVisible.has(el)) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
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

  // 3. Luz direcional + Tilt 3D sutil nas pranchas e molduras ([data-tilt-card])
  const plateElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));

  for (const plateEl of plateElements) {
    let spotRaf = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (spotRaf) window.cancelAnimationFrame(spotRaf);

      spotRaf = window.requestAnimationFrame(() => {
        spotRaf = 0;
        const rect = plateEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const relX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const relY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

        // Tilt 3D discreto (±2.8 graus máximo para elegância editorial)
        const tiltX = (0.5 - relY) * 5.6;
        const tiltY = (relX - 0.5) * 5.6;

        plateEl.style.setProperty("--spot-x", `${(relX * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-y", `${(relY * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-opacity", "1");
        plateEl.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        plateEl.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      });
    };

    const handlePointerLeave = () => {
      if (spotRaf) {
        window.cancelAnimationFrame(spotRaf);
        spotRaf = 0;
      }
      plateEl.style.setProperty("--spot-opacity", "0");
      plateEl.style.setProperty("--tilt-x", "0deg");
      plateEl.style.setProperty("--tilt-y", "0deg");
    };

    plateEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    plateEl.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    cleanups.push(() => {
      if (spotRaf) window.cancelAnimationFrame(spotRaf);
      plateEl.removeEventListener("pointermove", handlePointerMove);
      plateEl.removeEventListener("pointerleave", handlePointerLeave);
    });
  }

  // 4. Botões e links magnéticos ([data-magnetic])
  const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

  for (const magEl of magneticElements) {
    let magRaf = 0;

    const onMagMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (magRaf) window.cancelAnimationFrame(magRaf);

      magRaf = window.requestAnimationFrame(() => {
        magRaf = 0;
        const rect = magEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = Math.max(-7, Math.min(7, (clientX - centerX) * 0.16));
        const deltaY = Math.max(-5, Math.min(5, (clientY - centerY) * 0.16));

        magEl.style.setProperty("--mag-x", `${deltaX.toFixed(2)}px`);
        magEl.style.setProperty("--mag-y", `${deltaY.toFixed(2)}px`);
      });
    };

    const onMagLeave = () => {
      if (magRaf) {
        window.cancelAnimationFrame(magRaf);
        magRaf = 0;
      }
      magEl.style.setProperty("--mag-x", "0px");
      magEl.style.setProperty("--mag-y", "0px");
    };

    magEl.addEventListener("pointermove", onMagMove, { passive: true });
    magEl.addEventListener("pointerleave", onMagLeave, { passive: true });

    cleanups.push(() => {
      if (magRaf) window.cancelAnimationFrame(magRaf);
      magEl.removeEventListener("pointermove", onMagMove);
      magEl.removeEventListener("pointerleave", onMagLeave);
    });
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
        return; // deixa o comportamento nativo imediato
      }

      e.preventDefault();

      if (currentAnimation) {
        currentAnimation.cancel();
      }

      const startHeight = `${detailsEl.offsetHeight}px`;

      if (detailsEl.open) {
        // Fechando
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
        // Abrindo
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
