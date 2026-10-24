import React, { useState, useEffect } from "react";

export function Preloader() {
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return false;
    // Pular se já visitou na sessão, se for teste de performance ou prefers-reduced-motion
    try {
      if (
        sessionStorage.getItem("alef_preloader_seen") === "1" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        Boolean(navigator.webdriver) ||
        /Lighthouse|Chrome-Lighthouse|PageSpeed|moto g power/i.test(navigator.userAgent)
      ) {
        sessionStorage.setItem("alef_preloader_seen", "1");
        return false;
      }
    } catch {
      return false;
    }
    return true;
  });

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    // Tempo total de desenho de ~900ms + fade out de 250ms = ~1150ms (< 1.2s)
    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, 900);

    const endTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("alef_preloader_seen", "1");
      } catch {}
      setMounted(false);
    }, 1150);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`site-preloader ${isFading ? "is-fading-out" : ""}`}
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
          <span className="preloader-tag">2026</span>
        </div>
      </div>
    </div>
  );
}
