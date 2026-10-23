import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  links,
  projects,
  techGroups,
  processSteps,
  heroData,
  aboutData,
  contactData,
  footerData,
} from "./data";
import {
  getTechIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

const NAV_ITEMS = [
  { id: "projetos", index: "01", label: "Projetos" },
  { id: "sobre", index: "02", label: "Sobre" },
  { id: "tecnologias", index: "03", label: "Stack" },
  { id: "processo", index: "04", label: "Método" },
  { id: "contato", index: "05", label: "Contato" },
] as const;

// ============================================================================
// 1. BARRA SUPERIOR (HEADER 76px)
// ============================================================================
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("projetos");
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const updatePillPosition = useCallback((sectionId: string) => {
    if (window.innerWidth <= 860) return;
    const navEl = navRef.current;
    const activeEl = linkRefs.current[sectionId];
    if (!navEl || !activeEl) return;

    window.requestAnimationFrame(() => {
      const x = activeEl.offsetLeft;
      const w = activeEl.offsetWidth;
      navEl.style.setProperty("--pill-x", `${x}px`);
      navEl.style.setProperty("--pill-w", `${w}px`);
      navEl.style.setProperty("--pill-opacity", "1");
    });
  }, []);

  useEffect(() => {
    let scrollRaf = 0;
    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        const scrollY = window.scrollY;
        if (scrollY < 100) {
          setActiveSection("projetos");
          return;
        }
        const scrollPos = scrollY + 220;
        const docBottom =
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 40;

        if (docBottom) {
          setActiveSection("contato");
          return;
        }

        let current = "projetos";
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id);
          if (el && scrollPos >= el.offsetTop) {
            current = item.id;
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, []);

  useEffect(() => {
    updatePillPosition(activeSection);
    const onResize = () => updatePillPosition(activeSection);
    window.addEventListener("resize", onResize, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updatePillPosition(activeSection));
    }
    return () => window.removeEventListener("resize", onResize);
  }, [activeSection, updatePillPosition]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header" data-header>
      <div className="container header-inner">
        <div className="brand-group">
          <a href="#inicio" className="brand" aria-label="Álef Felix — Ir para o início">
            <span className="brand-name">Álef Felix</span>
            <span className="brand-dot" aria-hidden="true">
              .
            </span>
          </a>
          <span className="brand-meta" aria-hidden="true">
            ENG. SOFTWARE
          </span>
        </div>

        <nav
          ref={navRef}
          className="nav-desktop"
          aria-label="Navegação principal"
        >
          <span className="nav-pill-indicator" aria-hidden="true" />
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="nav-link-num">{item.index}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="header-right">
          {links.disponivel && (
            <a
              href="#contato"
              className="status-indicator"
              aria-label="Status: Disponível — Ir para contato"
            >
              <span className="status-dot" aria-hidden="true" />
              <span className="status-label">Disponível</span>
            </a>
          )}

          <button
            type="button"
            className="btn-mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="container mobile-nav-list" aria-label="Menu móvel">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileOpen(false);
                }}
              >
                <span className="mobile-nav-num">{item.index}</span>
                <span className="mobile-nav-text">{item.label}</span>
                <span className="mobile-nav-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// ============================================================================
// 2. HERO (GRADE 1,4fr / 0,6fr)
// ============================================================================
export function Hero() {
  return (
    <section id="inicio" className="hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-main" data-reveal>
          <div className="hero-eyebrow-row">
            <span className="eyebrow-square" aria-hidden="true" />
            <p className="hero-eyebrow">{heroData.role}</p>
          </div>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-name-strong">{heroData.firstName}</span>{" "}
            <span className="hero-name-muted">{heroData.lastName}</span>
          </h1>

          <p className="hero-bio">{heroData.bio}</p>

          <div className="hero-actions">
            <a href="#projetos" className="btn-pill btn-primary">
              <span>{heroData.ctaProjects}</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href="#contato" className="btn-pill btn-outline">
              <span>{heroData.ctaContact}</span>
            </a>
          </div>
        </div>

        <aside
          className="hero-focus-col"
          aria-label="Áreas de foco técnico"
          data-reveal
          style={{ ["--stagger-index" as string]: 1 }}
        >
          <div className="focus-col-header">
            <span className="mono-label">Foco</span>
            <span className="focus-col-range" aria-hidden="true">
              01 — 03
            </span>
          </div>

          <ol className="focus-list">
            {heroData.areas.map((area, idx) => (
              <li key={area.title} className="focus-item">
                <span className="focus-index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="focus-content">
                  <h2 className="focus-title">{area.title}</h2>
                  <p className="focus-desc">{area.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="focus-col-footer">
            <span className="focus-footer-tag">REACT · TYPESCRIPT · WEB</span>
            <span className="focus-footer-dot" aria-hidden="true" />
            <span className="focus-footer-tag">CÓDIGO AUDITADO</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ============================================================================
// 3. FAIXA DE STACK (MARQUEE EM DM MONO COM CONTROLE DE PAUSA WCAG 2.2.2)
// ============================================================================
export function StackMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className={`stack-strip ${paused ? "is-paused" : ""}`}
      aria-label="Tecnologias comprovadas em projetos"
    >
      <div className="container stack-strip-inner">
        <div className="marquee-label-box" aria-hidden="true">
          <span className="marquee-label-dot" />
          <span>STACK COMPROVADA</span>
        </div>

        <div className="marquee-viewport">
          <div className="marquee-track">
            <ul className="marquee-list">
              {techGroups.proven.map((tech, idx) => (
                <li key={tech} className="marquee-item">
                  <span className="marquee-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="marquee-tech">{tech}</span>
                  <span className="marquee-sep" aria-hidden="true">
                    ·
                  </span>
                </li>
              ))}
            </ul>

            <ul className="marquee-list marquee-duplicate" aria-hidden="true">
              {techGroups.proven.map((tech, idx) => (
                <li key={`dup-${tech}`} className="marquee-item">
                  <span className="marquee-num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="marquee-tech">{tech}</span>
                  <span className="marquee-sep">·</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="marquee-pause-btn"
          onClick={() => setPaused((prev) => !prev)}
          aria-pressed={paused}
          aria-label={
            paused
              ? "Retomar animação da faixa de tecnologias"
              : "Pausar animação da faixa de tecnologias"
          }
        >
          <span className="marquee-pause-icon" aria-hidden="true">
            {paused ? "▶" : "❚❚"}
          </span>
          <span>{paused ? "Retomar" : "Pausar"}</span>
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// 4. PROJETOS (LINHAS LARGAS ALTERNADAS 1,15fr / 0,85fr)
// ============================================================================
export function Projects() {
  return (
    <section
      id="projetos"
      className="section-block section-projects"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className="section-header-row" data-reveal>
          <div>
            <div className="section-kicker">
              <span className="kicker-num">01</span>
              <span className="kicker-sep" aria-hidden="true">
                /
              </span>
              <span>Projetos</span>
            </div>
            <h2 id="projects-heading" className="section-title">
              Projetos em destaque
            </h2>
          </div>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-outline"
          >
            <GitHubIcon size={15} />
            <span>Ver todos no GitHub</span>
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        <div className="projects-list">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            const isPublished = project.status === "Publicado";
            const imgHeight = project.name === "VERSO" ? 750 : 641;
            const basePath = project.image.replace(/\.webp$/, "");
            const cleanHost = project.live.replace(/^https?:\/\//, "").replace(/\/$/, "");

            return (
              <article
                key={project.number}
                className={`project-row ${isReversed ? "is-reversed" : ""}`}
                data-reveal
              >
                <div className="project-media-col">
                  <div className="project-media-tilt" data-tilt-media>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-media-frame"
                      aria-label={`Abrir aplicação ${project.name} em nova aba`}
                    >
                      <div className="project-frame-bar" aria-hidden="true">
                        <span className="frame-bar-left">
                          <span className="frame-bar-num">FIG. {project.number}</span>
                          <span className="frame-bar-sep">//</span>
                          <span>{project.name}</span>
                        </span>
                        <span className="frame-bar-url">{cleanHost} ↗</span>
                      </div>

                      <div className="project-img-wrap">
                        <picture>
                          <source
                            type="image/avif"
                            srcSet={`${basePath}-640.avif 768w, ${basePath}.avif 1200w`}
                            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) calc(100vw - 64px), 660px"
                          />
                          <source
                            type="image/webp"
                            srcSet={`${basePath}-640.webp 768w, ${project.image} 1200w`}
                            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) calc(100vw - 64px), 660px"
                          />
                          <img
                            src={project.image}
                            alt={`Captura de tela real da aplicação ${project.name}`}
                            width={1200}
                            height={imgHeight}
                            loading="lazy"
                            decoding="async"
                            className="project-img"
                          />
                        </picture>
                        <div className="project-spotlight" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                </div>

                <div className="project-info-col">
                  <div className="project-meta-top">
                    <span className="project-index">PROJETO {project.number}</span>
                    <span
                      className={`status-chip ${
                        isPublished ? "is-published" : "is-demo"
                      }`}
                    >
                      <span className="status-chip-dot" aria-hidden="true" />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-kind">{project.kind}</div>
                  <p className="project-summary">{project.summary}</p>

                  <ul
                    className="project-stack-list"
                    aria-label={`Tecnologias utilizadas no projeto ${project.name}`}
                  >
                    {project.stack.map((tech) => (
                      <li key={tech} className="stack-chip">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill btn-primary"
                    >
                      <span>Visitar</span>
                      <span className="btn-arrow" aria-hidden="true">
                        ↗
                      </span>
                      <span className="sr-only">
                        {" "}
                        {project.name} (abre em nova aba)
                      </span>
                    </a>

                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill btn-outline"
                    >
                      <GitHubIcon size={15} />
                      <span>Código</span>
                      <span className="sr-only">
                        {" "}
                        de {project.name} no GitHub (abre em nova aba)
                      </span>
                    </a>
                  </div>

                  <details className="project-details" data-animated-details>
                    <summary className="project-details-summary">
                      <span className="summary-left">
                        <span className="summary-dot" aria-hidden="true" />
                        <span>Auditoria técnica &amp; limitações</span>
                      </span>
                      <span className="details-indicator" aria-hidden="true">
                        +
                      </span>
                    </summary>

                    <div className="details-drawer">
                      <div className="details-group">
                        <h4 className="details-heading">Proposta</h4>
                        <p className="details-text">{project.proposal}</p>
                      </div>

                      <div className="details-group">
                        <h4 className="details-heading">Comprovado no código</h4>
                        <ul className="details-list is-verified">
                          {project.does.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="details-group">
                        <h4 className="details-heading">
                          Limitações reais registradas
                        </h4>
                        <ul className="details-list is-limits">
                          {project.limits.map((limit) => (
                            <li key={limit}>{limit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. SOBRE (02 SOBRE)
// ============================================================================
export function About() {
  return (
    <section
      id="sobre"
      className="section-block section-about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="section-kicker" data-reveal>
          <span className="kicker-num">02</span>
          <span className="kicker-sep" aria-hidden="true">
            /
          </span>
          <span>Sobre</span>
        </div>

        <div className="about-editorial-grid">
          <div className="about-copy-col" data-reveal>
            <h2 id="about-heading" className="section-title about-title">
              {aboutData.title}
            </h2>
            <p className="about-paragraph">{aboutData.paragraph1}</p>
            <p className="about-paragraph">{aboutData.paragraph2}</p>

            <dl className="about-specs-grid" aria-label="Síntese acadêmica e técnica">
              <div className="about-spec-cell">
                <dt className="spec-label">Formação</dt>
                <dd className="spec-value">Engenharia de Software</dd>
              </div>
              <div className="about-spec-cell">
                <dt className="spec-label">Atuação</dt>
                <dd className="spec-value">Desenvolvimento Web &amp; UI</dd>
              </div>
              <div className="about-spec-cell">
                <dt className="spec-label">Base Principal</dt>
                <dd className="spec-value">React · TypeScript · Vite</dd>
              </div>
              <div className="about-spec-cell">
                <dt className="spec-label">Transparência</dt>
                <dd className="spec-value">Código aberto e auditado</dd>
              </div>
            </dl>

            <div className="about-cta-wrap">
              <a href="#processo" className="btn-pill btn-outline">
                <span>{aboutData.cta}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure
            className="about-media-col"
            data-reveal
            style={{ ["--stagger-index" as string]: 1 }}
          >
            <div className="about-img-frame">
              <div className="project-frame-bar" aria-hidden="true">
                <span className="frame-bar-left">
                  <span className="frame-bar-num">ARQUIVO</span>
                  <span className="frame-bar-sep">//</span>
                  <span>SETUP &amp; ESTUDO</span>
                </span>
                <span className="frame-bar-url">02.A</span>
              </div>
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/about-setup-440.avif 440w, /images/about-setup.avif 800w"
                  sizes="(max-width: 960px) 100vw, 42vw"
                />
                <source
                  type="image/webp"
                  srcSet="/images/about-setup-440.webp 440w, /images/about-setup.webp 800w"
                  sizes="(max-width: 960px) 100vw, 42vw"
                />
                <img
                  src={aboutData.image}
                  alt="Ambiente de desenvolvimento e estudo de Álef Felix Teixeira"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="about-img"
                />
              </picture>
              <figcaption className="about-caption">
                <span className="caption-index" aria-hidden="true">
                  FIG. 01
                </span>
                <span>{aboutData.imageCaption}</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. TECNOLOGIAS / STACK (03 STACK — MALHA SIMÉTRICA DE 1px)
// ============================================================================
export function Technologies() {
  return (
    <section
      id="tecnologias"
      className="section-block section-stack"
      aria-labelledby="stack-heading"
    >
      <div className="container">
        <div className="section-header-row" data-reveal>
          <div>
            <div className="section-kicker">
              <span className="kicker-num">03</span>
              <span className="kicker-sep" aria-hidden="true">
                /
              </span>
              <span>Stack</span>
            </div>
            <h2 id="stack-heading" className="section-title">
              Ferramentas &amp; tecnologias
            </h2>
          </div>
          <p className="section-lead">
            Ecossistema técnico comprovado nos repositórios auditados e frentes
            ativas de estudo em Engenharia de Software.
          </p>
        </div>

        <div className="stack-ledger" data-reveal>
          <div className="stack-ledger-group">
            <div className="stack-ledger-header">
              <span className="ledger-index">03.1</span>
              <h3 className="ledger-title">
                Comprovadas nos projetos auditados
              </h3>
              <span className="ledger-count">
                {String(techGroups.proven.length).padStart(2, "0")} tecnologias
              </span>
            </div>

            <ul className="stack-matrix stack-matrix-proven" aria-label="Tecnologias comprovadas nos projetos">
              {techGroups.proven.map((tech, idx) => (
                <li key={tech} className="stack-cell">
                  <span className="stack-cell-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="stack-cell-icon" aria-hidden="true">
                    {getTechIcon(tech, 18)}
                  </span>
                  <span className="stack-cell-name">{tech}</span>
                </li>
              ))}
              <li className="stack-cell stack-cell-seal" aria-hidden="true">
                <span className="seal-dot" />
                <span>VERIFICADO EM PACKAGE.JSON (VERSO &amp; DECODE)</span>
              </li>
            </ul>
          </div>

          <div className="stack-ledger-group">
            <div className="stack-ledger-header">
              <span className="ledger-index">03.2</span>
              <h3 className="ledger-title">Também estudo e utilizo</h3>
              <span className="ledger-count">
                {String(techGroups.study.length).padStart(2, "0")} tecnologias
              </span>
            </div>

            <ul className="stack-matrix stack-matrix-study" aria-label="Tecnologias em estudo">
              {techGroups.study.map((tech, idx) => (
                <li key={tech} className="stack-cell">
                  <span className="stack-cell-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="stack-cell-icon" aria-hidden="true">
                    {getTechIcon(tech, 18)}
                  </span>
                  <span className="stack-cell-name">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. MÉTODO (04 MÉTODO — TIMELINE HORIZONTAL DE 5 PASSOS)
// ============================================================================
export function Process() {
  return (
    <section
      id="processo"
      className="section-block section-method"
      aria-labelledby="method-heading"
      data-timeline-section
    >
      <div className="container">
        <div className="section-header-row" data-reveal>
          <div>
            <div className="section-kicker">
              <span className="kicker-num">04</span>
              <span className="kicker-sep" aria-hidden="true">
                /
              </span>
              <span>Método</span>
            </div>
            <h2 id="method-heading" className="section-title">
              Como eu trabalho
            </h2>
          </div>
          <p className="section-lead">
            Fluxo de engenharia enxuto, da definição do problema à entrega
            verificável e documentada.
          </p>
        </div>

        <div className="timeline-wrapper" data-reveal>
          <div className="timeline-line-track" aria-hidden="true">
            <div className="timeline-line-progress" data-timeline-progress />
          </div>

          <ol className="timeline-steps">
            {processSteps.map((step) => (
              <li key={step.number} className="timeline-step">
                <div className="timeline-node" aria-hidden="true">
                  <span className="timeline-dot" />
                </div>
                <div className="timeline-card-body">
                  <div className="timeline-step-head">
                    <span className="timeline-num">PASSO {step.number}</span>
                    <span className="timeline-Watermark" aria-hidden="true">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-desc">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. CONTATO (05 CONTATO — TÍTULO CENTRALIZADO ≈104px)
// ============================================================================
export function Contact() {
  return (
    <section
      id="contato"
      className="section-block section-contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-editorial-panel" data-reveal>
          <span className="corner-mark is-tl" aria-hidden="true">+</span>
          <span className="corner-mark is-tr" aria-hidden="true">+</span>
          <span className="corner-mark is-bl" aria-hidden="true">+</span>
          <span className="corner-mark is-br" aria-hidden="true">+</span>

          <div className="section-kicker contact-kicker">
            <span className="kicker-num">05</span>
            <span className="kicker-sep" aria-hidden="true">
              /
            </span>
            <span>Contato</span>
          </div>

          {links.disponivel && (
            <div className="contact-availability">
              <span className="status-dot" aria-hidden="true" />
              <span>{heroData.statusText}</span>
            </div>
          )}

          <h2 id="contact-heading" className="contact-giant-title">
            {contactData.title}
          </h2>

          <p className="contact-lead">{contactData.text}</p>

          <div className="contact-actions">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-primary btn-lg"
            >
              <GitHubIcon size={17} />
              <span>GitHub</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-outline btn-lg"
            >
              <LinkedInIcon size={17} />
              <span>LinkedIn</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>

            {links.email && (
              <a
                href={`mailto:${links.email}`}
                className="btn-pill btn-outline btn-lg"
              >
                <span>E-mail</span>
                <span className="btn-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 9. RODAPÉ (FOOTER)
// ============================================================================
export function Footer() {
  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-brand-mini">
            Álef Felix<span className="brand-dot">.</span>
          </span>
          <span className="footer-sep" aria-hidden="true">
            /
          </span>
          <p className="footer-copy">{footerData.copyright}</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="btn-back-top"
          aria-label="Voltar ao topo da página"
        >
          <span>Voltar ao topo</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
