export function RollText({ text }: { text: string }) {
  return (
    <span className="hover-roll-text">
      <span className="hover-roll-primary">{text}</span>
      <span className="hover-roll-clone" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
