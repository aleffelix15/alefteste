import React, { useState } from "react";
import { contactData, links } from "../data";
import { GithubIcon, LinkedinIcon } from "../icons";
import { RollText } from "./RollText";

export function ContactChapter() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "aleffelix15@gmail.com";
  const whatsappUrl = "https://wa.me/5511999999999?text=Ol%C3%A1%20%C3%81lef%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";

  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Por favor, informe seu nome (mínimo 2 caracteres).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Por favor, informe um endereço de e-mail válido.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "A mensagem deve conter pelo menos 10 caracteres.";
    }
    return errors;
  };

  const errors = validate();

  const handleCopyEmail = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) return;

    setFormStatus("loading");

    try {
      // Fallback nativo e tentativa via Formspree se configurado
      const endpoint = "https://formspree.io/f/xbjnbqrg"; // Endpoint ou fallback seguro
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Novo contato via Portfólio: ${formData.name}`,
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
      } else {
        throw new Error("Falha no envio");
      }
    } catch {
      // Fallback para mailto se serviço estiver offline
      setFormStatus("error");
      setErrorMessage("Não foi possível enviar automaticamente. Você pode enviar diretamente para aleffelix15@gmail.com.");
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
        <div className="contact-editorial-grid" data-reveal>
          {/* Coluna Esquerda: Informações & Canais */}
          <div className="contact-left-col">
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
                <span className="line-inner" style={{ "--line-delay": "50ms" } as React.CSSProperties}>
                  {contactData.headline}
                </span>
              </span>
            </h2>

            <p className="contact-lead-text">{contactData.text}</p>

            {/* BOTÃO GRANDE DE E-MAIL COM COPIAR E FEEDBACK */}
            <div className="contact-email-copy-box">
              <div className="email-copy-header mono">
                <span>CANAL DIRETO &amp; E-MAIL PROFISSIONAL</span>
                <span className="email-copy-badge">{copied ? "COPIADO! ✓" : "CLIQUE P/ COPIAR"}</span>
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
                  title="Abrir no seu cliente de e-mail"
                >
                  <RollText text="Abrir no cliente ↗" />
                </a>
              </div>
            </div>

            {/* Links Auxiliares: WhatsApp, Baixar CV, GitHub, LinkedIn */}
            <div className="contact-fast-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="WHATSAPP ↗"
              >
                <span aria-hidden="true">💬</span>
                <RollText text="WhatsApp direto" />
                <span aria-hidden="true" className="arrow-inline">→</span>
              </a>

              <a
                href="/curriculo-alef-felix.pdf"
                download="Curriculo-Alef-Felix.pdf"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="BAIXAR CV"
              >
                <span aria-hidden="true">📄</span>
                <RollText text="Baixar Currículo (PDF)" />
                <span aria-hidden="true" className="arrow-inline">↓</span>
              </a>

              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="GITHUB ↗"
              >
                <GithubIcon size={16} />
                <RollText text="GitHub" />
                <span aria-hidden="true" className="arrow-inline">→</span>
              </a>

              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="LINKEDIN ↗"
              >
                <LinkedinIcon size={16} />
                <RollText text="LinkedIn" />
                <span aria-hidden="true" className="arrow-inline">→</span>
              </a>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato com Validação Inline */}
          <div className="contact-form-card" data-tilt-card>
            <div className="form-card-header mono">
              <span>FORMULÁRIO DE CONTATO</span>
              <span className="form-status-dot" aria-hidden="true" />
            </div>

            {formStatus === "success" ? (
              <div className="form-success-state" role="alert">
                <span className="success-icon" aria-hidden="true">✓</span>
                <h3 className="success-title">Mensagem enviada com sucesso!</h3>
                <p className="success-desc">
                  Obrigado pelo contato. Retornarei sua mensagem no e-mail informado o mais breve possível.
                </p>
                <button
                  type="button"
                  className="btn-form-reset mono"
                  onClick={() => setFormStatus("idle")}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                {/* Campo Nome */}
                <div className="form-field-group">
                  <label htmlFor="contact-name" className="form-label mono">
                    SEU NOME <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Como posso te chamar?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className={`form-input ${touched.name && errors.name ? "has-error" : ""}`}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <span id="name-error" className="form-error-msg mono" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Campo E-mail */}
                <div className="form-field-group">
                  <label htmlFor="contact-email" className="form-label mono">
                    SEU E-MAIL <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="exemplo@dominio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className={`form-input ${touched.email && errors.email ? "has-error" : ""}`}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                  {touched.email && errors.email && (
                    <span id="email-error" className="form-error-msg mono" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Campo Mensagem */}
                <div className="form-field-group">
                  <label htmlFor="contact-message" className="form-label mono">
                    MENSAGEM OU PROPOSTA <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Descreva seu projeto, oportunidade ou ideia..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onBlur={() => setTouched({ ...touched, message: true })}
                    className={`form-input form-textarea ${
                      touched.message && errors.message ? "has-error" : ""
                    }`}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <span id="message-error" className="form-error-msg mono" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {formStatus === "error" && (
                  <div className="form-error-banner" role="alert">
                    <p>{errorMessage}</p>
                    <a
                      href={`mailto:${emailAddress}?subject=Contato%20via%20Portf%C3%B3lio&body=${encodeURIComponent(
                        formData.message
                      )}`}
                      className="form-mailto-fallback mono"
                    >
                      Abrir no cliente de e-mail ↗
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="btn-form-submit btn-sheen mono"
                  data-cursor-label={formStatus === "loading" ? "ENVIANDO" : "ENVIAR"}
                >
                  {formStatus === "loading" ? (
                    <span>ENVIANDO MENSAGEM...</span>
                  ) : (
                    <>
                      <span>ENVIAR MENSAGEM</span>
                      <span aria-hidden="true" className="arrow-inline">→</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="project-plate-spotlight" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
