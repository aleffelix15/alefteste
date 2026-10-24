import React, { useState } from "react";

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

  return (
    <div
      className={`editorial-ticker-band ${paused ? "is-paused" : ""}`}
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
        aria-pressed={paused}
        aria-label={paused ? "Retomar movimento da faixa editorial" : "Pausar movimento da faixa editorial"}
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
