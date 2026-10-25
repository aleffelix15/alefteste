interface RollTextProps {
  text: string;
  serifAccent?: boolean;
}

export function RollText({ text, serifAccent = true }: RollTextProps) {
  return (
    <span
      className={`hover-roll-text ${serifAccent ? "has-serif-accent" : ""}`}
      aria-label={text}
    >
      <span className="roll-line roll-line--top" aria-hidden="true">
        {text}
      </span>
      <span className="roll-line roll-line--bottom" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
