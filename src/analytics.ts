/**
 * Utilitário central de Analytics (stub extensível para Plausible / Vercel Analytics / Google Analytics)
 */

export type AnalyticsEventName =
  | "cv_download"
  | "cv_view"
  | "email_copy"
  | "project_click"
  | "theme_toggle";

export interface AnalyticsEventProps {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: AnalyticsEventName, properties?: AnalyticsEventProps): void {
  try {
    if (typeof window !== "undefined") {
      // 1. Plausible Analytics fallback
      const win = window as unknown as {
        plausible?: (event: string, options?: { props: AnalyticsEventProps }) => void;
        va?: (type: string, name: string, data?: AnalyticsEventProps) => void;
      };

      if (typeof win.plausible === "function") {
        win.plausible(name, properties ? { props: properties } : undefined);
      }

      // 2. Vercel Analytics fallback
      if (typeof win.va === "function") {
        win.va("event", name, properties);
      }

      // 3. Log em desenvolvimento para auditoria
      if (import.meta.env.DEV) {
        console.debug(`[Analytics] ${name}:`, properties);
      }
    }
  } catch {
    // Falha silenciosa para nunca interromper a experiência do usuário
  }
}
