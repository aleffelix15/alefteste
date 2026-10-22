import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  links,
  projects,
  techGroups,
  processSteps,
  heroData,
  aboutData,
  footerData,
  type Project,
} from "./data";
import { getTechIcon } from "./icons";

// ============================================================================
// 1. HEADER FINO
// ============================================================================
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="Álef Felix - Início">
          <span className="brand-icon">A</span>
          <span className="brand-name">Álef Felix</span>
        </a>

        <nav className="nav-desktop" aria-label="Navegação principal">
          <a href="#projetos" className="nav-item">01 / Projetos</a>
          <a href="#sobre" className="nav-item">02 / Sobre</a>
          <a href="#tecnologias" className="nav-item">03 / Tecnologias</a>
          <a href="#processo" className="nav-item">04 / Processo</a>
          <a href="#contato" className="nav-item">05 / Contato</a>
        </nav>

        <div className="header-right">
          <span className="header-status-pill">Disponível para projetos</span>
          <button
            type="button"
            className="burger-btn"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav-drawer" aria-label="Navegação mobile">
          <a href="#projetos" className="mobile-nav-item" onClick={() => setOpen(false)}>
            01 / Projetos
          </a>
          <a href="#sobre" className="mobile-nav-item" onClick={() => setOpen(false)}>
            02 / Sobre
          </a>
          <a href="#tecnologias" className="mobile-nav-item" onClick={() => setOpen(false)}>
            03 / Tecnologias
          </a>
          <a href="#processo" className="mobile-nav-item" onClick={() => setOpen(false)}>
            04 / Processo
          </a>
          <a href="#contato" className="mobile-nav-item" onClick={() => setOpen(false)}>
            05 / Contato
          </a>
        </nav>
      )}
    </header>
  );
}

// ============================================================================
// 2. HERO EDITORIAL
// ============================================================================
export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero-label">{heroData.label}</div>

        <h1 className="hero-title">
          <span className="hero-name-ink">{heroData.firstName}</span>
          <span className="hero-name-acc">{heroData.lastName}</span>
        </h1>

        <div className="hero-bottom-row">
          <div className="hero-content-col">
            <p className="hero-paragraph">{heroData.description}</p>
            <div className="hero-actions">
              <a href="#projetos" className="btn-pill-primary">
                {heroData.ctaProjects}
              </a>
              <a href="#contato" className="btn-pill-secondary">
                {heroData.ctaContact}
              </a>
            </div>
          </div>

          <div className="hero-meta-col">
            <span className="hero-meta-title">Áreas de atuação</span>
            {heroData.areas.map((area) => (
              <span key={area} className="hero-meta-item">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. PROJETOS (UMA LINHA INTEIRA POR PROJETO)
// ============================================================================
export function Projects() {
  return (
    <>
      <hr className="section-sep" />
      <section id="projetos" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-num-label">01 — Projetos</span>
            <span className="section-desc-note">Código aberto & demonstrações reais</span>
          </div>

          <div className="projects-list">
            {projects.map((p) => (
              <article key={p.name} className="project-row">
                <div className="project-info">
                  <div className="project-meta-top">
                    <span className="project-num">{p.number}</span>
                    <span
                      className={
                        p.status === "Publicado"
                          ? "status-pill pub"
                          : "status-pill demo"
                      }
                    >
                      {p.status}
                    </span>
                  </div>

                  <h2 className="project-title">{p.name}</h2>
                  <div className="project-kind">{p.kind}</div>
                  <p className="project-summary">{p.summary}</p>

                  <ul className="project-stack-mono" aria-label="Stack do projeto">
                    {p.stack.map((item) => (
                      <li key={item} className="stack-mono-tag">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="project-buttons">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-primary"
                    >
                      Visitar projeto ↗
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill-secondary"
                    >
                      Ver código
                    </a>
                  </div>

                  <details className="project-details-box">
                    <summary>Sobre o projeto (código & limitações)</summary>
                    <div className="project-details-content">
                      <div>
                        <div className="details-subtitle">Proposta</div>
                        <p style={{ color: "var(--mut)", fontSize: "13.5px" }}>
                          {p.proposal}
                        </p>
                      </div>

                      <div>
                        <div className="details-subtitle">O que o código comprova</div>
                        <ul className="details-list">
                          {p.does.map((item, idx) => (
                            <li key={idx} className="details-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="details-subtitle">Limitações reais</div>
                        <ul className="details-list">
                          {p.limits.map((item, idx) => (
                            <li key={idx} className="details-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>

                <div className="project-visual">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`Captura real de ${p.name}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-visual-empty">
                      <span className="empty-title">Captura real de {p.name} pendente</span>
                      <span className="empty-note">
                        Deploy em https://verso-sable.vercel.app/ retornou HTTP 404 em 21/10/2026.
                        <br />
                        Espaço reservado sem imagens fictícias.
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// 4. SOBRE MIM
// ============================================================================
export function About() {
  return (
    <>
      <hr className="section-sep" />
      <section id="sobre" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-num-label">02 — Sobre</span>
            <span className="section-desc-note">Trajetória e foco técnico</span>
          </div>

          <div className="about-grid">
            <div className="about-text-col">
              <p className="about-p">{aboutData.paragraph1}</p>
              <p className="about-p secondary">{aboutData.paragraph2}</p>
              <div className="about-action">
                <a href="#processo" className="btn-pill-secondary">
                  {aboutData.cta}
                </a>
              </div>
            </div>

            <div className="about-visual-col">
              <div className="about-img-box">
                <img
                  src="/images/about-setup.webp"
                  alt="Espaço de trabalho de desenvolvimento web com iluminação focada"
                  className="about-img"
                  loading="lazy"
                />
              </div>
              <span className="about-caption">Ambiente de desenvolvimento e estudo.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// 5. TECNOLOGIAS (DOIS GRUPOS)
// ============================================================================
export function Technologies() {
  return (
    <>
      <hr className="section-sep" />
      <section id="tecnologias" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-num-label">03 — Tecnologias</span>
            <span className="section-desc-note">Ferramentas comprovadas e em estudo</span>
          </div>

          <div className="tech-groups-wrap">
            <div>
              <div className="tech-group-title">
                <span>Nos meus projetos</span>
                <span className="tech-group-badge">Comprovadas no código</span>
              </div>
              <div className="tech-grid-autofill">
                {techGroups.projects.map((t) => (
                  <div key={t} className="tech-item-card">
                    <span className="tech-icon-svg">{getTechIcon(t)}</span>
                    <span className="tech-label">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="tech-group-title">
                <span>Também estudo e uso</span>
                <span className="tech-group-badge">Informado por Álef</span>
              </div>
              <div className="tech-grid-autofill">
                {techGroups.study.map((t) => (
                  <div key={t} className="tech-item-card">
                    <span className="tech-icon-svg">{getTechIcon(t)}</span>
                    <span className="tech-label">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// 6. COMO EU TRABALHO (5 PASSOS EM LINHA)
// ============================================================================
export function Process() {
  return (
    <>
      <hr className="section-sep" />
      <section id="processo" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-num-label">04 — Como eu trabalho</span>
            <span className="section-desc-note">Processo honesto e direto</span>
          </div>

          <div className="process-grid-5">
            {processSteps.map((step) => (
              <div key={step.number} className="process-col">
                <span className="process-step-num">{step.number}</span>
                <h3 className="process-step-name">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// 7. CONTATO
// ============================================================================
export function Contact() {
  return (
    <>
      <hr className="section-sep" />
      <section id="contato" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-num-label">05 — Contato</span>
            <span className="section-desc-note">Canais públicos</span>
          </div>

          <div className="contact-layout">
            <div className="contact-text-block">
              <h2 className="contact-big-title">Vamos conversar?</h2>
              <p className="contact-desc">
                Se você tem um projeto em mente, uma oportunidade ou quer trocar ideias sobre desenvolvimento front-end, entre em contato.
              </p>
              <div>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary"
                >
                  Entrar em contato ↗
                </a>
              </div>
            </div>

            <div className="contact-links-big">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-big-link"
              >
                <span className="link-text">GitHub ↗</span>
                <span className="link-handle">github.com/aleffelix15</span>
              </a>

              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-big-link"
              >
                <span className="link-text">LinkedIn ↗</span>
                <span className="link-handle">Álef Felix Teixeira</span>
              </a>

              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  className="contact-big-link"
                >
                  <span className="link-text">E-mail ↗</span>
                  <span className="link-handle">{links.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// 8. FOOTER MINIMALISTA
// ============================================================================
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-meta">
          <span className="footer-author">© {new Date().getFullYear()} {footerData.author}</span>
          <span className="footer-tagline">{footerData.tagline}</span>
        </div>

        <button
          type="button"
          className="btn-back-top"
          onClick={scrollToTop}
          aria-label="Voltar ao topo da página"
        >
          Voltar ao topo ↑
        </button>
      </div>
    </footer>
  );
}
