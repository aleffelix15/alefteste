import React, { useState } from "react";
import { links, projectsIntro, projects, type ProjectStory } from "../data";
import { GithubIcon } from "../icons";
import { trackEvent } from "../analytics";
import { RollText } from "./RollText";

export function ProjectsChapter() {
  const [activeScreenByProject, setActiveScreenByProject] = useState<Record<string, string>>({
    verso: "verso-home",
    decode: "decode-cover",
    nudemo: "nudemo-hero",
  });

  const [expandedCaseStudy, setExpandedCaseStudy] = useState<Record<string, boolean>>({
    verso: false,
    decode: false,
    nudemo: false,
  });

  const toggleCaseStudy = (projectId: string) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setExpandedCaseStudy((prev) => ({
          ...prev,
          [projectId]: !prev[projectId],
        }));
      });
    } else {
      setExpandedCaseStudy((prev) => ({
        ...prev,
        [projectId]: !prev[projectId],
      }));
    }
  };

  return (
    <section
      className="editorial-chapter projects-section"
      id="projetos"
      aria-labelledby="projects-heading"
      data-chapter-section
    >
      <div className="container projects-editorial-layout">
        {/* Coluna da Esquerda: 02 | PROJETOS + Título Editorial Sticky */}
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

          {/* Quick jump nav entre projetos para scroll storytelling */}
          <nav className="projects-quick-nav mono" aria-label="Navegar entre projetos">
            {projects.map((p) => (
              <a
                key={p.id}
                href={`#projeto-${p.id}`}
                className="projects-quick-pill"
                data-magnetic
                data-cursor="magnetic"
              >
                <span>{p.number}</span>
                <span>{p.name}</span>
              </a>
            ))}
          </nav>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underlined-editorial"
            data-magnetic
            data-cursor="magnetic"
          >
            <RollText text={projectsIntro.allProjectsLabel} />
            <span aria-hidden="true" className="arrow-inline">→</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        {/* Coluna da Direita: Projetos 01 VERSO, 02 DECODE e 03 NUDEMO */}
        <div className="projects-showcase-grid">
          {projects.map((project: ProjectStory, projIdx: number) => {
            const primaryScreen = project.screens[0];
            const secondaryScreen = project.screens[1] ?? project.screens[0];
            const selectedScreenId =
              activeScreenByProject[project.id] || primaryScreen.id;
            const currentScreen =
              project.screens.find((s) => s.id === selectedScreenId) ||
              primaryScreen;

            const isSecondaryManuallyActive =
              project.screens.length > 1 && selectedScreenId === secondaryScreen.id;
            const isExpanded = expandedCaseStudy[project.id];

            const handleImageStageClick = (e: React.MouseEvent) => {
              if (project.screens.length > 1 && typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                // No touch mobile, toque no frame alterna a captura sem acionar o link acidentalmente
                e.preventDefault();
                setActiveScreenByProject((prev) => ({
                  ...prev,
                  [project.id]: isSecondaryManuallyActive ? primaryScreen.id : secondaryScreen.id,
                }));
              }
            };

            return (
              <article
                key={project.id}
                id={`projeto-${project.id}`}
                className="project-editorial-feature"
                aria-labelledby={`proj-title-${project.id}`}
                data-reveal
                style={{ "--reveal-delay": `${projIdx * 100}ms` } as React.CSSProperties}
              >
                {/* Mockup em moldura de navegador com Crossfade Ótico 100% GPU */}
                <figure
                  className={`project-capture-frame ${
                    isSecondaryManuallyActive ? "is-blade-active" : ""
                  }`}
                >
                  <div className="capture-window-bar mono">
                    <div className="window-bar-left">
                      <span className="window-glyph" aria-hidden="true">■</span>
                      <span>{project.liveDomainLabel}</span>
                    </div>

                    {project.screens.length > 1 ? (
                      <div
                        className="screen-switcher"
                        role="group"
                        aria-label={`Alternar captura de ${project.name}`}
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
                              data-cursor="magnetic"
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
                    className="project-capture-link project-blade-stage"
                    aria-label={`Visitar projeto ${project.name} publicado (abre em nova aba)`}
                    data-cursor-label="[ EXPLORAR CASO ↗ ]"
                    onClick={handleImageStageClick}
                  >
                    {/* Camada 1 (Primária): Crossfade Ótico com scale3d(0.98) no hover */}
                    <div className="project-blade-layer project-blade-layer--primary">
                      <picture className="project-img-primary screen-fade-picture">
                        <source
                          type="image/avif"
                          srcSet={`${primaryScreen.base}-640.avif 640w, ${primaryScreen.base}.avif 1200w`}
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                        />
                        <source
                          type="image/webp"
                          srcSet={`${primaryScreen.base}-640.webp 640w, ${primaryScreen.base}.webp 1200w`}
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                        />
                        <img
                          src={`${primaryScreen.base}.webp`}
                          srcSet={`${primaryScreen.base}-640.webp 640w, ${primaryScreen.base}.webp 1200w`}
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                          alt={primaryScreen.alt}
                          width={1200}
                          height={750}
                          loading="lazy"
                          decoding="async"
                          className="project-capture-img"
                        />
                      </picture>
                    </div>

                    {/* Camada 2 (Secundária): Crossfade Ótico com opacity 1 e scale3d(1) no hover */}
                    <div
                      className={`project-blade-layer project-blade-layer--secondary ${
                        project.id === "verso" ? "is-verso-editorial-zoom" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <picture className="project-img-secondary">
                        <source
                          type="image/avif"
                          srcSet={
                            secondaryScreen.id !== "decode-dashboard"
                              ? `${secondaryScreen.base}-640.avif 640w, ${secondaryScreen.base}.avif 1200w`
                              : `${secondaryScreen.base}.avif 1200w`
                          }
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                        />
                        <source
                          type="image/webp"
                          srcSet={
                            secondaryScreen.id !== "decode-dashboard"
                              ? `${secondaryScreen.base}-640.webp 640w, ${secondaryScreen.base}.webp 1200w`
                              : `${secondaryScreen.base}.webp 1200w`
                          }
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                        />
                        <img
                          src={`${secondaryScreen.base}.webp`}
                          srcSet={
                            secondaryScreen.id !== "decode-dashboard"
                              ? `${secondaryScreen.base}-640.webp 640w, ${secondaryScreen.base}.webp 1200w`
                              : `${secondaryScreen.base}.webp 1200w`
                          }
                          sizes="(max-width: 1024px) calc(100vw - 40px), 840px"
                          alt=""
                          width={1200}
                          height={750}
                          loading="lazy"
                          decoding="async"
                          className="project-capture-img project-capture-img--secondary"
                        />
                      </picture>
                    </div>

                    {/* Seletor mobile touch em pílula translúcida para Decode e Nudemo */}
                    {project.screens.length > 1 && (
                      <div
                        className="project-mobile-screen-pill mono"
                        role="group"
                        aria-label={`Alternar tela de ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className={`mobile-pill-btn ${
                            selectedScreenId === primaryScreen.id ? "is-active" : ""
                          }`}
                          aria-pressed={selectedScreenId === primaryScreen.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveScreenByProject((prev) => ({
                              ...prev,
                              [project.id]: primaryScreen.id,
                            }));
                          }}
                        >
                          01 CAPA
                        </button>
                        <span className="mobile-pill-divider" aria-hidden="true">|</span>
                        <button
                          type="button"
                          className={`mobile-pill-btn ${
                            selectedScreenId === secondaryScreen.id ? "is-active" : ""
                          }`}
                          aria-pressed={selectedScreenId === secondaryScreen.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveScreenByProject((prev) => ({
                              ...prev,
                              [project.id]: secondaryScreen.id,
                            }));
                          }}
                        >
                          02 SISTEMA
                        </button>
                      </div>
                    )}
                  </a>

                  <figcaption className="capture-caption mono">
                    <span>{currentScreen.caption}</span>
                    <span>
                      {project.screens.length > 1
                        ? "TOQUE OU PASSE O MOUSE P/ PREVIEW EM LÂMINA"
                        : "CAPTURA REAL · ZOOM EDITORIAL"}
                    </span>
                  </figcaption>
                </figure>

                {/* Conteúdo Editorial do Projeto */}
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

                  {/* Pílulas de Stack com Stagger */}
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

                  {/* Estudo de Caso Expansível com View Transitions */}
                  <div className="case-study-expand-container">
                    <button
                      type="button"
                      className="case-study-trigger-btn mono"
                      onClick={() => toggleCaseStudy(project.id)}
                      aria-expanded={isExpanded}
                      data-cursor="magnetic"
                    >
                      <span>
                        {isExpanded
                          ? "OCULTAR ESTUDO DE CASO"
                          : "EXPANDIR ESTUDO DE CASO (PROBLEMA, SOLUÇÃO & DECISÕES)"}
                      </span>
                      <span className={`case-study-chevron ${isExpanded ? "is-open" : ""}`} aria-hidden="true">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="case-study-content-panel">
                        <div className="case-study-item">
                          <h4 className="case-study-label mono">01 // O PROBLEMA</h4>
                          <p className="case-study-text">{project.caseStudy.problem}</p>
                        </div>

                        <div className="case-study-item">
                          <h4 className="case-study-label mono">02 // A SOLUÇÃO</h4>
                          <p className="case-study-text">{project.caseStudy.solution}</p>
                        </div>

                        <div className="case-study-item">
                          <h4 className="case-study-label mono">03 // DECISÕES TÉCNICAS</h4>
                          <ul className="audit-bullet-list">
                            {project.caseStudy.technicalDecisions.map((decision, dIdx) => (
                              <li key={dIdx}>{decision}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="case-study-item">
                          <h4 className="case-study-label case-study-warn mono">04 // LIMITAÇÕES REAIS</h4>
                          <ul className="audit-bullet-list">
                            {project.honestLimitations.map((lim, lIdx) => (
                              <li key={lIdx}>{lim}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ações Diretas: Visitar projeto | Ver código */}
                  <div className="project-links-bar">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-primary btn-sheen"
                      data-magnetic
                      data-cursor="magnetic"
                      onClick={() =>
                        trackEvent("project_click", {
                          project: project.name,
                          action: "live",
                          url: project.liveUrl,
                        })
                      }
                    >
                      <RollText text="Visitar projeto" />
                      <span aria-hidden="true" className="arrow-inline">→</span>
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-secondary"
                      data-magnetic
                      data-cursor="magnetic"
                      onClick={() =>
                        trackEvent("project_click", {
                          project: project.name,
                          action: "repo",
                          url: project.repoUrl,
                        })
                      }
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
