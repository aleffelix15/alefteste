import { useRef, useEffect } from "react";
import { attachMagneticEffect } from "../motion";

export function MonogramLogo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    return attachMagneticEffect(el as unknown as HTMLElement, {
      strength: 0.32,
      innerSelector: ".monogram-dot",
      innerStrength: 0.48,
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="monogram-svg"
    >
      <path
        d="M12 3L3.5 20.5H7.2L12 10.2L16.8 20.5H20.5L12 3Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        className="monogram-stroke-path"
      />
      <circle
        cx="12"
        cy="17.5"
        r="1.7"
        fill="currentColor"
        className="monogram-dot"
      />
    </svg>
  );
}
