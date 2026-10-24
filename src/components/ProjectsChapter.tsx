import { useState } from "react";
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
    // Integração com View Transitions API se disponível
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
              <a key={p.id} href={`#projeto-${p.id}`} className="projects-quick-pill" data-magnetic>
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
            data-cursor-label="GITHUB ↗"
          >
            <RollText text={projectsIntro.allProjectsLabel} />
            <span aria-hidden="true" className="arrow-inline">→</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        {/* Coluna da Direita: Projetos 01 VERSO, 02 DECODE e 03 NUDEMO */}
        <div className="projects-showcase-grid">
          {projects.map((project: ProjectStory, projIdx: number) => {
            const selectedScreenId =
              activeScreenByProject[project.id] || project.screens[0].id;
            const currentScreen =
              project.screens.find((s) => s.id === selectedScreenId) ||
              project.screens[0];

            const isExpanded = expandedCaseStudy[project.id];

            return (
              <article
                key={project.id}
                id={`projeto-${project.id}`}
                className="project-editorial-feature"
                aria-labelledby={`proj-title-${project.id}`}
                data-reveal
                style={{ "--reveal-delay": `${projIdx * 100}ms` } as React.CSSProperties}
              >
                {/* Mockup em moldura de navegador com Spotlight & Tilt sutil */}
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
                        srcSet={
                          currentScreen.id === "decode-dashboard"
                            ? `${currentScreen.base}.avif`
                            : `${currentScreen.base}-640.avif 640w, ${currentScreen.base}.avif 1200w`
                        }
                        sizes="(max-width: 820px) 100vw, 560px"
                      />
                      <source
                        type="image/webp"
                        srcSet={
                          currentScreen.id === "decode-dashboard"
                            ? `${currentScreen.base}.webp`
                            : `${currentScreen.base}-640.webp 640w, ${currentScreen.base}.webp 1200w`
                        }
                        sizes="(max-width: 820px) 100vw, 560px"
                      />
                      <img
                        src={`${currentScreen.base}.webp`}
                        alt={currentScreen.alt}
                        width={1200}
                        height={750}
                        loading="lazy"
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
                      data-cursor-label="ESTUDO"
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

                        {project.requestedUrlNote && (
                          <p className="audit-url-note">
                            <strong className="mono">
                              Nota sobre {project.requestedUrlNote.url} ({project.requestedUrlNote.checkedAt}):
                            </strong>{" "}
                            {project.requestedUrlNote.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Ações Diretas: Visitar projeto | Ver código */}
                  <div className="project-links-bar">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-primary"
                      data-magnetic
                      data-cursor-label="VISITAR ↗"
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
                      data-cursor-label="CÓDIGO ↗"
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
