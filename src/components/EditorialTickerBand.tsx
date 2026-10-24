import { useState, useEffect, useRef } from "react";

export const tickerPhrases = [
  "ENGENHARIA DE SOFTWARE",
  "ARQUITETURA REACT 19 & TYPESCRIPT",
  "DIREÇÃO EDITORIAL MONOCROMÁTICA",
  "01. VERSO — LEITURA PROFUNDA",
  "02. DECODE — DESIGN GRÁFICO INTERATIVO",
  "03. NUDEMO — CONCEITO 3D & MOBILE",
  "INTERFACES AUTORAIS & CÓDIGO LIMPO",
];

export function EditorialTickerBand() {
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const bandRef = useRef<HTMLDivElement>(null);

  // Pausa automática fora da viewport para poupar bateria e ciclos de GPU no mobile
  useEffect(() => {
    const el = bandRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isPaused = userPaused || !inView;

  return (
    <div
      ref={bandRef}
      className={`editorial-ticker-band ${isPaused ? "is-paused" : ""}`}
      role="region"
      aria-label="Faixa editorial de temas e projetos"
    >
      <div className="ticker-track-viewport">
        <div className="ticker-track">
          <div className="ticker-group">
            {tickerPhrases.map((phrase, idx) => (
              <span key={idx} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span>{phrase}</span>
              </span>
            ))}
          </div>
          <div className="ticker-group" aria-hidden="true">
            {tickerPhrases.map((phrase, idx) => (
              <span key={`dup-${idx}`} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span>{phrase}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="ticker-pause-btn mono"
        aria-pressed={userPaused}
        aria-label={userPaused ? "Retomar movimento da faixa editorial" : "Pausar movimento da faixa editorial"}
        onClick={() => setUserPaused((prev) => !prev)}
      >
        <span className="ticker-pause-glyph" aria-hidden="true">
          {userPaused ? "▶" : "❚❚"}
        </span>
        <span>{userPaused ? "RETOMAR" : "PAUSAR"}</span>
      </button>
    </div>
  );
}
