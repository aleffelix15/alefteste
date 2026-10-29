/**
 * Utilitário central de Analytics (stub extensível para Plausible / Vercel Analytics / Google Analytics)
 *
 * NOTA DE SEGURANÇA E CSP:
 * Ao ativar Plausible ou Vercel Analytics em produção, será necessário atualizar
 * os cabeçalhos Content-Security-Policy no vercel.json de forma estrita e sem wildcards:
 * - script-src: adicionar a URL do script ('self' https://va.vercel-scripts.com ou https://plausible.io)
 * - connect-src: adicionar o endpoint de telemetria ('self' https://vitals.vercel-insights.com ou https://plausible.io)
 */

export type AnalyticsEventName =
  | "cv_download"
  | "cv_view"
  | "email_copy"
  | "project_click";

export interface AnalyticsEventProps {
  [key: string]: string | number | boolean | undefined;
}

// Allowlist estrita de propriedades para prevenir vazamento acidental de PII (dados pessoais)
const ALLOWED_PROP_KEYS = new Set([
  "channel",
  "variant",
  "fileName",
  "projectId",
  "target",
]);

export function trackEvent(name: AnalyticsEventName, properties?: AnalyticsEventProps): void {
  try {
    if (typeof window !== "undefined") {
      // Filtragem por allowlist para sanitização de telemetria
      let sanitizedProps: AnalyticsEventProps | undefined = undefined;
      if (properties) {
        sanitizedProps = {};
        for (const [key, val] of Object.entries(properties)) {
          if (ALLOWED_PROP_KEYS.has(key) && val !== undefined) {
            sanitizedProps[key] = val;
          }
        }
      }

      // 1. Plausible Analytics fallback
      const win = window as unknown as {
        plausible?: (event: string, options?: { props: AnalyticsEventProps }) => void;
        va?: (type: string, name: string, data?: AnalyticsEventProps) => void;
      };

      if (typeof win.plausible === "function") {
        win.plausible(name, sanitizedProps ? { props: sanitizedProps } : undefined);
      }

      // 2. Vercel Analytics fallback
      if (typeof win.va === "function") {
        win.va("event", name, sanitizedProps);
      }

      // 3. Log em desenvolvimento para auditoria
      if (import.meta.env.DEV) {
        console.debug(`[Analytics] ${name}:`, sanitizedProps);
      }
    }
  } catch {
    // Falha silenciosa para nunca interromper a experiência do usuário
  }
}
