/**
 * Sistema de movimento editorial discreto e cinematográfico
 * - Revelação gradual de capítulos e pranchas fotográficas via IntersectionObserver + fallback no scroll
 * - Barra de leitura de edição e cabeçalho adaptativo
 * - Luz direcional de estúdio discreta nas pranchas fotográficas
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

  // 1. Barra de leitura de capítulo & estado compacto do cabeçalho
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

  // 3. Luz direcional discreta nas pranchas de projetos
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

        plateEl.style.setProperty("--spot-x", `${(relX * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-y", `${(relY * 100).toFixed(1)}%`);
        plateEl.style.setProperty("--spot-opacity", "1");
      });
    };

    const handlePointerLeave = () => {
      if (spotRaf) {
        window.cancelAnimationFrame(spotRaf);
        spotRaf = 0;
      }
      plateEl.style.setProperty("--spot-opacity", "0");
    };

    plateEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    plateEl.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    cleanups.push(() => {
      if (spotRaf) window.cancelAnimationFrame(spotRaf);
      plateEl.removeEventListener("pointermove", handlePointerMove);
      plateEl.removeEventListener("pointerleave", handlePointerLeave);
    });
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
