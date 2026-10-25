import { useState, useRef, useEffect } from "react";
import { getScrollVelocity } from "../motion";

export const tickerPhrases = [
  "ENGENHARIA DE SOFTWARE",
  "ARQUITETURA REACT 19 & TYPESCRIPT",
  "DIREÇÃO EDITORIAL MONOCROMÁTICA",
  "01. VERSO — LEITURA PROFUNDA",
  "02. DECODE — DESIGN GRÁFICO INTERATIVO",
  "INTERFACES AUTORAIS & CÓDIGO LIMPO",
];

export function EditorialTickerBand() {
  const [paused, setPaused] = useState(false);
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const kickRef = useRef<() => void>(() => {});
  const cachedAnimationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let currentRate = 1;

    // PERF: Cachear trackEl.getAnimations() para não instanciar novos objetos a cada frame
    if (cachedAnimationsRef.current.length === 0) {
      cachedAnimationsRef.current = trackEl.getAnimations?.() || [];
    }

    const syncPlaybackRate = () => {
      rafId = 0;

      // PERF: Pular loop rAF se a faixa editorial estiver fora da tela
      if (bandRef.current?.classList.contains("is-offscreen")) {
        return;
      }

      if (cachedAnimationsRef.current.length === 0) {
        cachedAnimationsRef.current = trackEl.getAnimations?.() || [];
      }
      if (cachedAnimationsRef.current.length === 0) return;

      // PERF: Ler velocidade via variável de módulo getScrollVelocity() sem consultar o DOM
      const velocity = Math.abs(getScrollVelocity());

      let targetRate = 1;
      if (paused) {
        targetRate = 0;
      } else if (isHoveredRef.current) {
        targetRate = 0.22; // Desaceleração suave de estúdio no hover
      } else if (velocity > 0.1) {
        targetRate = Math.min(4.2, 1 + velocity * 0.085);
      }

      currentRate += (targetRate - currentRate) * 0.14;

      for (const anim of cachedAnimationsRef.current) {
        try {
          anim.playbackRate = Number(currentRate.toFixed(3));
        } catch {}
      }

      if (Math.abs(targetRate - currentRate) > 0.02 || velocity > 0.1) {
        rafId = window.requestAnimationFrame(syncPlaybackRate);
      }
    };

    // PERF: Função kick para despertar o loop sem disparar window.dispatchEvent('scroll')
    kickRef.current = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(syncPlaybackRate);
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(syncPlaybackRate);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = window.requestAnimationFrame(syncPlaybackRate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [paused]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    kickRef.current();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    kickRef.current();
  };

  return (
    <div
      ref={bandRef}
      className={`editorial-ticker-band ${paused ? "is-paused" : ""}`}
      role="region"
      aria-label="Faixa editorial de temas e projetos"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ticker-track-viewport">
        <div ref={trackRef} className="ticker-track">
          <div className="ticker-group">
            {tickerPhrases.map((phrase, idx) => (
              <span key={idx} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span className="ticker-phrase-text">{phrase}</span>
              </span>
            ))}
          </div>
          <div className="ticker-group" aria-hidden="true">
            {tickerPhrases.map((phrase, idx) => (
              <span key={`dup-${idx}`} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span className="ticker-phrase-text">{phrase}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="ticker-pause-btn mono"
        aria-pressed={paused}
        aria-label={paused ? "Retomar movimento da faixa editorial" : "Pausar movimento da faixa editorial"}
        data-magnetic
        data-cursor="magnetic"
        onClick={() => setPaused((prev) => !prev)}
      >
        <span className="ticker-pause-glyph" aria-hidden="true">
          {paused ? "▶" : "❚❚"}
        </span>
        <span>{paused ? "RETOMAR" : "PAUSAR"}</span>
      </button>
    </div>
  );
}
