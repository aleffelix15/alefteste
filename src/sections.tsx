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
  ModernLogo,
  ArrowUpRight,
} from "./icons";

// ============================================================================
// 1. HEADER
// ============================================================================
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "projetos", "sobre", "tecnologias", "processo", "contato"];
      const scrollPos = window.scrollY + 180;

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
          <ModernLogo />
          <span className="brand-text">Álef Felix</span>
        </a>

        <nav className="nav-desktop" aria-label="Navegação principal">
          <a
            href="#inicio"
            className={`nav-link ${activeSection === "inicio" ? "active" : ""}`}
          >
            Início
          </a>
          <a
            href="#projetos"
            className={`nav-link ${activeSection === "projetos" ? "active" : ""}`}
          >
            Projetos
          </a>
          <a
            href="#sobre"
            className={`nav-link ${activeSection === "sobre" ? "active" : ""}`}
          >
            Sobre
          </a>
          <a
            href="#tecnologias"
            className={`nav-link ${activeSection === "tecnologias" ? "active" : ""}`}
          >
            Tecnologias
          </a>
          <a
            href="#processo"
            className={`nav-link ${activeSection === "processo" ? "active" : ""}`}
          >
            Processo
          </a>
          <a
            href="#contato"
            className={`nav-link ${activeSection === "contato" ? "active" : ""}`}
          >
            Contato
          </a>
        </nav>

        <div className="header-right">
          {links.disponivel && (
            <div className="badge-status" title="Aberto a novas oportunidades">
              <span className="badge-status-dot" aria-hidden="true"></span>
              Disponível
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
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-panel ${mobileOpen ? "open" : ""}`}>
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
          href="#processo"
          className="mobile-nav-link"
          onClick={() => setMobileOpen(false)}
        >
          Processo
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
  return (
    <section id="inicio" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="badge-status-dot" aria-hidden="true"></span>
            {heroData.statusText}
          </div>

          <h1 className="hero-title">
            {heroData.firstName}{" "}
            <span className="hero-title-highlight">{heroData.lastName}</span>
          </h1>

          <div className="hero-role">{heroData.role}</div>

          <p className="hero-bio">{heroData.bio}</p>

          <div className="hero-actions">
            <a href="#projetos" className="btn-primary">
              {heroData.ctaProjects}
              <ArrowUpRight size={16} />
            </a>
            <a href="#contato" className="btn-secondary">
              {heroData.ctaContact}
            </a>
          </div>
        </div>

        {/* Right Column: Sleek Focus Areas Panel */}
        <div className="hero-card" aria-label="Áreas de foco técnico">
          <div className="hero-card-header">
            <span className="hero-card-title">Foco &amp; Especialidades</span>
            <span className="hero-card-badge">Em formação</span>
          </div>

          {heroData.areas.map((area, idx) => (
            <div key={idx} className="focus-item">
              <span className="focus-item-title">{area.title}</span>
              <span className="focus-item-desc">{area.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. PROJECTS SECTION
// ============================================================================
export function Projects() {
  return (
    <section id="projetos" className="section-projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <span className="section-tag">01 / Projetos</span>
            <h2 className="section-title">Projetos em Destaque</h2>
            <p className="section-subtitle">
              Aplicações web desenvolvidas com rigor técnico, código aberto e deploys em produção.
            </p>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <GitHubIcon size={16} />
            Ver todos no GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.number} className="project-card">
              <div className="project-media">
                <span
                  className={`project-badge-tag ${
                    project.status === "Publicado" ? "published" : "demo"
                  }`}
                >
                  {project.status}
                </span>
                <img
                  src={project.image}
                  alt={`Captura real do projeto ${project.name}`}
                  width={600}
                  height={375}
                  loading="lazy"
                  className="project-img"
                />
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <h3 className="project-name">{project.name}</h3>
                </div>
                <div className="project-kind">{project.kind}</div>
                <p className="project-summary">{project.summary}</p>

                <div className="project-stack" aria-label="Tecnologias utilizadas">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-project-visit"
                  >
                    Visitar projeto
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-project-code"
                  >
                    <GitHubIcon size={16} />
                    Código
                  </a>
                </div>

                <div className="project-details">
                  <details>
                    <summary>
                      <span>Auditoria técnica &amp; limitações</span>
                      <span aria-hidden="true">↓</span>
                    </summary>
                    <div className="details-drawer">
                      <div>
                        <div className="details-title">Proposta:</div>
                        <p>{project.proposal}</p>
                      </div>

                      <div>
                        <div className="details-title">Comprovado no código:</div>
                        <ul className="details-list">
                          {project.does.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="details-title">Limitações reais registradas:</div>
                        <ul className="details-list">
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
// 4. ABOUT SECTION
// ============================================================================
export function About() {
  return (
    <section id="sobre" className="section-about">
      <div className="container about-grid">
        <div>
          <span className="section-tag">{aboutData.label}</span>
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="about-p">{aboutData.paragraph1}</p>
          <p className="about-p">{aboutData.paragraph2}</p>
          <a href="#processo" className="btn-secondary">
            {aboutData.cta}
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="about-media">
          <img
            src={aboutData.image}
            alt="Ambiente de desenvolvimento e estudo de Álef Felix"
            width={440}
            height={330}
            loading="lazy"
            className="about-img"
          />
          <div className="about-caption">{aboutData.imageCaption}</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. TECHNOLOGIES SECTION
// ============================================================================
export function Technologies() {
  return (
    <section id="tecnologias" className="section-tech">
      <div className="container">
        <span className="section-tag">03 / Tecnologias</span>
        <h2 className="section-title">Ferramentas &amp; Tecnologias</h2>
        <p className="section-subtitle">
          Ecossistema técnico utilizado em projetos práticos e tópicos contínuos de estudo.
        </p>

        {/* Grupo 1: Comprovadas */}
        <div className="tech-group">
          <h3 className="tech-group-title">Comprovadas nos projetos auditados</h3>
          <div className="tech-grid">
            {techGroups.proven.map((tech) => (
              <div key={tech} className="tech-card" title={`Tecnologia: ${tech}`}>
                <div className="tech-card-icon">{getTechIcon(tech, 24)}</div>
                <span className="tech-card-name">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grupo 2: Estudo */}
        <div className="tech-group">
          <h3 className="tech-group-title">Também estudo e utilizo</h3>
          <div className="tech-grid">
            {techGroups.study.map((tech) => (
              <div key={tech} className="tech-card" title={`Estudo: ${tech}`}>
                <div className="tech-card-icon">{getTechIcon(tech, 24)}</div>
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
// 6. PROCESS SECTION
// ============================================================================
export function Process() {
  return (
    <section id="processo" className="section-process">
      <div className="container">
        <span className="section-tag">04 / Método</span>
        <h2 className="section-title">Como Eu Trabalho</h2>
        <p className="section-subtitle">
          Fluxo de engenharia centrado em clareza, validação contínua e foco em qualidade.
        </p>

        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.number} className="process-card">
              <span className="process-number">{step.number}</span>
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
// 7. CONTACT SECTION
// ============================================================================
export function Contact() {
  return (
    <section id="contato" className="section-contact">
      <div className="container contact-layout">
        <div>
          <span className="section-tag">{contactData.label}</span>
          <h2 className="section-title">{contactData.title}</h2>
          <p className="contact-text">{contactData.text}</p>
        </div>

        <div className="contact-cards">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-left">
              <div className="contact-card-icon">
                <GitHubIcon size={22} />
              </div>
              <div>
                <div className="contact-card-title">GitHub</div>
                <div className="contact-card-sub">github.com/aleffelix15</div>
              </div>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-left">
              <div className="contact-card-icon">
                <LinkedInIcon size={22} />
              </div>
              <div>
                <div className="contact-card-title">LinkedIn</div>
                <div className="contact-card-sub">Álef Felix Teixeira</div>
              </div>
            </div>
            <ArrowUpRight size={18} className="contact-card-arrow" />
          </a>

          {links.email && (
            <a
              href={`mailto:${links.email}`}
              className="contact-card"
            >
              <div className="contact-card-left">
                <div className="contact-card-icon">✉</div>
                <div>
                  <div className="contact-card-title">E-mail</div>
                  <div className="contact-card-sub">{links.email}</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="contact-card-arrow" />
            </a>
          )}
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
        <div className="footer-brand">
          <ModernLogo size={24} />
          <span>{footerData.author}</span>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <a href="#inicio">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="footer-right">
          <span className="footer-copy">{footerData.copyright}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-scroll-top"
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
