interface IconProps {
  size?: number;
  className?: string;
}

// ============================================================================
// FULL-COLOR OFFICIAL BRAND EMBLEMS (FOR THE TECHNOLOGIES SHOWCASE GRID)
// ============================================================================

function HtmlColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <path d="M10 6H54L50 51L32 58L14 51L10 6Z" fill="#E44D26" />
      <path d="M32 10V54L46.5 48.3L49.8 10H32Z" fill="#F16529" />
      <path
        d="M19.5 18H44.5L43.5 24H26L26.6 30.5H42.9L41.4 45.5L32 48.5L22.6 45.5L22 38H28L28.4 41.8L32 43L35.6 41.8L36.2 36H20.8L19.5 18Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function CssColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <path d="M10 6H54L50 51L32 58L14 51L10 6Z" fill="#1572B6" />
      <path d="M32 10V54L46.5 48.3L49.8 10H32Z" fill="#33A9DC" />
      <path
        d="M19.5 18H44.5L43.4 30.5H27.5L28 36H42.8L41.4 45.5L32 48.5L22.6 45.5L22 38H28L28.4 41.8L32 43L35.8 41.8L36.3 36H21.2L20.4 24H37.8L38.3 18H19.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function JsColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <rect x="8" y="8" width="48" height="48" rx="6" fill="#F7DF1E" />
      <path
        d="M29.8 45.2C29.8 49.4 27.3 51.4 23.4 51.4C20.1 51.4 18.1 49.7 17.1 47.7L20.6 45.6C21.3 46.9 22.1 47.8 23.5 47.8C25 47.8 25.9 47.1 25.9 44.9V31.5H29.8V45.2ZM43.5 51.4C39.2 51.4 36.5 49.3 35.2 46.6L38.7 44.6C39.6 46.3 41 47.7 43.4 47.7C45.4 47.7 46.7 46.7 46.7 45.3C46.7 43.6 45.3 43 42.9 42L41.6 41.4C37.8 39.8 35.9 37.8 35.9 34.4C35.9 30.9 38.6 28.2 42.9 28.2C46 28.2 48.2 29.3 49.8 32L46.4 34.2C45.6 32.8 44.5 32 42.9 32C41.2 32 40.1 33 40.1 34.3C40.1 35.9 41.2 36.5 43.7 37.6L45 38.2C49.3 40 51.2 42 51.2 45.5C51.2 49.5 48.1 51.4 43.5 51.4Z"
        fill="#111113"
      />
    </svg>
  );
}

function TsColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <rect x="8" y="8" width="48" height="48" rx="6" fill="#3178C6" />
      <path
        d="M25.5 34.2V50H21.2V34.2H15.4V30.6H31.3V34.2H25.5ZM43.2 50.4C39.3 50.4 36.4 48.7 35 46.2L38.3 44.2C39.3 45.9 40.9 46.9 43.2 46.9C45.3 46.9 46.7 45.9 46.7 44.5C46.7 42.9 45.3 42.3 42.8 41.3L41.4 40.7C37.7 39.2 35.8 37.3 35.8 34.1C35.8 30.7 38.5 28.2 42.8 28.2C45.9 28.2 48.3 29.3 49.8 31.8L46.5 33.9C45.7 32.5 44.4 31.7 42.8 31.7C41 31.7 39.9 32.7 39.9 34C39.9 35.5 41 36.1 43.5 37.1L44.9 37.7C49.1 39.4 51 41.4 51 44.8C51 48.6 47.9 50.4 43.2 50.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function ReactColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="-14 -14 28 28" fill="none" aria-hidden="true" className="tech-emblem-svg emblem-spin-hover">
      <circle cx="0" cy="0" r="2.4" fill="#00D8FF" />
      <g stroke="#00D8FF" strokeWidth="1.35">
        <ellipse rx="11.5" ry="4.4" />
        <ellipse rx="11.5" ry="4.4" transform="rotate(60)" />
        <ellipse rx="11.5" ry="4.4" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function ViteColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="viteBgGrad" x1="8" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="viteBoltGrad" x1="28" y1="8" x2="38" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEA83" />
          <stop offset="8.3%" stopColor="#FFDD35" />
          <stop offset="100%" stopColor="#FFA800" />
        </linearGradient>
      </defs>
      <path d="M56.5 12.2L33.4 56.2C32.6 57.7 30.4 57.7 29.6 56.2L6.5 12.2C5.6 10.5 7.1 8.5 9 8.9L31.6 13.4C31.9 13.5 32.2 13.5 32.5 13.4L54 8.9C55.9 8.5 57.4 10.5 56.5 12.2Z" fill="url(#viteBgGrad)" />
      <path d="M42.8 6.5L25.6 9.9C25 10 24.6 10.5 24.5 11.1L22.5 34.4C22.4 35.4 23.4 36.1 24.3 35.8L29.5 34.2C30.3 33.9 31.1 34.6 31 35.5L29.5 47.4C29.4 48.4 30.6 49 31.3 48.2L45.8 25.4C46.4 24.5 45.6 23.3 44.5 23.6L38.9 25C38 25.2 37.2 24.4 37.5 23.5L44.2 8.1C44.6 7.2 43.8 6.3 42.8 6.5Z" fill="url(#viteBoltGrad)" />
    </svg>
  );
}

function TailwindColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="twGrad" x1="8" y1="16" x2="56" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <path
        d="M32 16C24.5 16 19.8 19.7 18 27.2C20.8 23.5 24.1 22.1 27.8 23C30 23.5 31.5 25.1 33.2 26.8C36 29.6 39.2 32.8 46 32.8C53.5 32.8 58.2 29.1 60 21.6C57.2 25.3 53.9 26.7 50.2 25.8C48 25.3 46.5 23.7 44.8 22C42 19.2 38.8 16 32 16ZM18 32.8C10.5 32.8 5.8 36.5 4 44C6.8 40.3 10.1 38.9 13.8 39.8C16 40.3 17.5 41.9 19.2 43.6C22 46.4 25.2 49.6 32 49.6C39.5 49.6 44.2 45.9 46 38.4C43.2 42.1 39.9 43.5 36.2 42.6C34 42.1 32.5 40.5 30.8 38.8C28 36 24.8 32.8 18 32.8Z"
        fill="url(#twGrad)"
      />
    </svg>
  );
}

function TanStackColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg emblem-spin-hover">
      {/* Outer Teal Petals */}
      <g fill="#10B981">
        <circle cx="32" cy="12" r="9.5" />
        <circle cx="49" cy="22" r="9.5" />
        <circle cx="49" cy="42" r="9.5" />
        <circle cx="32" cy="52" r="9.5" />
        <circle cx="15" cy="42" r="9.5" />
        <circle cx="15" cy="22" r="9.5" />
      </g>
      {/* Inner Coral / Red-Orange Petals */}
      <g fill="#FF4154">
        <circle cx="32" cy="19" r="7.5" />
        <circle cx="43" cy="25.5" r="7.5" />
        <circle cx="43" cy="38.5" r="7.5" />
        <circle cx="32" cy="45" r="7.5" />
        <circle cx="21" cy="38.5" r="7.5" />
        <circle cx="21" cy="25.5" r="7.5" />
      </g>
      {/* Warm Highlights */}
      <circle cx="32" cy="32" r="9" fill="#FB923C" />
      <circle cx="32" cy="32" r="4.8" fill="#18181B" />
    </svg>
  );
}

function ZodColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="zodHexGrad" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <polygon points="32,6 55,19 55,45 32,58 9,45 9,19" fill="url(#zodHexGrad)" />
      <polygon points="32,6 55,19 32,32 9,19" fill="#A78BFA" fillOpacity="0.24" />
      <path
        d="M23 22H41V26.4L29.2 38.2H41.4V43H22.6V38.6L34.4 26.8H23V22Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function VitestColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      {/* Neon Green V */}
      <path
        d="M10 18L32 56L54 18H44.5L32 40L19.5 18H10Z"
        fill="#4ADE80"
      />
      <path
        d="M19.5 18L32 40V56L10 18H19.5Z"
        fill="#22C55E"
      />
      {/* Golden Lightning Bolt */}
      <path
        d="M36 6L23 25H32.5L28 41L43 20H33.5L36 6Z"
        fill="#FACC15"
      />
    </svg>
  );
}

function ThreeColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <g stroke="#F4F4F5" strokeWidth="1.6" strokeLinejoin="round">
        <polygon points="12,10 54,22 24,56" />
        <polygon points="33,16 39,39 18,33" />
        <line x1="12" y1="10" x2="33" y2="16" />
        <line x1="54" y1="22" x2="39" y2="39" />
        <line x1="24" y1="56" x2="18" y2="33" />
        <polygon points="22.5,13 36,27.5 15,21.5" />
        <polygon points="43.5,19 46.5,30.5 36,27.5" />
        <polygon points="21,44.5 31.5,47.5 28.5,36" />
      </g>
    </svg>
  );
}

function FramerMotionColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="fmWaveGrad" x1="8" y1="48" x2="56" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <path
        d="M11 45L23 23L33 41L45 19L53 45"
        stroke="url(#fmWaveGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="19" r="4" fill="#38BDF8" />
      <circle cx="53" cy="45" r="4" fill="#3B82F6" />
    </svg>
  );
}

function EslintColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <polygon
        points="32,6 56,19.8 56,44.2 32,58 8,44.2 8,19.8"
        stroke="#4B32C3"
        strokeWidth="6.5"
        strokeLinejoin="round"
      />
      <polygon
        points="32,19 44,26 44,38 32,45 20,38 20,26"
        fill="#8080F2"
      />
    </svg>
  );
}

function GitColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <rect
        x="32"
        y="6"
        width="36.8"
        height="36.8"
        rx="5"
        transform="rotate(45 32 6)"
        fill="#F05032"
      />
      <path
        d="M25 19L39 33M31 25V41"
        stroke="#18181B"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <circle cx="31" cy="25" r="3.6" fill="#18181B" />
      <circle cx="39" cy="33" r="3.6" fill="#18181B" />
      <circle cx="31" cy="41" r="3.6" fill="#18181B" />
    </svg>
  );
}

function GitHubColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <circle cx="32" cy="32" r="24" fill="#E2E8F0" />
      <path
        d="M32 12C20.95 12 12 20.95 12 32C12 40.85 17.72 48.32 25.68 50.98C26.68 51.15 27.05 50.55 27.05 50.02C27.05 49.55 27.02 47.98 27.02 46.3C21.99 47.22 20.69 44.18 20.29 43.95C20.06 43.38 19.09 41.6 18.24 41.12C17.54 40.75 16.54 39.82 18.21 39.8C19.79 39.78 20.91 41.25 21.29 41.85C23.09 44.88 25.96 44.02 27.11 43.5C27.29 42.2 27.81 41.32 28.39 40.82C23.94 40.32 19.29 38.6 19.29 30.95C19.29 28.78 20.06 26.98 21.34 25.58C21.14 25.08 20.44 23.02 21.54 20.28C21.54 20.28 23.21 19.75 27.04 22.32C28.64 21.88 30.34 21.65 32.04 21.65C33.74 21.65 35.44 21.88 37.04 22.32C40.86 19.72 42.54 20.28 42.54 20.28C43.64 23.02 42.94 25.08 42.74 25.58C44.01 26.98 44.79 28.75 44.79 30.95C44.79 38.62 40.11 40.32 35.66 40.82C36.39 41.45 37.01 42.65 37.01 44.52C37.01 47.2 36.99 49.35 36.99 50.02C36.99 50.55 37.36 51.18 38.36 50.98C46.28 48.32 52 40.82 52 32C52 20.95 43.05 12 32 12Z"
        fill="#090D16"
      />
    </svg>
  );
}

function NextjsColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="nextDiag" x1="36" y1="36" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextRight" x1="42" y1="20" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="#0B0F17" stroke="#94A3B8" strokeWidth="1.6" />
      <path d="M23 44V20H26.6L46.5 49.2C45.3 50.2 43.9 51 42.4 51.6L26.5 27.6V44H23Z" fill="url(#nextDiag)" />
      <rect x="40" y="20" width="3.6" height="24" fill="url(#nextRight)" />
    </svg>
  );
}


function LucideColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <path
        d="M32 10C32 22.15 22.15 32 10 32C22.15 32 32 41.85 32 54C32 41.85 41.85 32 54 32C41.85 32 32 22.15 32 10Z"
        stroke="#FB7185"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="rgba(251, 113, 133, 0.16)"
      />
      <circle cx="32" cy="32" r="4" fill="#FDA4AF" />
    </svg>
  );
}






function PostgresColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <path
        d="M32 10C18 10 11 19 13 33C14.5 43 22 49 28 49V55C28 57 35 57 36 53V45C45 45 52 37 51 25C50 14 43 10 32 10Z"
        fill="#336791"
        stroke="#E2E8F0"
        strokeWidth="2.2"
      />
      <path
        d="M24 22C20 24 19 32 23 36M40 22C44 24 45 32 41 36M32 24V44"
        stroke="#E2E8F0"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="27" cy="26" r="2" fill="#FFFFFF" />
      <circle cx="37" cy="26" r="2" fill="#FFFFFF" />
    </svg>
  );
}

function SupabaseColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="supaGrad1" x1="14" y1="10" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3ECF8E" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="supaGrad2" x1="28" y1="26" x2="50" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3ECF8E" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <path
        d="M35.5 8.5C33.9 6.5 30.8 7.6 30.8 10.2V34H50.2C52.9 34 54.4 30.9 52.7 28.8L35.5 8.5Z"
        fill="url(#supaGrad2)"
      />
      <path
        d="M28.5 55.5C30.1 57.5 33.2 56.4 33.2 53.8V30H13.8C11.1 30 9.6 33.1 11.3 35.2L28.5 55.5Z"
        fill="url(#supaGrad1)"
      />
    </svg>
  );
}





function PrettierColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <g strokeLinecap="round" strokeWidth="4">
        <line x1="14" y1="14" x2="36" y2="14" stroke="#38BDF8" />
        <line x1="42" y1="14" x2="50" y2="14" stroke="#64748B" />
        <line x1="14" y1="21" x2="26" y2="21" stroke="#F43F5E" />
        <line x1="32" y1="21" x2="48" y2="21" stroke="#A855F7" />
        <line x1="14" y1="28" x2="42" y2="28" stroke="#FACC15" />
        <line x1="14" y1="35" x2="34" y2="35" stroke="#10B981" />
        <line x1="14" y1="42" x2="24" y2="42" stroke="#F97316" />
        <line x1="30" y1="42" x2="42" y2="42" stroke="#38BDF8" />
        <line x1="14" y1="49" x2="28" y2="49" stroke="#EC4899" />
      </g>
    </svg>
  );
}

function PythonColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <path
        d="M31.6 10C21.2 10 21.8 14.5 21.8 14.5V19.2H31.8V20.8H17.8C17.8 20.8 11 20 11 30.8C11 41.6 16.9 41.2 16.9 41.2H20.4V36.2C20.4 36.2 20.2 30.3 26.2 30.3H36.4C36.4 30.3 41.8 30.4 41.8 25.1V15.8C41.8 15.8 42.6 10 31.6 10ZM26.2 13.2C27.3 13.2 28.2 14.1 28.2 15.2C28.2 16.3 27.3 17.2 26.2 17.2C25.1 17.2 24.2 16.3 24.2 15.2C24.2 14.1 25.1 13.2 26.2 13.2Z"
        fill="#3776AB"
      />
      <path
        d="M32.4 54C42.8 54 42.2 49.5 42.2 49.5V44.8H32.2V43.2H46.2C46.2 43.2 53 44 53 33.2C53 22.4 47.1 22.8 47.1 22.8H43.6V27.8C43.6 27.8 43.8 33.7 37.8 33.7H27.6C27.6 33.7 22.2 33.6 22.2 38.9V48.2C22.2 48.2 21.4 54 32.4 54ZM37.8 50.8C36.7 50.8 35.8 49.9 35.8 48.8C35.8 47.7 36.7 46.8 37.8 46.8C38.9 46.8 39.8 47.7 39.8 48.8C39.8 49.9 38.9 50.8 37.8 50.8Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

function VercelColorEmblem({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="tech-emblem-svg">
      <defs>
        <linearGradient id="vercelLeft" x1="16" y1="12" x2="38" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="vercelRight" x1="32" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <polygon points="32,11 56,53 8,53" fill="url(#vercelLeft)" />
      <polygon points="32,11 56,53 42,53" fill="url(#vercelRight)" />
    </svg>
  );
}

export function getColorTechEmblem(name: string, size = 56) {
  switch (name) {
    case "HTML":
      return <HtmlColorEmblem size={size} />;
    case "CSS":
      return <CssColorEmblem size={size} />;
    case "JavaScript":
      return <JsColorEmblem size={size} />;
    case "TypeScript":
      return <TsColorEmblem size={size} />;
    case "React":
      return <ReactColorEmblem size={size} />;
    case "Next.js":
      return <NextjsColorEmblem size={size} />;
    case "Vite":
      return <ViteColorEmblem size={size} />;
    case "Tailwind CSS":
      return <TailwindColorEmblem size={size} />;
    case "Lucide React":
      return <LucideColorEmblem size={size} />;
    case "Python":
      return <PythonColorEmblem size={size} />;
    case "PostgreSQL":
      return <PostgresColorEmblem size={size} />;
    case "Supabase":
      return <SupabaseColorEmblem size={size} />;
    case "TanStack":
    case "TanStack Query":
      return <TanStackColorEmblem size={size} />;
    case "Zod":
      return <ZodColorEmblem size={size} />;
    case "Vitest":
      return <VitestColorEmblem size={size} />;
    case "Prettier":
      return <PrettierColorEmblem size={size} />;
    case "Three.js":
      return <ThreeColorEmblem size={size} />;
    case "Framer Motion":
      return <FramerMotionColorEmblem size={size} />;
    case "ESLint":
      return <EslintColorEmblem size={size} />;
    case "Git":
      return <GitColorEmblem size={size} />;
    case "GitHub":
      return <GitHubColorEmblem size={size} />;
    case "Vercel":
      return <VercelColorEmblem size={size} />;
    default:
      return <ReactColorEmblem size={size} />;
  }
}

// ============================================================================
// MODERN MINIMALIST / UI ICONS
// ============================================================================

export function GithubIcon({ size = 16, className }: IconProps) {
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

export function LinkedinIcon({ size = 16, className }: IconProps) {
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
