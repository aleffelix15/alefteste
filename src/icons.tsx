import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function ReactIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23 23 20.46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.5 0h21l-1.9 21.6-8.6 2.4-8.6-2.4zm17.5 8H5v2.8h4.6V20h3.2v-9.2H19zm-8.8 6.6c-.6 0-1.2.2-1.7.5l.8 2.2c.4-.3.9-.4 1.4-.4.8 0 1.2.4 1.2.9 0 .6-.4.9-1.3 1.2-1.5.6-2.5 1.3-2.5 2.7 0 1.6 1.3 2.7 3.3 2.7 1 0 1.9-.3 2.6-.7l-.8-2.2c-.5.3-1.1.5-1.7.5-.8 0-1.2-.4-1.2-.9 0-.5.4-.8 1.4-1.2 1.6-.6 2.4-1.4 2.4-2.7 0-1.7-1.4-2.7-3.2-2.7z" />
    </svg>
  );
}

export function JavaScriptIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.892-1.642-2.164-2.162l-.7-.294c-.742-.315-1.127-.638-1.127-1.144 0-.472.368-.821.996-.821.657 0 1.05.28 1.295.77l1.785-1.14c-.56-1.103-1.54-1.68-3.08-1.68-1.908 0-3.238 1.155-3.238 2.853 0 1.348.805 2.188 2.38 2.8l.683.272c.875.368 1.243.718 1.243 1.243 0 .543-.49.91-1.243.91-.98 0-1.505-.49-1.803-1.243l-1.82 1.05c.578 1.278 1.715 1.943 3.623 1.943 2.118 0 3.395-1.12 3.395-2.853v-.005zm-8.75 2.118v-8.05h-2.205v8.19c0 1.838-.98 2.625-2.52 2.625-.56 0-1.085-.105-1.47-.28l-.35 1.89c.56.245 1.295.385 2.135.385 2.66 0 4.41-1.33 4.41-4.76z" />
    </svg>
  );
}

export function ViteIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m23.6 3.6-11.8 20.4L0 3.6h4.5l7.3 12.8L19.1 3.6zM15 1.4 7.6 9.6h4.8l-1.9 6.8 7.4-8.2h-4.8z" />
    </svg>
  );
}

export function TailwindIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function TanStackIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ThreeIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.6 17.8-8.8-15.2a1 1 0 0 0-1.6 0L2.4 17.8a1 1 0 0 0 .8 1.5h17.6a1 1 0 0 0 .8-1.5zm-9.6-11 5.9 10.2H6.1z" />
    </svg>
  );
}

export function FramerMotionIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zm0 8h8v8l-8-8z" />
    </svg>
  );
}

export function ZodIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4h16L4 20h16" />
    </svg>
  );
}

export function VitestIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m18.775 2.158-5.32 9.215-2.274-3.938 3.04-5.277H8.847l-6.38 11.05 4.29 7.432h5.374l-4.29-7.432 2.083-3.608 4.316 7.478a1.2 1.2 0 0 0 2.08-.002l7.73-13.388a1.2 1.2 0 0 0-1.04-1.802h-4.235z" />
    </svg>
  );
}

export function GitIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l2.83 2.829a2.5 2.5 0 0 1 3.167 3.176l2.723 2.724a2.5 2.5 0 1 1-1.06 1.06l-2.73-2.731a2.5 2.5 0 0 1-2.923-.393L8.03 12.037v4.618a2.5 2.5 0 1 1-1.5 0V10.55a2.5 2.5 0 0 1 .655-4.48L4.357 3.242.454 7.144a1.5 1.5 0 0 0 0 2.126l10.479 10.479a1.5 1.5 0 0 0 2.126 0l10.487-10.488a1.5 1.5 0 0 0 0-2.126z" />
    </svg>
  );
}

export function GitHubIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function VercelIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

export function HtmlIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.5 0h21l-1.9 21.6-8.6 2.4-8.6-2.4zm17.5 8H5v2.8h4.6V20h3.2v-9.2H19z" />
    </svg>
  );
}

export function CssIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1.5 0h21l-1.9 21.6-8.6 2.4-8.6-2.4L1.5 0zm16.9 4.7H5.6l.4 4.5h9.4l-.4 4.5-3 .9-3-.9-.2-2.3H5.8l.4 4.6 5.8 1.6 5.8-1.6 1-11.3z" />
    </svg>
  );
}

export function JavaIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.1 19.3c3.5.2 6.5-.4 8.7-1.4 0 0-1.8 1-5.1 1.4-3.5.3-6.8-.1-8.1-.8 1.1.5 2.7.7 4.5.8zm-1.8-3.1c3.1.2 5.8-.3 7.7-1.2 0 0-1.6.9-4.5 1.2-3.1.3-6-.1-7.2-.7 1 .4 2.4.6 4 .7zm8.1-5.8c-.8.8-1.7 1.4-2.8 1.9 2.1-.2 3.8-1.1 4.5-2.2-.4.1-1.1.2-1.7.3zm-6-2.9c.7 1.1 1.7 2 2.9 2.8 1.2.8 2.5 1.5 3.9 1.9-1.1-.3-2.1-.9-3-1.6-1-1-1.6-2-1.9-3.1-.2-1.2 0-2.4.6-3.4-.9.9-1.3 2.1-1.3 3.4 0 1 .4 2.1 1.2 3.1z" />
    </svg>
  );
}

export function PythonIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.9 0C5.5 0 5.9 2.8 5.9 2.8v2.9h6.1v.9H3.4S0 6.2 0 12.6s3 6.3 3 6.3h1.8v-2.5s-.1-3 3-3h6.1s2.9-.1 2.9-2.9V2.8S17.4 0 11.9 0zm-3.3 1.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zm10 4.8s-3 .1-3 2.9v2.5s.1 3-3 3H6.5s-2.9.1-2.9 2.9v7.7S3.2 24 8.7 24c6.4 0 6-2.8 6-2.8v-2.9h-6.1v-.9h8.6s3.4.4 3.4-6-3-6.3-3-6.3h-1.8v2.5zM15.4 20a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
    </svg>
  );
}

export function getTechIcon(name: string, size = 16) {
  switch (name) {
    case "React":
      return <ReactIcon size={size} />;
    case "TypeScript":
      return <TypeScriptIcon size={size} />;
    case "JavaScript":
      return <JavaScriptIcon size={size} />;
    case "Vite":
      return <ViteIcon size={size} />;
    case "Tailwind CSS":
      return <TailwindIcon size={size} />;
    case "TanStack":
      return <TanStackIcon size={size} />;
    case "Three.js":
      return <ThreeIcon size={size} />;
    case "Framer Motion":
      return <FramerMotionIcon size={size} />;
    case "Zod":
      return <ZodIcon size={size} />;
    case "Vitest":
      return <VitestIcon size={size} />;
    case "Git":
      return <GitIcon size={size} />;
    case "GitHub":
      return <GitHubIcon size={size} />;
    case "Vercel":
      return <VercelIcon size={size} />;
    case "HTML":
      return <HtmlIcon size={size} />;
    case "CSS":
      return <CssIcon size={size} />;
    case "Java":
      return <JavaIcon size={size} />;
    case "Python":
      return <PythonIcon size={size} />;
    default:
      return null;
  }
}

// ============================================================================
// MODERN MINIMALIST / UI ICONS
// ============================================================================

export function ArrowUpRight({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export const ArrowUpRightIcon = ArrowUpRight;
export const GithubIcon = GitHubIcon;
export const LinkedinIcon = LinkedInIcon;

export function MenuIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ModernLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path
        d="M16 8L9.5 24H13.2L14.7 20H17.3L18.8 24H22.5L16 8ZM16 12.2L16.8 17H15.2L16 12.2Z"
        fill="#ffffff"
      />
    </svg>
  );
}

