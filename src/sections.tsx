import React, { useState, useEffect } from "react";
import {
  links,
  heroData,
  projects,
  aboutData,
  techIndexData,
  foundationalTechs,
  contactData,
  footerData,
} from "./data";
import { ArrowUpRightIcon, ArrowUpIcon, GithubIcon, LinkedinIcon } from "./icons";

const navItems = [
  { id: "abertura", index: "00", label: "Abertura" },
  { id: "projetos", index: "01", label: "Projetos" },
  { id: "sobre", index: "02", label: "Sobre mim" },
  { id: "tecnologias", index: "03", label: "Tecnologias" },
  { id: "contato", index: "04", label: "Contato" },
];

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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="site-header" id="topo">
      <div className="container header-inner">
        <a href="#abertura" className="brand-masthead" aria-label="Álef Felix Teixeira — Início">
          <span className="brand-name">
            ÁLEF FELIX<span className="brand-dot">.</span>
          </span>
          <span className="brand-edition mono">ED. 01 // ENG. SOFTWARE</span>
        </a>

        <nav className="desktop-nav" aria-label="Capítulos do portfólio">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`nav-link mono ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="nav-num">{item.index}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          {links.disponivel && (
            <a
              href="#contato"
              className="studio-tally mono"
              aria-label="Status: Disponível para oportunidades — ir para contato"
            >
              <span className="tally-dot" aria-hidden="true" />
              <span>NO AR · DISPONÍVEL</span>
            </a>
          )}

          <button
            type="button"
            className="mobile-menu-toggle mono"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Fechar índice de capítulos" : "Abrir índice de capítulos"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="menu-toggle-label">{mobileMenuOpen ? "FECHAR" : "ÍNDICE"}</span>
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
        <nav aria-label="Navegação móvel por capítulos" className="container mobile-nav-content">
          <p className="mobile-nav-kicker mono">SUMÁRIO DA EDIÇÃO // CAPÍTULOS</p>
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
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
                    <span className="mono mobile-nav-index">CAP. {item.index}</span>
                    <span className="mobile-nav-title">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mobile-nav-footer mono">
            <span>ÁLEF FELIX TEIXEIRA — DOSSIÊ AUTORAL</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function OpeningSection() {
  return (
    <section className="opening-section" id="abertura" aria-labelledby="opening-title">
      <div className="container">
        {/* Top issue strip */}
        <div className="editorial-issue-bar mono" data-reveal>
          <div className="issue-bar-left">
            <span className="crimson-square" aria-hidden="true" />
            <span>{heroData.issueTag}</span>
          </div>
          <div className="issue-bar-right">
            <span>CAPÍTULO 00 // {heroData.chapterLabel.toUpperCase()}</span>
          </div>
        </div>

        {/* Monumental Display Name spanning across the upper editorial stage */}
        <div className="opening-headline-stage" data-reveal>
          <p className="opening-chapter-kicker mono">{heroData.chapterLabel}</p>
          <h1 id="opening-title" className="opening-monumental-title">
            <span className="title-grotesk">{heroData.firstName}</span>{" "}
            <span className="title-serif-italic">{heroData.lastName}</span>
          </h1>
        </div>

        {/* Asymmetric Editorial Spread: Left Narrative & Dialog / Right Concrete Studio Plate with Crimson Offset */}
        <div className="opening-asymmetric-grid">
          <div className="opening-narrative-col" data-reveal>
            <p className="opening-statement">{heroData.statement}</p>

            <blockquote className="opening-editorial-quote">
              <p>{heroData.editorialNote}</p>
              <footer className="mono">— NOTA DE ABERTURA // ARQUITETURA &amp; INTENÇÃO</footer>
            </blockquote>

            <div className="opening-cta-group">
              <a href="#projetos" className="btn btn-editorial-primary">
                <span>{heroData.ctaPrimary}</span>
                <span aria-hidden="true" className="btn-arrow">↓</span>
              </a>
              <a href="#contato" className="btn btn-editorial-outline">
                <span>{heroData.ctaSecondary}</span>
                <ArrowUpRightIcon className="icon-inline" />
              </a>
            </div>

            <div className="opening-pillars-ledger" aria-label="Eixos de atuação">
              {heroData.pillars.map((pillar) => (
                <div key={pillar.index} className="opening-pillar-row">
                  <span className="pillar-index mono">{pillar.index}</span>
                  <div className="pillar-body">
                    <h2 className="pillar-title">{pillar.title}</h2>
                    <p className="pillar-detail">{pillar.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="opening-visual-col" data-reveal>
            <figure className="studio-editorial-plate">
              {/* Architectural crimson offset block inspired by editorial art direction */}
              <div className="crimson-offset-block" aria-hidden="true" />

              <div className="plate-frame">
                <div className="plate-meta-bar mono">
                  <span>TOMADA 01 // ESTÚDIO CONCEITUAL</span>
                  <span>P&amp;B · 35MM · ILUSTRATIVO</span>
                </div>

                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${heroData.studioImage.base}-640.avif 640w, ${heroData.studioImage.base}.avif 1280w`}
                    sizes="(max-width: 900px) 100vw, 56vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${heroData.studioImage.base}-640.webp 640w, ${heroData.studioImage.base}.webp 1280w`}
                    sizes="(max-width: 900px) 100vw, 56vw"
                  />
                  <img
                    src={`${heroData.studioImage.base}.webp`}
                    alt={heroData.studioImage.alt}
                    width={1280}
                    height={800}
                    fetchPriority="high"
                    decoding="async"
                    className="studio-plate-img"
                  />
                </picture>
              </div>

              <figcaption className="plate-caption mono">
                {heroData.studioImage.caption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Architectural Transition Strip (inspired by editorial pill/sequence cadence) */}
        <div className="editorial-sequence-strip" aria-label="Síntese conceitual" data-reveal>
          <div className="seq-node mono">
            <span className="seq-num">I.</span>
            <span>SILÊNCIO VISUAL</span>
          </div>
          <div className="seq-node seq-node-accent mono">
            <span className="seq-num">II.</span>
            <span>ENGENHARIA WEB</span>
          </div>
          <div className="seq-node seq-node-arrow" aria-hidden="true">
            <span>→</span>
          </div>
          <div className="seq-node mono">
            <span className="seq-num">III.</span>
            <span>CÓDIGO REAL &amp; AUDITADO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsChapter() {
  return (
    <section className="chapter-section projects-chapter" id="projetos" aria-labelledby="projects-chapter-title">
      <div className="container">
        <header className="chapter-header" data-reveal>
          <div className="chapter-index-col">
            <span className="chapter-kicker mono">CAPÍTULO 01 // HISTÓRIAS DE CONSTRUÇÃO</span>
            <h2 id="projects-chapter-title" className="chapter-monumental-title">
              Projetos <span className="serif-italic">Selecionados</span>
            </h2>
          </div>
          <div className="chapter-lead-col">
            <p className="chapter-lead-copy">
              Dois trabalhos autorais documentados como matérias editoriais: o contexto de cada problema, as decisões reais de engenharia, as capturas autênticas das interfaces e os limites técnicos registrados com transparência.
            </p>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-inline-link mono"
            >
              <span>REPOSITÓRIO GERAL NO GITHUB</span>
              <ArrowUpRightIcon className="icon-inline" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </header>

        <div className="project-stories-list">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={project.id}
                className={`project-story-spread ${isReversed ? "is-reversed" : ""}`}
                aria-labelledby={`project-title-${project.id}`}
                data-reveal
              >
                {/* Story Top Editorial Masthead */}
                <div className="story-masthead">
                  <div className="story-masthead-left">
                    <span className="story-giant-num" aria-hidden="true">
                      {project.number}
                    </span>
                    <div className="story-title-group">
                      <div className="story-meta-badges mono">
                        <span className="story-chapter-tag">{project.chapterTag}</span>
                        <span
                          className={`story-status-badge ${
                            project.status === "Publicado" ? "is-live" : "is-demo"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="story-capture-badge">{project.imageType}</span>
                      </div>
                      <h3 id={`project-title-${project.id}`} className="story-title">
                        {project.name}
                      </h3>
                      <p className="story-subtitle">{project.subtitle}</p>
                    </div>
                  </div>

                  <div className="story-masthead-actions">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-editorial-primary"
                    >
                      <span>Abrir aplicação</span>
                      <ArrowUpRightIcon className="icon-inline" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-editorial-outline"
                    >
                      <GithubIcon className="icon-inline" />
                      <span>Código-fonte</span>
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </div>
                </div>

                {/* Main Asymmetric Editorial Spread */}
                <div className="story-spread-body">
                  {/* Real Screenshot Plate */}
                  <div className="story-visual-column">
                    <figure className="project-plate-figure" data-tilt-card>
                      <div className="plate-meta-bar mono">
                        <span>
                          PRANCHA {project.number} // {project.name.toUpperCase()} ({project.year})
                        </span>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="plate-domain-link"
                        >
                          <span>{project.liveDomainLabel} ↗</span>
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-plate-media-link"
                        aria-label={`Visitar publicação ao vivo do projeto ${project.name} (abre em nova aba)`}
                      >
                        <picture>
                          <source
                            type="image/avif"
                            srcSet={`${project.imageBase}-640.avif 640w, ${project.imageBase}.avif 1200w`}
                            sizes="(max-width: 900px) 100vw, 58vw"
                          />
                          <source
                            type="image/webp"
                            srcSet={`${project.imageBase}-640.webp 640w, ${project.imageBase}.webp 1200w`}
                            sizes="(max-width: 900px) 100vw, 58vw"
                          />
                          <img
                            src={`${project.imageBase}.webp`}
                            alt={project.imageAlt}
                            width={1200}
                            height={750}
                            loading="lazy"
                            decoding="async"
                            className="project-plate-img"
                          />
                        </picture>
                        <div className="project-plate-spotlight" aria-hidden="true" />
                      </a>

                      <figcaption className="plate-caption mono">
                        <span>{project.imageCaption}</span>
                        <span className="caption-color-hint">PASSE O CURSOR PARA COR ORIGINAL</span>
                      </figcaption>
                    </figure>

                    {/* Stack Ledger under plate */}
                    <div className="story-stack-bar" aria-label={`Tecnologias confirmadas em ${project.name}`}>
                      <span className="story-stack-label mono">TECNOLOGIAS CONFIRMADAS NO REPOSITÓRIO:</span>
                      <ul className="story-stack-chips">
                        {project.stack.map((tech) => (
                          <li key={tech} className="story-stack-chip mono">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Editorial Feature Essay & Verified Audit Dossier */}
                  <div className="story-essay-column">
                    <p className="story-lead-paragraph">{project.lead}</p>

                    <div className="story-prose">
                      <p>{project.narrativeParagraph1}</p>
                      <p>{project.narrativeParagraph2}</p>
                    </div>

                    <div className="story-dossier-box">
                      <h4 className="dossier-heading mono">
                        O QUE ESTÁ IMPLEMENTADO E VERIFICADO NO CÓDIGO
                      </h4>
                      <ul className="dossier-list">
                        {project.verifiedFeatures.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>

                      <h4 className="dossier-heading dossier-heading-limits mono">
                        LIMITAÇÕES E ESCOPO REGISTRADOS
                      </h4>
                      <ul className="dossier-list dossier-list-limits">
                        {project.honestLimitations.map((lim, i) => (
                          <li key={i}>{lim}</li>
                        ))}
                      </ul>

                      {project.requestedUrlNote && (
                        <div className="dossier-url-verification">
                          <p className="dossier-url-title mono">
                            NOTA DE AUDITORIA DE DEPLOY ({project.requestedUrlNote.checkedAt}):
                          </p>
                          <p className="dossier-url-text">
                            <strong>{project.requestedUrlNote.url}</strong> →{" "}
                            <span className="mono">{project.requestedUrlNote.httpStatus}</span>.{" "}
                            {project.requestedUrlNote.explanation}
                          </p>
                        </div>
                      )}
                    </div>
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
    <section className="chapter-section about-chapter" id="sobre" aria-labelledby="about-chapter-title">
      <div className="container">
        <header className="chapter-header" data-reveal>
          <div className="chapter-index-col">
            <span className="chapter-kicker mono">
              {aboutData.chapterNumber.toUpperCase()} // PERFIL &amp; MÉTODO DOCUMENTAL
            </span>
            <h2 id="about-chapter-title" className="chapter-monumental-title">
              Sobre <span className="serif-italic">mim</span>
            </h2>
          </div>
          <div className="chapter-lead-col">
            <p className="chapter-lead-copy">{aboutData.headline}</p>
          </div>
        </header>

        {/* Asymmetric Editorial Profile Spread */}
        <div className="about-editorial-spread">
          {/* Left Column: Core Bio Statement + Photographic Plates */}
          <div className="about-profile-column" data-reveal>
            <div className="about-core-prose">
              <p className="about-paragraph-primary">{aboutData.paragraph1}</p>
              <p className="about-paragraph-secondary">{aboutData.paragraph2}</p>
            </div>

            {/* Dual Photographic Composition: Conceptual Studio Desk + Real Setup */}
            <div className="about-plates-composition">
              <figure className="about-plate-primary">
                <div className="plate-meta-bar mono">
                  <span>ENSAIO CONCEITUAL // BANCADA DE ESTÚDIO</span>
                  <span>ILUSTRATIVO · P&amp;B</span>
                </div>
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${aboutData.studioDeskImage.base}-640.avif 640w, ${aboutData.studioDeskImage.base}.avif 1120w`}
                    sizes="(max-width: 900px) 100vw, 44vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${aboutData.studioDeskImage.base}-640.webp 640w, ${aboutData.studioDeskImage.base}.webp 1120w`}
                    sizes="(max-width: 900px) 100vw, 44vw"
                  />
                  <img
                    src={`${aboutData.studioDeskImage.base}.webp`}
                    alt={aboutData.studioDeskImage.alt}
                    width={1120}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="about-plate-img"
                  />
                </picture>
                <figcaption className="plate-caption mono">
                  {aboutData.studioDeskImage.caption}
                </figcaption>
              </figure>

              <figure className="about-plate-secondary">
                <div className="plate-meta-bar mono">
                  <span>ARQUIVO // SETUP</span>
                  <span>FOTO</span>
                </div>
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${aboutData.realSetupImage.base}-440.avif 440w, ${aboutData.realSetupImage.base}.avif 520w`}
                    sizes="(max-width: 900px) 65vw, 240px"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${aboutData.realSetupImage.base}-440.webp 440w, ${aboutData.realSetupImage.base}.webp 520w`}
                    sizes="(max-width: 900px) 65vw, 240px"
                  />
                  <img
                    src={`${aboutData.realSetupImage.base}.webp`}
                    alt={aboutData.realSetupImage.alt}
                    width={520}
                    height={549}
                    loading="lazy"
                    decoding="async"
                    className="about-secondary-img"
                  />
                </picture>
                <figcaption className="plate-caption mono">
                  {aboutData.realSetupImage.caption}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Right Column: Studio Conversation Q&A + 5-Step Method Ledger */}
          <div className="about-dialogue-column" data-reveal>
            <div className="interview-transcript-block">
              <div className="transcript-header mono">
                <span className="crimson-square" aria-hidden="true" />
                <span>CADERNO DE ENTREVISTA // VISÃO DE ENGENHARIA</span>
              </div>

              <div className="interview-qa-list">
                {aboutData.interviewBlocks.map((item) => (
                  <article key={item.question} className="interview-qa-item">
                    <h3 className="interview-question mono">{item.question}</h3>
                    <p className="interview-answer">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* 5-Step Method styled as Editorial Numbered Rows */}
            <div className="method-editorial-block" aria-labelledby="method-sub-title">
              <div className="transcript-header mono">
                <span id="method-sub-title">MÉTODO DE TRABALHO // 05 ETAPAS</span>
                <span>FLUXO CONTÍNUO</span>
              </div>

              <ol className="method-rows-list">
                {aboutData.processSteps.map((step, idx) => (
                  <li
                    key={step.number}
                    className={`method-editorial-row ${idx === 2 ? "is-highlighted" : ""}`}
                  >
                    <span className="method-row-num mono">{step.number}</span>
                    <div className="method-row-content">
                      <h4 className="method-row-title">{step.title}</h4>
                      <p className="method-row-desc">{step.description}</p>
                    </div>
                    <span className="method-row-arrow mono" aria-hidden="true">
                      →
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechChapter() {
  const [filter, setFilter] = useState<"ALL" | "Verso" | "DECODE">("ALL");

  const filteredTechs =
    filter === "ALL"
      ? techIndexData
      : techIndexData.filter((item) => item.projects.includes(filter));

  return (
    <section className="chapter-section tech-chapter" id="tecnologias" aria-labelledby="tech-chapter-title">
      <div className="container">
        <header className="chapter-header" data-reveal>
          <div className="chapter-index-col">
            <span className="chapter-kicker mono">CAPÍTULO 03 // ÍNDICE TÉCNICO VERIFICADO</span>
            <h2 id="tech-chapter-title" className="chapter-monumental-title">
               Matriz de <span className="serif-italic">Tecnologias</span>
            </h2>
          </div>
          <div className="chapter-lead-col">
            <p className="chapter-lead-copy">
              Longe de listas genéricas ou cartões decorativos: cada tecnologia abaixo foi auditada diretamente nos arquivos <code className="inline-code">package.json</code> dos repositórios públicos, atribuída apenas aos projetos em que é efetivamente utilizada.
            </p>

            {/* Filter controls */}
            <div className="tech-filter-bar" role="group" aria-label="Filtrar tecnologias por projeto">
              <button
                type="button"
                className={`tech-filter-btn mono ${filter === "ALL" ? "is-active" : ""}`}
                aria-pressed={filter === "ALL"}
                onClick={() => setFilter("ALL")}
              >
                TODAS AUDITADAS ({techIndexData.length})
              </button>
              <button
                type="button"
                className={`tech-filter-btn mono ${filter === "Verso" ? "is-active" : ""}`}
                aria-pressed={filter === "Verso"}
                onClick={() => setFilter("Verso")}
              >
                PROJETO VERSO ({techIndexData.filter((t) => t.projects.includes("Verso")).length})
              </button>
              <button
                type="button"
                className={`tech-filter-btn mono ${filter === "DECODE" ? "is-active" : ""}`}
                aria-pressed={filter === "DECODE"}
                onClick={() => setFilter("DECODE")}
              >
                PROJETO DECODE ({techIndexData.filter((t) => t.projects.includes("DECODE")).length})
              </button>
            </div>
          </div>
        </header>

        {/* Typographic Index Ledger */}
        <div className="tech-typographic-ledger" data-reveal>
          <div className="tech-ledger-head mono" aria-hidden="true">
            <span>ÍNDICE</span>
            <span>TECNOLOGIA</span>
            <span>FUNÇÃO ARQUITETÔNICA</span>
            <span>COMPROVAÇÃO NOS PROJETOS</span>
          </div>

          <ul className="tech-ledger-rows" aria-label="Índice tipográfico de tecnologias confirmadas">
            {filteredTechs.map((item) => (
              <li key={item.index} className="tech-ledger-row">
                <span className="tech-row-index mono">{item.index}</span>
                <div className="tech-row-name-wrap">
                  <span className="tech-row-name">{item.name}</span>
                </div>
                <span className="tech-row-category">{item.category}</span>
                <div className="tech-row-provenance">
                  <div className="tech-project-badges">
                    {item.projects.map((proj) => (
                      <span
                        key={proj}
                        className={`tech-proj-pill mono ${
                          proj === "Verso" ? "pill-verso" : "pill-decode"
                        }`}
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                  <span className="tech-row-evidence mono">{item.evidence}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Complementary / Foundational Footnote */}
        <div className="tech-footnote-strip" data-reveal>
          <div className="tech-footnote-label mono">
            <span>BASE &amp; ESTUDO COMPLEMENTAR</span>
          </div>
          <div className="tech-footnote-items">
            {foundationalTechs.map((ft) => (
              <div key={ft.name} className="tech-footnote-item">
                <strong className="tech-footnote-title">{ft.name}</strong>
                <span className="tech-footnote-note">{ft.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactChapter() {
  return (
    <section className="chapter-section contact-chapter" id="contato" aria-labelledby="contact-chapter-title">
      <div className="container">
        <div className="contact-monumental-stage" data-reveal>
          <span className="contact-mark contact-mark-tl" aria-hidden="true">+</span>
          <span className="contact-mark contact-mark-tr" aria-hidden="true">+</span>
          <span className="contact-mark contact-mark-bl" aria-hidden="true">+</span>
          <span className="contact-mark contact-mark-br" aria-hidden="true">+</span>

          <div className="contact-stage-top mono">
            <span>{contactData.chapterNumber.toUpperCase()} // {contactData.chapterTitle.toUpperCase()}</span>
            {links.disponivel && (
              <span className="contact-live-status">
                <span className="tally-dot" aria-hidden="true" />
                DISPONÍVEL PARA ESTÁGIO, PROJETOS E OPORTUNIDADES
              </span>
            )}
          </div>

          <h2 id="contact-chapter-title" className="contact-giant-headline">
            Toda boa arquitetura começa com uma <span className="serif-italic">conversa clara.</span>
          </h2>

          <p className="contact-subcopy">{contactData.subheadline}</p>

          <div className="contact-channels-grid">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-plate"
            >
              <div className="channel-plate-top mono">
                <span>CANAL OFICIAL 01 // CÓDIGO &amp; REPOSITÓRIOS</span>
                <ArrowUpRightIcon className="icon-inline" />
              </div>
              <div className="channel-plate-main">
                <GithubIcon className="channel-icon" />
                <div>
                  <span className="channel-name">GitHub</span>
                  <span className="channel-handle mono">github.com/aleffelix15</span>
                </div>
              </div>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-plate"
            >
              <div className="channel-plate-top mono">
                <span>CANAL OFICIAL 02 // REDE PROFISSIONAL</span>
                <ArrowUpRightIcon className="icon-inline" />
              </div>
              <div className="channel-plate-main">
                <LinkedinIcon className="channel-icon" />
                <div>
                  <span className="channel-name">LinkedIn</span>
                  <span className="channel-handle mono">in/alef-felix-teixeira-a5030b236</span>
                </div>
              </div>
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
      <div className="container footer-editorial-grid">
        <div className="footer-col-identity">
          <p className="footer-author">{footerData.author}</p>
          <p className="footer-role mono">{footerData.role}</p>
        </div>

        <div className="footer-col-colophon">
          <p className="footer-colophon-label mono">COLOFÃO EDITORIAL</p>
          <p className="footer-colophon-text">{footerData.colophon}</p>
        </div>

        <div className="footer-col-back">
          <a href="#abertura" className="back-to-top mono">
            <span>VOLTAR AO TOPO</span>
            <ArrowUpIcon className="icon-inline" />
          </a>
          <p className="footer-copy mono">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
