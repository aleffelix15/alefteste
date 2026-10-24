import { useState } from "react";
import { cv } from "../data";
import { trackEvent } from "../analytics";
import { RollText } from "./RollText";

interface CvButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "header" | "footer" | "contact";
  showMeta?: boolean;
  showViewLink?: boolean;
  label?: string;
  className?: string;
}

export function CvButton({
  variant = "secondary",
  showMeta = false,
  showViewLink = false,
  label = "Baixar CV",
  className = "",
}: CvButtonProps) {
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle");

  if (!cv.available) {
    return null;
  }

  const handleDownloadClick = () => {
    trackEvent("cv_download", {
      source: variant,
      fileName: cv.fileName,
      url: cv.url,
    });

    setDownloadState("downloading");

    setTimeout(() => {
      setDownloadState("downloaded");
      setTimeout(() => {
        setDownloadState("idle");
      }, 2500);
    }, 1400);
  };

  const handleViewClick = () => {
    trackEvent("cv_view", {
      source: variant,
      fileName: cv.fileName,
      url: cv.url,
    });
  };

  const accessibleLabel = `${label} — Currículo de Álef Felix Teixeira em PDF (${cv.sizeLabel}, atualizado em ${cv.updatedAt})`;

  // Variante Footer: link leve para listagem do rodapé
  if (variant === "footer") {
    return (
      <div className={`cv-footer-wrap ${className}`}>
        <a
          href={cv.url}
          download={cv.fileName}
          className="footer-nav-link cv-link-footer"
          onClick={handleDownloadClick}
        >
          <span>Currículo (PDF)</span>
          <span className="cv-badge-tiny mono" aria-hidden="true">{cv.sizeLabel.split(" ")[0]}</span>
        </a>
      </div>
    );
  }

  // Variante Contact: integrado na grade de canais secundários
  if (variant === "contact") {
    return (
      <div className={`contact-cv-block ${className}`}>
        <a
          href={cv.url}
          download={cv.fileName}
          className={`contact-action-btn btn-cv-contact ${
            downloadState === "downloaded" ? "is-downloaded" : ""
          } ${downloadState === "downloading" ? "is-downloading" : ""}`}
          aria-label={accessibleLabel}
          data-magnetic
          data-cursor-label="CURRÍCULO ↓"
          onClick={handleDownloadClick}
        >
          {downloadState === "downloading" ? (
            <>
              <svg
                className="cv-spinner-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
              <span>Baixando…</span>
            </>
          ) : downloadState === "downloaded" ? (
            <>
              <svg
                className="cv-check-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Baixado ✓</span>
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="btn-cv-download-icon"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" className="cv-icon-arrow" />
                <line x1="12" y1="15" x2="12" y2="3" className="cv-icon-stem" />
              </svg>
              <RollText text={label} />
              <span className="btn-arrow" aria-hidden="true">↓</span>
            </>
          )}

          <span className="sr-only" aria-live="polite">
            {downloadState === "downloading"
              ? "Iniciando download do currículo..."
              : downloadState === "downloaded"
              ? "Download do currículo concluído com sucesso."
              : ""}
          </span>
        </a>

        {(showMeta || showViewLink) && (
          <div className="contact-cv-submeta mono" aria-label="Metadados do currículo">
            {showMeta && <span>{cv.sizeLabel} · {cv.updatedAt}</span>}
            {showMeta && showViewLink && <span className="submeta-sep" aria-hidden="true">·</span>}
            {showViewLink && (
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cv-view-link"
                title="Visualizar currículo em nova aba do navegador"
                aria-label="Visualizar currículo de Álef Felix Teixeira em nova aba"
                onClick={handleViewClick}
              >
                Visualizar ↗
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`cv-button-container cv-variant-${variant} ${className}`}>
      <div className="cv-action-row">
        <a
          href={cv.url}
          download={cv.fileName}
          className={`btn-cv-action btn-cv-${variant} ${
            downloadState === "downloaded" ? "is-downloaded" : ""
          } ${downloadState === "downloading" ? "is-downloading" : ""}`}
          aria-label={accessibleLabel}
          data-magnetic={variant !== "header"}
          data-cursor-label="CURRÍCULO ↓"
          onClick={handleDownloadClick}
        >
          {downloadState === "downloading" ? (
            <>
              <svg
                className="cv-spinner-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
              <span>Baixando…</span>
            </>
          ) : downloadState === "downloaded" ? (
            <>
              <svg
                className="cv-check-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Baixado ✓</span>
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="btn-cv-download-icon"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" className="cv-icon-arrow" />
                <line x1="12" y1="15" x2="12" y2="3" className="cv-icon-stem" />
              </svg>
              <RollText text={label} />
            </>
          )}

          {/* Feedback para leitores de tela */}
          <span className="sr-only" aria-live="polite">
            {downloadState === "downloading"
              ? "Iniciando download do currículo..."
              : downloadState === "downloaded"
              ? "Download do currículo concluído com sucesso."
              : ""}
          </span>
        </a>

        {/* Botão de Visualização em Nova Aba */}
        {showViewLink && (
          <a
            href={cv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cv-view-inline mono"
            title="Visualizar currículo em nova aba do navegador"
            aria-label="Visualizar currículo de Álef Felix Teixeira em nova aba"
            data-magnetic
            data-cursor-label="VER ↗"
            onClick={handleViewClick}
          >
            <span>Visualizar</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {/* Metadados Técnicos de Auditoria */}
      {showMeta && (
        <div className="cv-meta-caption mono" aria-hidden="true">
          <span className="cv-meta-pill">{cv.sizeLabel}</span>
          <span className="cv-meta-dot">·</span>
          <span>Atualizado em {cv.updatedAt}</span>
        </div>
      )}
    </div>
  );
}
