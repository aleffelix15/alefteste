import { useState, useEffect } from "react";

export function Preloader() {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    // Pular se já visitou na sessão ou se prefers-reduced-motion estiver ativo
    try {
      if (
        sessionStorage.getItem("alef_preloader_seen") === "1" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        sessionStorage.setItem("alef_preloader_seen", "1");
        return false;
      }
    } catch {
      return false;
    }
    return true;
  });

  const [count, setCount] = useState(0);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.add("preloader-running");

    let rafId = 0;
    const duration = 760;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out quart para contagem fluida
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(updateCounter);
      }
    };

    rafId = window.requestAnimationFrame(updateCounter);

    // Inicia subida da cortina curva em 820ms (duração 950ms com --ease-curtain)
    const liftTimer = window.setTimeout(() => {
      setCount(100);
      setIsLifting(true);
      root.classList.remove("preloader-running");
      root.classList.add("preloader-lifting");
    }, 820);

    const endTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("alef_preloader_seen", "1");
      } catch {}
      root.classList.remove("preloader-lifting");
      setMounted(false);
    }, 1780);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(liftTimer);
      window.clearTimeout(endTimer);
      root.classList.remove("preloader-running", "preloader-lifting");
    };
  }, [mounted]);

  if (!mounted) return null;

  const formattedCount = String(count).padStart(3, "0");

  return (
    <div
      className={`site-preloader ${isLifting ? "is-lifting-curtain" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="preloader-content">
        <svg
          className="preloader-monogram"
          viewBox="0 0 100 100"
          width="72"
          height="72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Triângulo / Estrutura do monograma A desenhado com stroke */}
          <path
            d="M50 14L16 84H31L50 44L69 84H84L50 14Z"
            stroke="var(--accent-electric)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="preloader-path"
          />
          {/* Ponto focal central que pulsa e acende */}
          <circle
            cx="50"
            cy="72"
            r="6"
            fill="var(--accent-cyan)"
            className="preloader-dot"
          />
        </svg>

        <div className="preloader-meta mono">
          <span className="preloader-name">ÁLEF FELIX</span>
          <span className="preloader-bar" />
          <span className="preloader-tag">EDIÇÃO 2026</span>
        </div>

        {/* Contador numérico progressivo 000 -> 100 em DM Mono 500 */}
        <div className="preloader-counter-wrap mono">
          <span className="preloader-counter-digits">{formattedCount}</span>
          <span className="preloader-counter-unit">%</span>
        </div>
      </div>

      {/* Borda inferior curva da cortina que achata conforme sobe */}
      <svg
        className="preloader-curtain-arch"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,20 Q720,140 0,20 Z"
          fill="var(--bg-obsidian)"
        />
      </svg>
    </div>
  );
}
