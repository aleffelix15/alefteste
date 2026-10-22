/**
 * Sistema de movimento nativo — Editorial Escuro (v2)
 * Utiliza exclusivamente IntersectionObserver, Web Animations API,
 * requestAnimationFrame e CSS Custom Properties (transform / opacity).
 * Respeita integralmente prefers-reduced-motion: reduce e (hover: hover) and (pointer: fine).
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

  // -------------------------------------------------------------------------
  // 1. Barra de progresso de leitura + Header compacto + Linha da Timeline
  // -------------------------------------------------------------------------
  const progressBar = document.querySelector<HTMLElement>("[data-scroll-progress]");
  const header = document.querySelector<HTMLElement>("[data-header]");
  const timelineSection = document.querySelector<HTMLElement>("[data-timeline-section]");

  const updateScrollMetrics = () => {
    rafScrollId = 0;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (header) {
      header.classList.toggle("is-compact", scrollY > 24);
    }

    if (timelineSection) {
      if (reducedMotionQuery.matches) {
        timelineSection.style.setProperty("--timeline-progress", "1");
      } else {
        const rect = timelineSection.getBoundingClientRect();
        const vh = window.innerHeight;
        // Começa a desenhar quando o topo da seção entra em 80% da viewport
        // e completa quando atinge 25% da viewport
        const start = vh * 0.82;
        const end = vh * 0.22;
        const raw = (start - rect.top) / Math.max(1, start - end);
        const clamped = Math.min(1, Math.max(0.08, raw));
        timelineSection.style.setProperty("--timeline-progress", clamped.toFixed(4));
      }
    }
  };

  const onScroll = () => {
    if (!rafScrollId) {
      rafScrollId = window.requestAnimationFrame(updateScrollMetrics);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScrollMetrics();

  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (rafScrollId) {
      window.cancelAnimationFrame(rafScrollId);
    }
  });

  // -------------------------------------------------------------------------
  // 2. Reveal ao rolar com IntersectionObserver e Stagger
  // -------------------------------------------------------------------------
  const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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

    root.classList.add("motion-ready");

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            observer?.unobserve(target);
          }
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    const vh = window.innerHeight;
    for (const el of revealElements) {
      const rect = el.getBoundingClientRect();
      // Elementos já visíveis na dobra inicial aparecem imediatamente sem atraso de scroll
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    }
  };

  setupReveal();

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

  // -------------------------------------------------------------------------
  // 3. Tilt 3D leve (máx. 4°) + Spotlight no cursor em imagens de projetos
  //    Restrito a (hover: hover) and (pointer: fine) e sem movimento reduzido
  // -------------------------------------------------------------------------
  const tiltElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-media]"));
  const MAX_TILT_DEG = 4;

  for (const mediaEl of tiltElements) {
    let tiltRaf = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches || !finePointerQuery.matches) {
        return;
      }
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (tiltRaf) {
        window.cancelAnimationFrame(tiltRaf);
      }

      tiltRaf = window.requestAnimationFrame(() => {
        tiltRaf = 0;
        const rect = mediaEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const relX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const relY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

        // Tilt suave limitado a +-4 graus
        const tiltY = (relX - 0.5) * 2 * MAX_TILT_DEG;
        const tiltX = (0.5 - relY) * 2 * MAX_TILT_DEG;

        mediaEl.style.setProperty("--spot-x", `${(relX * 100).toFixed(1)}%`);
        mediaEl.style.setProperty("--spot-y", `${(relY * 100).toFixed(1)}%`);
        mediaEl.style.setProperty("--spot-opacity", "1");
        mediaEl.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        mediaEl.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      });
    };

    const handlePointerLeave = () => {
      if (tiltRaf) {
        window.cancelAnimationFrame(tiltRaf);
        tiltRaf = 0;
      }
      mediaEl.style.setProperty("--spot-opacity", "0");
      mediaEl.style.setProperty("--tilt-x", "0deg");
      mediaEl.style.setProperty("--tilt-y", "0deg");
    };

    mediaEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    mediaEl.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    cleanups.push(() => {
      if (tiltRaf) window.cancelAnimationFrame(tiltRaf);
      mediaEl.removeEventListener("pointermove", handlePointerMove);
      mediaEl.removeEventListener("pointerleave", handlePointerLeave);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Acordeão nativo <details> com Web Animations API (transform + opacity)
  // -------------------------------------------------------------------------
  const detailsElements = Array.from(
    document.querySelectorAll<HTMLDetailsElement>("[data-animated-details]")
  );

  for (const details of detailsElements) {
    const drawer = details.querySelector<HTMLElement>(".details-drawer");
    if (!drawer) continue;

    const handleToggle = () => {
      if (reducedMotionQuery.matches || !details.open || typeof drawer.animate !== "function") {
        return;
      }
      drawer.animate(
        [
          { opacity: 0, transform: "translateY(-6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 220,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        }
      );
    };

    details.addEventListener("toggle", handleToggle);
    cleanups.push(() => details.removeEventListener("toggle", handleToggle));
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
