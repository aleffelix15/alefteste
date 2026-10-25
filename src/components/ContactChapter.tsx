import React, { useState, useRef } from "react";
import { contactData, links } from "../data";
import { GithubIcon, LinkedinIcon } from "../icons";
import { trackEvent } from "../analytics";
import { RollText } from "./RollText";
import { CvButton } from "./CvButton";

export function ContactChapter() {
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    }
  };

  const cachedCharCenters = useRef<number[]>([]);
  const cachedHeadingLeft = useRef<number>(0);

  const handleHeadingPointerEnter = () => {
    const headingEl = headingRef.current;
    if (!headingEl) return;
    const hRect = headingEl.getBoundingClientRect();
    cachedHeadingLeft.current = hRect.left;
    const chars = headingEl.querySelectorAll<HTMLElement>(".contact-kinetic-char");
    cachedCharCenters.current = Array.from(chars).map((c) => c.offsetLeft + c.offsetWidth / 2);
  };

  // Resposta cinética das letras grandes do CTA principal à aproximação do cursor (zero getBoundingClientRect no move)
  const handleHeadingPointerMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const headingEl = headingRef.current;
    if (!headingEl || cachedCharCenters.current.length === 0) return;

    const mouseRelX = e.clientX - cachedHeadingLeft.current;
    const chars = headingEl.querySelectorAll<HTMLElement>(".contact-kinetic-char");
    chars.forEach((charEl, idx) => {
      const center = cachedCharCenters.current[idx] ?? 0;
      const dist = Math.abs(mouseRelX - center);
      const proximity = Math.max(0, 1 - dist / 180);
      charEl.style.setProperty("--char-prox", proximity.toFixed(3));
    });
  };

  const handleHeadingPointerLeave = () => {
    const headingEl = headingRef.current;
    if (!headingEl) return;
    const chars = headingEl.querySelectorAll<HTMLElement>(".contact-kinetic-char");
    chars.forEach((charEl) => {
      charEl.style.setProperty("--char-prox", "0");
    });
  };

  const headlineChars = contactData.headline.split("");

  return (
    <section
      className="editorial-chapter contact-section"
      id="contato"
      aria-labelledby="contact-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="contact-editorial-layout">
          {/* Marcador de Seção */}
          <div className="section-marker" data-reveal>
            <span className="marker-num mono" data-scramble={contactData.spineNumber}>
              {contactData.spineNumber}
            </span>
            <span className="marker-label mono" data-scramble={contactData.spineLabel}>
              {contactData.spineLabel}
            </span>
            <span className="marker-line" aria-hidden="true" />
          </div>

          <h2
            ref={headingRef}
            id="contact-heading"
            className="contact-serif-heading"
            aria-label={contactData.headline}
            data-reveal
            onPointerEnter={handleHeadingPointerEnter}
            onPointerMove={handleHeadingPointerMove}
            onPointerLeave={handleHeadingPointerLeave}
          >
            <span className="line-mask">
              <span
                className="line-inner contact-kinetic-line"
                style={{ "--line-delay": "50ms" } as React.CSSProperties}
              >
                <span className="sr-only">{contactData.headline}</span>
                {headlineChars.map((ch, idx) => (
                  <span
                    key={idx}
                    className="contact-kinetic-char"
                    aria-hidden="true"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
                <span className="contact-heading-arrow-loop" aria-hidden="true">
                  <span className="diagonal-arrow-track">
                    <span className="diagonal-arrow-glyph">↗</span>
                    <span className="diagonal-arrow-glyph diagonal-arrow-glyph--clone">↗</span>
                  </span>
                </span>
              </span>
            </span>
          </h2>

          <p className="contact-lead-text">{contactData.text}</p>

          {/* Destaque Principal: Cartão de E-mail Profissional */}
          <div className="contact-email-copy-box" data-tilt-card data-tilt-max="3">
            <div className="email-copy-header mono">
              <span>CANAL DIRETO &amp; E-MAIL PROFISSIONAL</span>
              <span className="email-copy-badge">
                {copied ? "COPIADO! ✓" : "CLIQUE P/ COPIAR"}
              </span>
              <span className="sr-only" aria-live="polite" role="status">
                {copied ? "Endereço de e-mail copiado para a área de transferência." : ""}
              </span>
            </div>

            <div className="email-copy-action-row">
              <button
                type="button"
                className={`btn-email-copy mono ${copied ? "is-copied" : ""}`}
                onClick={handleCopyEmail}
                aria-label="Copiar endereço de e-mail para a área de transferência"
                data-cursor-label={copied ? "[ COPIADO! ✓ ]" : "[ COPIAR E-MAIL ❐ ]"}
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
                data-cursor="magnetic"
                title="Abrir no seu cliente de e-mail padrão"
              >
                <RollText text="Abrir no cliente" />
                <span className="diagonal-arrow-inline-box" aria-hidden="true">
                  <span className="diagonal-arrow-glyph">↗</span>
                  <span className="diagonal-arrow-glyph diagonal-arrow-glyph--clone">↗</span>
                </span>
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
              data-cursor="magnetic"
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
              data-cursor="magnetic"
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
              data-cursor="magnetic"
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
