import React, { useState } from "react";
import { contactData, links } from "../data";
import { GithubIcon, LinkedinIcon } from "../icons";
import { trackEvent } from "../analytics";
import { RollText } from "./RollText";
import { CvButton } from "./CvButton";

export function ContactChapter() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "aleffelix81@gmail.com";
  const whatsappUrl =
    "https://wa.me/5562985163672?text=Ol%C3%A1%20%C3%81lef%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";

  const handleCopyEmail = async () => {
    trackEvent("email_copy", { email: emailAddress });
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2800);
      }
    } catch {
      // Fallback gracioso
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    }
  };

  return (
    <section
      className="editorial-chapter contact-section"
      id="contato"
      aria-labelledby="contact-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="contact-editorial-layout" data-reveal>
          {/* Marcador de Seção */}
          <div className="section-marker">
            <span className="marker-num mono" data-scramble={contactData.spineNumber}>
              {contactData.spineNumber}
            </span>
            <span className="marker-label mono" data-scramble={contactData.spineLabel}>
              {contactData.spineLabel}
            </span>
            <span className="marker-line" aria-hidden="true" />
          </div>

          <h2 id="contact-heading" className="contact-serif-heading">
            <span className="line-mask">
              <span
                className="line-inner"
                style={{ "--line-delay": "50ms" } as React.CSSProperties}
              >
                {contactData.headline}
              </span>
            </span>
          </h2>

          <p className="contact-lead-text">{contactData.text}</p>

          {/* Destaque Principal: Cartão de E-mail Profissional */}
          <div className="contact-email-copy-box">
            <div className="email-copy-header mono">
              <span>CANAL DIRETO &amp; E-MAIL PROFISSIONAL</span>
              <span className="email-copy-badge">
                {copied ? "COPIADO! ✓" : "CLIQUE P/ COPIAR"}
              </span>
            </div>

            <div className="email-copy-action-row">
              <button
                type="button"
                className={`btn-email-copy mono ${copied ? "is-copied" : ""}`}
                onClick={handleCopyEmail}
                aria-label="Copiar endereço de e-mail para a área de transferência"
                data-cursor-label={copied ? "COPIADO!" : "COPIAR"}
              >
                <span className="email-address-text">{emailAddress}</span>
                <span className="email-copy-icon" aria-hidden="true">
                  {copied ? "✓" : "❐"}
                </span>
              </button>

              <a
                href={`mailto:${emailAddress}`}
                className="btn-mailto-direct"
                data-magnetic
                data-cursor-label="ENVIAR ↗"
                title="Abrir no seu cliente de e-mail padrão"
              >
                <RollText text="Abrir no cliente ↗" />
              </a>
            </div>
          </div>

          {/* Grade de Canais Secundários: 4 colunas no Desktop, 2x2 no Mobile */}
          <div className="contact-secondary-grid">
            {/* 1. WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
              data-magnetic
              data-cursor-label="WHATSAPP ↗"
            >
              <span className="btn-icon" aria-hidden="true">💬</span>
              <span className="btn-label">
                <RollText text="WhatsApp direto" />
              </span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>

            {/* 2. Currículo (PDF) */}
            <CvButton
              variant="contact"
              label="Currículo (PDF)"
              showMeta
              showViewLink
            />

            {/* 3. GitHub */}
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
              data-magnetic
              data-cursor-label="GITHUB ↗"
            >
              <GithubIcon size={16} />
              <span className="btn-label">
                <RollText text="GitHub" />
              </span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>

            {/* 4. LinkedIn */}
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
              data-magnetic
              data-cursor-label="LINKEDIN ↗"
            >
              <LinkedinIcon size={16} />
              <span className="btn-label">
                <RollText text="LinkedIn" />
              </span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
