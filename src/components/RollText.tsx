import React from "react";

interface RollTextProps {
  text: string;
  serifAccent?: boolean;
}

export function RollText({ text, serifAccent = true }: RollTextProps) {
  const chars = text.split("");

  return (
    <span
      className={`hover-roll-text ${serifAccent ? "has-serif-accent" : ""}`}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, idx) => {
        const displayChar = char === " " ? "\u00A0" : char;
        return (
          <span
            key={idx}
            className="roll-char-cell"
            aria-hidden="true"
            style={{ "--char-index": idx } as React.CSSProperties}
          >
            <span className="roll-char roll-char--top">{displayChar}</span>
            <span className="roll-char roll-char--bottom">{displayChar}</span>
          </span>
        );
      })}
    </span>
  );
}
