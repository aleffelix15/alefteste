import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  links,
  projects,
  techGroups,
  processSteps,
  heroData,
  aboutData,
  contactData,
  footerData,
  type Project,
} from "./data";
import {
  getTechIcon,
  GitHubIcon,
  LinkedInIcon,
  BrutalistLogo,
  DoodleCrown,
  DoodleLightning,
  DoodleArrow,
  DoodleUnderline,
} from "./icons";

// ============================================================================
// 1. HEADER
// ============================================================================
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "projetos", "sobre", "tecnologias", "contato"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="Álef Felix - Início">
          <span className="brand-logo-wrap">
            <BrutalistLogo />
          </span>
          <span className="brand-text">Álef Felix</span>
        </a>

        <nav className="nav-desktop" aria-label="Navegação principal">
          <a
            href="#inicio"
            className={`nav-link ${activeSection === "inicio" ? "active-highlight" : ""}`}
          >
            Início
          </a>
          <a
            href="#projetos"
            className={`nav-link ${activeSection === "projetos" ? "active-highlight" : ""}`}
          >
            Projetos
          </a>
          <a
            href="#sobre"
            className={`nav-link ${activeSection === "sobre" ? "active-highlight" : ""}`}
          >
            Sobre
          </a>
          <a
            href="#tecnologias"
            className={`nav-link ${activeSection === "tecnologias" ? "active-highlight" : ""}`}
          >
            Tecnologias
          </a>
          <a
            href="#contato"
            className={`nav-link ${activeSection === "contato" ? "active-highlight" : ""}`}
          >
            Contato
          </a>
        </nav>

        {links.disponivel && (
          <div className="badge-disponivel" title="Aberto a novas oportunidades">
            <span className="badge-dot" aria-hidden="true"></span>
            Disponível para projetos
          </div>
        )}

        <button
          type="button"
          className="btn-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-panel ${mobileOpen ? "open" : ""}`}>
        {links.disponivel && (
          <div className="badge-disponivel" style={{ display: "inline-flex", alignSelf: "flex-start", marginBottom: "0.5rem" }}>
            <span className="badge-dot" aria-hidden="true"></span>
            Disponível para projetos
          </div>
        )}
        <a
          href="#inicio"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Início
        </a>
        <a
          href="#projetos"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Projetos
        </a>
        <a
          href="#sobre"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Sobre
        </a>
        <a
          href="#tecnologias"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Tecnologias
        </a>
        <a
          href="#contato"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Contato
        </a>
      </div>
    </header>
  );
}

// ============================================================================
// 2. HERO SECTION
// ============================================================================
export function Hero() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="inicio" className="hero-section">
      <div className="container hero-grid">
        {/* Left Column */}
        <div className="hero-left">
          <div className="hero-quote-mark" aria-hidden="true">
            “
          </div>

          <div className="hero-title-wrap">
            <h1 className="hero-name">{heroData.name}</h1>
            <DoodleLightning className="hero-lightning-doodle" />
          </div>

          <div className="hero-highlighter-strip">
            {heroData.highlight}
          </div>

          <p className="hero-bio">{heroData.bio}</p>

          <div className="hero-actions">
            <a href="#projetos" className="btn-brutalist btn-lime">
              {heroData.ctaProjects}
            </a>
            <a href="#contato" className="btn-brutalist btn-outline">
              {heroData.ctaContact}
            </a>
          </div>

          <div className="hero-counter-bar">
            <span className="hero-counter-num">{heroData.counter}</span>
            <span className="hero-counter-line" aria-hidden="true"></span>
          </div>
        </div>

        {/* Right Column: Brutalist Collage */}
        <div className="hero-collage-wrap">
          {/* Lime backing rectangle */}
          <div className="collage-lime-backing" aria-hidden="true"></div>

          {/* Crown doodle over head */}
          <DoodleCrown className="collage-crown" />

          {/* Main frame: Photo or Identified Fallback */}
          <div className="collage-main-frame">
            {!photoError ? (
              <img
                src="/images/alef.webp"
                alt="Foto de Álef Felix Teixeira"
                width={440}
                height={550}
                className="collage-photo"
                onError={() => setPhotoError(true)}
              />
            ) : (
              <div className="collage-photo-placeholder">
                <span className="placeholder-badge">[ FOTO PENDENTE ]</span>
                <p className="placeholder-note">
                  Espaço reservado para a foto real de Álef Felix.
                  <br />
                  Insira o arquivo em:
                  <br />
                  <code>public/images/alef.webp</code>
                </p>
              </div>
            )}
          </div>

          {/* Black tape element at bottom */}
          <div className="collage-tape-bottom" aria-hidden="true"></div>

          {/* Floating code snippet card */}
          <aside className="collage-code-card" aria-label="Ilustração de código">
            <pre className="code-card-pre">{heroData.codeSnippet}</pre>
          </aside>

          {/* Floating Áreas de Atuação card */}
          <aside className="collage-areas-card" aria-label={heroData.areasTitle}>
            <div className="areas-card-header">{heroData.areasTitle}</div>
            {heroData.areas.map((area) => (
              <a key={area} href="#projetos" className="areas-card-row">
                <span>{area}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </aside>

          {/* Handwritten Annotation */}
          <div className="collage-handwritten" aria-hidden="true">
            <div>IDEIAS</div>
            <div>CÓDIGO /</div>
            <div>RESULTADOS</div>
            <DoodleUnderline style={{ width: "130px", marginTop: "-4px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. SECTION: PROJETOS EM DESTAQUE
// ============================================================================
export function Projects() {
  return (
    <section id="projetos" className="section-projects">
      <div className="container">
        <div className="projects-header-row">
          <div>
            <span className="section-badge">01 / PROJETOS</span>
            <h2 className="section-title">PROJETOS EM DESTAQUE</h2>
          </div>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="projects-subtext">
            Código aberto &amp; demonstrações reais →
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.number} className="project-card">
              {/* Screenshot Media */}
              <div className="project-media-wrap">
                <span className="project-status-tag">{project.status}</span>
                <img
                  src={project.image}
                  alt={`Captura real do projeto ${project.name}`}
                  width={600}
                  height={375}
                  loading="lazy"
                  className="project-img"
                />
              </div>

              {/* Body */}
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-kind">{project.kind}</div>
                <p className="project-summary">{project.summary}</p>

                {/* Tech Chips */}
                <div className="project-stack-wrap" aria-label="Tecnologias utilizadas">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions-row">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutalist btn-project-primary"
                  >
                    Visitar projeto →
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-project-code"
                  >
                    <GitHubIcon size={16} />
                    Ver código
                  </a>
                </div>

                {/* Native Accordion for Code Proof & Limits */}
                <div className="project-accordion">
                  <details>
                    <summary>
                      <span>Detalhes técnicos &amp; limitações</span>
                      <span aria-hidden="true">↓</span>
                    </summary>
                    <div className="accordion-content">
                      <div>
                        <div className="accordion-block-title">Proposta:</div>
                        <p>{project.proposal}</p>
                      </div>

                      <div>
                        <div className="accordion-block-title">Comprovado no código:</div>
                        <ul className="accordion-list">
                          {project.does.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="accordion-block-title">Limitações reais registradas:</div>
                        <ul className="accordion-list">
                          {project.limits.map((limit, idx) => (
                            <li key={idx}>{limit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 4. SECTION: SOBRE MIM
// ============================================================================
export function About() {
  return (
    <section id="sobre" className="section-about">
      <div className="container about-grid">
        {/* Left Column */}
        <div className="about-text-col">
          <span className="section-badge">{aboutData.tag}</span>
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="about-p">{aboutData.paragraph1}</p>
          <p className="about-p">{aboutData.paragraph2}</p>

          <div className="about-actions-wrap">
            <a href="#processo" className="btn-brutalist btn-dark">
              {aboutData.cta}
            </a>

            <div className="about-handwritten-block" aria-hidden="true">
              <div className="about-handwritten-text">
                <div>DISCIPLINA</div>
                <div>FOCO</div>
                <div>EVOLUÇÃO</div>
              </div>
              <DoodleArrow style={{ width: "50px", transform: "rotate(-10deg)" }} />
            </div>
          </div>
        </div>

        {/* Right Column: Setup Photo with Lime Backing */}
        <div className="about-media-col">
          <div className="about-lime-backing" aria-hidden="true"></div>
          <div className="about-frame">
            <img
              src={aboutData.image}
              alt="Ambiente de desenvolvimento e estudo de Álef Felix"
              width={420}
              height={315}
              loading="lazy"
              className="about-img"
            />
            <div className="about-caption-box">{aboutData.imageCaption}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. SECTION: TECNOLOGIAS (FERRAMENTAS QUE UTILIZO)
// ============================================================================
export function Technologies() {
  return (
    <section id="tecnologias" className="section-tech">
      <div className="container">
        <span className="section-badge">03 / TECNOLOGIAS</span>
        <h2 className="section-title">FERRAMENTAS QUE UTILIZO</h2>
        <p className="tech-subheading">Principais tecnologias usadas nos meus projetos.</p>

        {/* Category 1: Comprovadas */}
        <div className="tech-group-block">
          <h3 className="tech-group-title">Comprovadas nos projetos</h3>
          <div className="tech-grid-5">
            {techGroups.proven.map((tech) => (
              <div key={tech} className="tech-card" title={`Tecnologia: ${tech}`}>
                {getTechIcon(tech, 24)}
                <span className="tech-card-name">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Também estudo e uso */}
        <div className="tech-group-block">
          <h3 className="tech-group-title">Também estudo e uso</h3>
          <div className="tech-grid-5">
            {techGroups.study.map((tech) => (
              <div key={tech} className="tech-card" title={`Estudo: ${tech}`}>
                {getTechIcon(tech, 24)}
                <span className="tech-card-name">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. SECTION: PROCESSO (COMO EU TRABALHO)
// ============================================================================
export function Process() {
  return (
    <section id="processo" className="section-process">
      <div className="container">
        <span className="section-badge">MÉTODO</span>
        <h2 className="section-title">COMO EU TRABALHO</h2>
        <p className="tech-subheading">Fluxo estruturado de concepção, desenvolvimento e entrega contínua.</p>

        <div className="process-grid-5">
          {processSteps.map((step) => (
            <div key={step.number} className="process-step-card">
              <span className="process-step-num">{step.number}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. SECTION: CONTATO (VAMOS CONVERSAR?)
// ============================================================================
export function Contact() {
  return (
    <section id="contato" className="section-contact">
      <div className="container contact-layout">
        {/* Left Column */}
        <div className="contact-left-col">
          <span className="section-badge">{contactData.tag}</span>
          <h2 className="section-title">{contactData.title}</h2>
          <p className="contact-text">{contactData.text}</p>

          <div className="contact-cards-wrap">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="channel-info-group">
                <div className="channel-icon-wrap">
                  <GitHubIcon size={32} />
                </div>
                <div className="channel-meta">
                  <span className="channel-name">GitHub</span>
                  <span className="channel-handle">github.com/aleffelix15</span>
                </div>
              </div>
              <span className="channel-arrow" aria-hidden="true">→</span>
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <div className="channel-info-group">
                <div className="channel-icon-wrap">
                  <LinkedInIcon size={32} />
                </div>
                <div className="channel-meta">
                  <span className="channel-name">LinkedIn</span>
                  <span className="channel-handle">Álef Felix Teixeira</span>
                </div>
              </div>
              <span className="channel-arrow" aria-hidden="true">→</span>
            </a>

            {links.email && (
              <a
                href={`mailto:${links.email}`}
                className="contact-channel-card"
              >
                <div className="channel-info-group">
                  <div className="channel-meta">
                    <span className="channel-name">E-mail</span>
                    <span className="channel-handle">{links.email}</span>
                  </div>
                </div>
                <span className="channel-arrow" aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Handwritten Note */}
        <div className="contact-right-col" aria-hidden="true">
          <div className="contact-handwritten-note">
            <div>Bora</div>
            <div>construir algo</div>
            <div>incrível!</div>
            <DoodleUnderline style={{ width: "200px", marginTop: "4px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. FOOTER
// ============================================================================
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <BrutalistLogo />
          <span className="brand-text">{footerData.author}</span>
        </div>

        <nav className="footer-nav" aria-label="Navegação secundária">
          <a href="#inicio">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="footer-right">
          <span className="footer-copy">{footerData.copyright}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-back-to-top"
            aria-label="Voltar ao topo da página"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
