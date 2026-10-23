import React, { useState, useEffect } from "react";
import {
  links,
  heroData,
  projectsIntro,
  projects,
  aboutData,
  techChapterData,
  techIndexData,
  contactData,
  footerData,
} from "./data";
import { GithubIcon, LinkedinIcon, ArrowUpIcon, getTechIcon } from "./icons";

const navItems = [
  { id: "abertura", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "contato", label: "Contato" },
];

const tickerPhrases = [
  "ENGENHARIA DE SOFTWARE",
  "ARQUITETURA REACT 19 & TYPESCRIPT",
  "DIREÇÃO EDITORIAL MONOCROMÁTICA",
  "01. VERSO — LEITURA PROFUNDA",
  "02. DECODE — DESIGN GRÁFICO INTERATIVO",
  "INTERFACES AUTORAIS & CÓDIGO LIMPO",
];

function RollText({ text }: { text: string }) {
  return (
    <span className="hover-roll-text">
      <span className="hover-roll-primary">{text}</span>
      <span className="hover-roll-clone" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

function MonogramLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="monogram-svg"
    >
      <path
        d="M12 3L3.5 20.5H7.2L12 10.2L16.8 20.5H20.5L12 3Z"
        fill="currentColor"
      />
      <circle cx="12" cy="17.5" r="1.7" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("abertura");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="site-header" id="topo">
      <div className="container header-inner">
        <a
          href="#abertura"
          className="brand-link"
          aria-label="Álef Felix Teixeira — Início"
          data-magnetic
        >
          <MonogramLogo />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-serif-name">Álef Felix</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <RollText text={item.label} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-right">
          <div className="header-social-links">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-link"
              data-magnetic
            >
              <GithubIcon size={15} />
              <RollText text="GitHub" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="header-social-link"
              data-magnetic
            >
              <LinkedinIcon size={15} />
              <RollText text="LinkedIn" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle mono"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span>{mobileMenuOpen ? "FECHAR" : "MENU"}</span>
            <span className={`hamburger-lines ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav aria-label="Navegação móvel" className="container mobile-nav-content">
          <ul className="mobile-nav-list">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="mono mobile-nav-index">0{idx + 1}</span>
                    <span className="mobile-nav-title">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mobile-nav-socials">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="header-social-link"
            >
              <GithubIcon size={16} />
              <span>GitHub ↗</span>
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="header-social-link"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function OpeningSection() {
  return (
    <section
      className="hero-editorial-stage"
      id="abertura"
      aria-labelledby="hero-main-title"
      data-hero-stage
    >
      {/* Full-bleed chiaroscuro monochrome studio background with Ken Burns & Parallax */}
      <div className="hero-backdrop-wrap" aria-hidden="true">
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroData.studioImage.base}-640.avif 640w, ${heroData.studioImage.base}.avif 1280w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${heroData.studioImage.base}-640.webp 640w, ${heroData.studioImage.base}.webp 1280w`}
            sizes="100vw"
          />
          <img
            src={`${heroData.studioImage.base}.webp`}
            alt=""
            width={1280}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="hero-backdrop-img"
            data-hero-parallax
          />
        </picture>
        <div className="hero-backdrop-vignette" />
      </div>

      <div className="container hero-stage-grid">
        {/* Left Vertical Spine: 01 | PORTFÓLIO 2026 */}
        <aside className="editorial-spine hero-spine" aria-label="Capítulo 01 — Portfólio 2026" data-reveal>
          <span className="spine-num mono" data-scramble={heroData.spineNumber}>
            {heroData.spineNumber}
          </span>
          <span className="spine-rule" aria-hidden="true" />
          <span className="spine-text mono">
            PORTFÓLIO
            <br />
            2026
          </span>
        </aside>

        {/* Main Editorial Cover Column with Mask Text Reveal */}
        <div className="hero-main-column" data-reveal>
          <h1 id="hero-main-title" className="hero-serif-title">
            <span className="line-mask">
              <span className="line-inner" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
                {heroData.firstName}
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ "--line-delay": "180ms" } as React.CSSProperties}>
                {heroData.lastName}
              </span>
            </span>
          </h1>

          <p className="hero-lead-statement hero-stagger-fade" style={{ "--fade-delay": "300ms" } as React.CSSProperties}>
            {heroData.statement}
          </p>

          <div className="hero-actions-row hero-stagger-fade" style={{ "--fade-delay": "420ms" } as React.CSSProperties}>
            <a
              href="#projetos"
              className="btn-white-editorial btn-sheen"
              data-magnetic
              data-cursor-label="EXPLORAR"
            >
              <RollText text={heroData.ctaPrimary} />
              <span aria-hidden="true" className="arrow-inline">→</span>
            </a>

            <a
              href="#contato"
              className="link-underlined-editorial"
              data-magnetic
              data-cursor-label="CONTATO"
            >
              <RollText text={heroData.ctaSecondary} />
            </a>
          </div>
        </div>

        {/* Right Floating Studio Epigraph & Caption */}
        <div className="hero-epigraph-column" data-reveal>
          <blockquote
            className="hero-floating-epigraph hero-stagger-fade"
            style={{ "--fade-delay": "360ms" } as React.CSSProperties}
          >
            <p>{heroData.epigraph}</p>
            <span className="epigraph-rule" aria-hidden="true" />
          </blockquote>

          <div
            className="hero-bottom-meta hero-stagger-fade"
            style={{ "--fade-delay": "480ms" } as React.CSSProperties}
          >
            <p className="hero-studio-caption mono">
              {heroData.studioImage.caption}
            </p>
            <a href="#projetos" className="hero-scroll-cue mono" aria-label="Rolar para a seção de projetos">
              <span className="scroll-cue-line" aria-hidden="true" />
              <span>ROLAR EDIÇÃO</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialTickerBand() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`editorial-ticker-band ${paused ? "is-paused" : ""}`}
      role="region"
      aria-label="Faixa editorial de temas e projetos"
    >
      <div className="ticker-track-viewport">
        <div className="ticker-track">
          <div className="ticker-group">
            {tickerPhrases.map((phrase, idx) => (
              <span key={idx} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span>{phrase}</span>
              </span>
            ))}
          </div>
          <div className="ticker-group" aria-hidden="true">
            {tickerPhrases.map((phrase, idx) => (
              <span key={`dup-${idx}`} className="ticker-item mono">
                <span className="ticker-dot" aria-hidden="true">◆</span>
                <span>{phrase}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="ticker-pause-btn mono"
        aria-pressed={paused}
        aria-label={paused ? "Retomar movimento da faixa editorial" : "Pausar movimento da faixa editorial"}
        onClick={() => setPaused((prev) => !prev)}
      >
        <span className="ticker-pause-glyph" aria-hidden="true">
          {paused ? "▶" : "❚❚"}
        </span>
        <span>{paused ? "RETOMAR" : "PAUSAR"}</span>
      </button>
    </div>
  );
}

export function ProjectsChapter() {
  const [activeScreenByProject, setActiveScreenByProject] = useState<Record<string, string>>({
    verso: "verso-home",
    decode: "decode-cover",
  });

  return (
    <section
      className="editorial-chapter projects-section"
      id="projetos"
      aria-labelledby="projects-heading"
      data-chapter-section
    >
      <div className="container projects-editorial-layout">
        {/* Left Column: 02 | PROJETOS + "Ideias que viram experiências." */}
        <div className="projects-intro-column" data-reveal>
          <div className="section-marker">
            <span className="marker-num mono" data-scramble={projectsIntro.spineNumber}>
              {projectsIntro.spineNumber}
            </span>
            <span className="marker-label mono" data-scramble={projectsIntro.spineLabel}>
              {projectsIntro.spineLabel}
            </span>
            <span className="marker-line" aria-hidden="true" />
          </div>

          <h2 id="projects-heading" className="section-serif-heading">
            <span className="line-mask">
              <span className="line-inner" style={{ "--line-delay": "40ms" } as React.CSSProperties}>
                Ideias que
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ "--line-delay": "140ms" } as React.CSSProperties}>
                viram experiências.
              </span>
            </span>
          </h2>

          <p className="section-intro-copy">{projectsIntro.description}</p>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underlined-editorial"
            data-magnetic
            data-cursor-label="GITHUB ↗"
          >
            <RollText text={projectsIntro.allProjectsLabel} />
            <span aria-hidden="true" className="arrow-inline">→</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        {/* Right Area: 2 Editorial Project Showcases (01. VERSO & 02. DECODE) */}
        <div className="projects-showcase-grid">
          {projects.map((project, projIdx) => {
            const selectedScreenId =
              activeScreenByProject[project.id] || project.screens[0].id;
            const currentScreen =
              project.screens.find((s) => s.id === selectedScreenId) ||
              project.screens[0];

            return (
              <article
                key={project.id}
                className="project-editorial-feature"
                aria-labelledby={`proj-title-${project.id}`}
                data-reveal
                style={{ "--reveal-delay": `${projIdx * 120}ms` } as React.CSSProperties}
              >
                {/* Browser / Archival Frame with Real Capture + Subtle 3D Tilt & Spotlight */}
                <figure className="project-capture-frame" data-tilt-card>
                  <div className="capture-window-bar mono">
                    <div className="window-bar-left">
                      <span className="window-glyph" aria-hidden="true">■</span>
                      <span>{project.liveDomainLabel}</span>
                    </div>

                    {project.screens.length > 1 ? (
                      <div
                        className="screen-switcher"
                        role="group"
                        aria-label={`Alternar captura real de ${project.name}`}
                      >
                        {project.screens.map((scr) => {
                          const isCurrent = scr.id === currentScreen.id;
                          return (
                            <button
                              key={scr.id}
                              type="button"
                              className={`screen-switch-btn mono ${
                                isCurrent ? "is-active" : ""
                              }`}
                              aria-pressed={isCurrent}
                              data-cursor-label="TELA"
                              onClick={() =>
                                setActiveScreenByProject((prev) => ({
                                  ...prev,
                                  [project.id]: scr.id,
                                }))
                              }
                            >
                              {scr.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="window-bar-badge">{project.status}</span>
                    )}
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-capture-link photo-curtain-wrap"
                    aria-label={`Visitar projeto ${project.name} publicado (abre em nova aba)`}
                    data-cursor-label="VISITAR ↗"
                  >
                    <picture key={currentScreen.id} className="screen-fade-picture">
                      <source
                        type="image/avif"
                        srcSet={`${currentScreen.base}.avif`}
                      />
                      <source
                        type="image/webp"
                        srcSet={`${currentScreen.base}.webp`}
                      />
                      <img
                        src={`${currentScreen.base}.webp`}
                        alt={currentScreen.alt}
                        width={1200}
                        height={750}
                        decoding="async"
                        className="project-capture-img"
                      />
                    </picture>
                    <div className="project-plate-spotlight" aria-hidden="true" />
                  </a>

                  <figcaption className="capture-caption mono">
                    <span>{currentScreen.caption}</span>
                    <span>CAPTURA REAL</span>
                  </figcaption>
                </figure>

                {/* Editorial Info & Story below capture */}
                <div className="project-editorial-body">
                  <div className="project-title-row">
                    <h3 id={`proj-title-${project.id}`} className="project-serif-title">
                      <span className="project-num-prefix mono" data-scramble={project.number}>
                        {project.number}
                      </span>{" "}
                      {project.name}
                    </h3>
                    <span className="project-status-pill mono">{project.status}</span>
                  </div>

                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-summary">{project.summary}</p>

                  {/* Confirmed Stack Pills with Stagger */}
                  <ul
                    className="project-stack-pills"
                    aria-label={`Tecnologias confirmadas em ${project.name}`}
                  >
                    {project.stack.map((tech, idx) => (
                      <li
                        key={tech}
                        className="project-stack-pill"
                        style={{ "--stagger-index": idx } as React.CSSProperties}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Technical Dossier Accordion with WAAPI animation */}
                  <details className="project-audit-details" data-animated-details>
                    <summary className="audit-summary mono" data-cursor-label="DOSSIÊ">
                      <span>ARQUITETURA, FUNCIONALIDADES &amp; LIMITAÇÕES REAIS</span>
                      <span className="audit-plus" aria-hidden="true">+</span>
                    </summary>
                    <div className="audit-drawer">
                      <p className="audit-arch-note">{project.architectureNote}</p>

                      <h4 className="audit-subhead mono">FUNCIONALIDADES VERIFICADAS NO CÓDIGO</h4>
                      <ul className="audit-bullet-list">
                        {project.verifiedFeatures.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>

                      <h4 className="audit-subhead audit-subhead-warn mono">
                        LIMITAÇÕES &amp; ESCOPO REGISTRADOS
                      </h4>
                      <ul className="audit-bullet-list">
                        {project.honestLimitations.map((lim, i) => (
                          <li key={i}>{lim}</li>
                        ))}
                      </ul>

                      {project.requestedUrlNote && (
                        <p className="audit-url-note">
                          <strong className="mono">
                            Nota sobre {project.requestedUrlNote.url} ({project.requestedUrlNote.checkedAt}):
                          </strong>{" "}
                          {project.requestedUrlNote.explanation}
                        </p>
                      )}
                    </div>
                  </details>

                  {/* Direct Actions: Visitar projeto -> | Ver código */}
                  <div className="project-links-bar">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-primary"
                      data-magnetic
                      data-cursor-label="ABRIR ↗"
                    >
                      <RollText text="Visitar projeto" />
                      <span aria-hidden="true" className="arrow-inline">→</span>
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>

                    <span className="links-divider" aria-hidden="true">|</span>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-secondary"
                      data-magnetic
                      data-cursor-label="CÓDIGO ↗"
                    >
                      <GithubIcon size={15} />
                      <RollText text="Ver código" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutChapter() {
  return (
    <section
      className="editorial-chapter about-section"
      id="sobre"
      aria-labelledby="about-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="about-editorial-grid" data-reveal>
          {/* Left Spine & Studio Still-Life + Real Portrait */}
          <div className="about-visual-zone">
            <div className="section-marker">
              <span className="marker-num mono" data-scramble={aboutData.spineNumber}>
                {aboutData.spineNumber}
              </span>
              <span className="marker-label mono" data-scramble={aboutData.spineLabel}>
                {aboutData.spineLabel}
              </span>
              <span className="marker-line" aria-hidden="true" />
            </div>

            <div className="about-photos-montage">
              <figure
                className="about-photo-card about-photo-studio"
                data-tilt-card
                data-cursor-label="ESTÚDIO"
              >
                <div className="photo-curtain-wrap">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${aboutData.studioDeskImage.base}-640.avif 640w, ${aboutData.studioDeskImage.base}.avif 1120w`}
                      sizes="(max-width: 900px) 100vw, 38vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={`${aboutData.studioDeskImage.base}-640.webp 640w, ${aboutData.studioDeskImage.base}.webp 1120w`}
                      sizes="(max-width: 900px) 100vw, 38vw"
                    />
                    <img
                      src={`${aboutData.studioDeskImage.base}.webp`}
                      alt={aboutData.studioDeskImage.alt}
                      width={1120}
                      height={700}
                      decoding="async"
                      className="about-studio-img"
                    />
                  </picture>
                  <div className="project-plate-spotlight" aria-hidden="true" />
                </div>
                <figcaption className="photo-micro-caption mono">
                  {aboutData.studioDeskImage.caption}
                </figcaption>
              </figure>

              <figure
                className="about-photo-card about-photo-portrait"
                data-tilt-card
                data-cursor-label="RETRATO"
              >
                <div className="photo-curtain-wrap">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${aboutData.realPortraitImage.base}.avif`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`${aboutData.realPortraitImage.base}.webp`}
                    />
                    <img
                      src={`${aboutData.realPortraitImage.base}.webp`}
                      alt={aboutData.realPortraitImage.alt}
                      width={720}
                      height={900}
                      decoding="async"
                      className="about-portrait-img"
                    />
                  </picture>
                  <div className="project-plate-spotlight" aria-hidden="true" />
                </div>
                <figcaption className="photo-micro-caption mono">
                  {aboutData.realPortraitImage.caption}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Right Narrative & Process */}
          <div className="about-narrative-zone">
            <h2 id="about-heading" className="section-serif-heading">
              <span className="line-mask">
                <span className="line-inner" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
                  {aboutData.headline}
                </span>
              </span>
            </h2>

            <div className="about-prose-stack">
              <p className="about-lead-p">{aboutData.paragraph1}</p>
              <p>{aboutData.paragraph2}</p>
              <p>{aboutData.paragraph3}</p>
            </div>

            <div className="about-process-ledger" aria-label="Método de trabalho em etapas">
              <p className="process-ledger-kicker mono">MÉTODO &amp; PROCESSO DE ENGENHARIA</p>
              <ol className="process-compact-grid">
                {aboutData.processSteps.map((step, idx) => (
                  <li
                    key={step.number}
                    className="process-compact-item"
                    style={{ "--stagger-index": idx } as React.CSSProperties}
                  >
                    <span className="process-step-num mono" data-scramble={step.number}>
                      {step.number}
                    </span>
                    <div>
                      <h3 className="process-step-title">{step.title}</h3>
                      <p className="process-step-desc">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="about-cta-row">
              <a
                href="#tecnologias"
                className="link-underlined-editorial"
                data-magnetic
                data-cursor-label="STACK ↓"
              >
                <RollText text="Saiba mais sobre minha stack" />
                <span aria-hidden="true" className="arrow-inline">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechChapter() {
  const [selectedProject, setSelectedProject] = useState<"ALL" | "VERSO" | "DECODE">("ALL");

  const visibleTechs =
    selectedProject === "ALL"
      ? techIndexData
      : techIndexData.filter((t) => t.projects.includes(selectedProject));

  return (
    <section
      className="editorial-chapter tech-and-contact-Band"
      id="tecnologias"
      aria-labelledby="tech-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="tech-editorial-layout" data-reveal>
          {/* Left Header & Monochrome Keyboard Visual */}
          <div className="tech-header-column">
            <div className="section-marker">
              <span className="marker-num mono" data-scramble={techChapterData.spineNumber}>
                {techChapterData.spineNumber}
              </span>
              <span className="marker-label mono" data-scramble={techChapterData.spineLabel}>
                {techChapterData.spineLabel}
              </span>
              <span className="marker-line" aria-hidden="true" />
            </div>

            <h2 id="tech-heading" className="section-serif-heading">
              <span className="line-mask">
                <span className="line-inner" style={{ "--line-delay": "40ms" } as React.CSSProperties}>
                  Ferramentas que
                </span>
              </span>
              <span className="line-mask">
                <span className="line-inner" style={{ "--line-delay": "140ms" } as React.CSSProperties}>
                  me acompanham.
                </span>
              </span>
            </h2>

            <p className="section-intro-copy">{techChapterData.subtitle}</p>

            {/* Filter by repository */}
            <div className="tech-filter-pills" role="group" aria-label="Filtrar tecnologias por projeto">
              <button
                type="button"
                className={`tech-filter-pill mono ${selectedProject === "ALL" ? "is-active" : ""}`}
                aria-pressed={selectedProject === "ALL"}
                data-magnetic
                onClick={() => setSelectedProject("ALL")}
              >
                TODAS ({techIndexData.length})
              </button>
              <button
                type="button"
                className={`tech-filter-pill mono ${selectedProject === "VERSO" ? "is-active" : ""}`}
                aria-pressed={selectedProject === "VERSO"}
                data-magnetic
                onClick={() => setSelectedProject("VERSO")}
              >
                VERSO ({techIndexData.filter((t) => t.projects.includes("VERSO")).length})
              </button>
              <button
                type="button"
                className={`tech-filter-pill mono ${selectedProject === "DECODE" ? "is-active" : ""}`}
                aria-pressed={selectedProject === "DECODE"}
                data-magnetic
                onClick={() => setSelectedProject("DECODE")}
              >
                DECODE ({techIndexData.filter((t) => t.projects.includes("DECODE")).length})
              </button>
            </div>

            {/* Atmospheric B&W Detail Plate */}
            <figure className="tech-detail-plate" data-tilt-card data-cursor-label="AUDITORIA">
              <div className="photo-curtain-wrap">
                <picture>
                  <source type="image/avif" srcSet="/images/about-setup-440.avif" />
                  <source type="image/webp" srcSet="/images/about-setup-440.webp" />
                  <img
                    src="/images/about-setup.webp"
                    alt="Detalhe em preto e branco de notebook e bancada de desenvolvimento."
                    width={520}
                    height={549}
                    decoding="async"
                    className="tech-detail-img"
                  />
                </picture>
                <div className="project-plate-spotlight" aria-hidden="true" />
              </div>
              <figcaption className="photo-micro-caption mono">
                ÍNDICE AUDITADO NOS ARQUIVOS PACKAGE.JSON
              </figcaption>
            </figure>
          </div>

          {/* Right Typographic Index Grid */}
          <div className="tech-index-column">
            <ul
              key={selectedProject}
              className="tech-editorial-matrix"
              aria-label="Índice de tecnologias verificadas"
            >
              {visibleTechs.map((item, idx) => (
                <li
                  key={item.index}
                  className="tech-matrix-row"
                  style={{ "--stagger-index": idx } as React.CSSProperties}
                >
                  <span className="tech-matrix-num mono">{item.index}</span>

                  <div className="tech-matrix-main">
                    <div className="tech-matrix-name-group">
                      <span className="tech-matrix-icon" aria-hidden="true">
                        {getTechIcon(item.name, 16)}
                      </span>
                      <span className="tech-matrix-name">{item.name}</span>
                    </div>
                    <span className="tech-matrix-role">{item.role}</span>
                  </div>

                  <div className="tech-matrix-provenance">
                    <div className="tech-matrix-badges">
                      {item.projects.map((proj) => (
                        <span key={proj} className="tech-matrix-badge mono">
                          {proj}
                        </span>
                      ))}
                    </div>
                    <span className="tech-matrix-note mono">{item.provenanceNote}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactChapter() {
  return (
    <section
      className="editorial-chapter contact-section"
      id="contato"
      aria-labelledby="contact-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="contact-editorial-grid" data-reveal>
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

            <div className="contact-inline-links">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="GITHUB ↗"
              >
                <GithubIcon size={18} />
                <RollText text="GitHub" />
                <span aria-hidden="true" className="arrow-inline">→</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>

              <span className="links-divider" aria-hidden="true">|</span>

              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-editorial-link"
                data-magnetic
                data-cursor-label="LINKEDIN ↗"
              >
                <LinkedinIcon size={18} />
                <RollText text="LinkedIn" />
                <span aria-hidden="true" className="arrow-inline">→</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>

          <div className="contact-right-cards">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-architectural-card"
              data-tilt-card
              data-cursor-label="ABRIR ↗"
            >
              <div className="card-top-meta mono">
                <span>REPOSITÓRIOS &amp; CÓDIGO ABERTO</span>
                <span>01 ↗</span>
              </div>
              <div className="card-main-row">
                <GithubIcon size={24} />
                <div>
                  <strong className="card-channel-title">GitHub</strong>
                  <span className="card-channel-sub mono">github.com/aleffelix15</span>
                </div>
              </div>
              <div className="project-plate-spotlight" aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-architectural-card"
              data-tilt-card
              data-cursor-label="ABRIR ↗"
            >
              <div className="card-top-meta mono">
                <span>PERFIL PROFISSIONAL &amp; CONEXÃO</span>
                <span>02 ↗</span>
              </div>
              <div className="card-main-row">
                <LinkedinIcon size={24} />
                <div>
                  <strong className="card-channel-title">LinkedIn</strong>
                  <span className="card-channel-sub mono">Álef Felix Teixeira</span>
                </div>
              </div>
              <div className="project-plate-spotlight" aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-bar">
        <div className="footer-left">
          <span className="footer-serif-author">{footerData.author}</span>
          <span className="footer-divider" aria-hidden="true">•</span>
          <span className="footer-copy-note">{footerData.copyright}</span>
        </div>

        <div className="footer-right">
          <span className="footer-role-tag mono">{footerData.role}</span>
          <a
            href="#abertura"
            className="footer-top-link mono"
            aria-label="Voltar ao topo da página"
            data-magnetic
            data-cursor-label="TOPO ↑"
          >
            <RollText text="Topo" />
            <ArrowUpIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
