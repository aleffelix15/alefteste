import React, { useState, useRef, useLayoutEffect } from "react";
import {
  techCategories,
  techChapterData,
  techIndexData,
  techTiers,
  type TechCategory,
  type TechTier,
  type AuditedRepoName,
} from "../data";
import { getColorTechEmblem } from "../icons";

export function TechChapter() {
  const [selectedTier, setSelectedTier] = useState<"ALL" | TechTier>("daily");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | TechCategory>("ALL");
  const [selectedRepo, setSelectedRepo] = useState<"ALL" | AuditedRepoName>("ALL");

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prevPositions = useRef<Map<string, DOMRect>>(new Map());
  const isFirstRender = useRef(true);

  // FLIP Animation: First - Last - Invert - Play
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = cardsContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-flip-card]");
    const currentPositions = new Map<string, DOMRect>();

    cards.forEach((card) => {
      const key = card.getAttribute("data-flip-key");
      if (key) {
        currentPositions.set(key, card.getBoundingClientRect());
      }
    });

    cards.forEach((card) => {
      const key = card.getAttribute("data-flip-key");
      if (!key) return;

      const first = prevPositions.current.get(key);
      const last = currentPositions.get(key);

      if (first && last) {
        const dx = first.left - last.left;
        const dy = first.top - last.top;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          card.animate(
            [
              { transform: `translate3d(${dx}px, ${dy}px, 0)` },
              { transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 320,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            }
          );
        }
      }
    });

    prevPositions.current = currentPositions;
  });

  const handleTierChange = (tier: "ALL" | TechTier) => {
    // Grava posições antes da mudança de estado (First)
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll<HTMLElement>("[data-flip-card]");
      const positions = new Map<string, DOMRect>();
      cards.forEach((card) => {
        const key = card.getAttribute("data-flip-key");
        if (key) positions.set(key, card.getBoundingClientRect());
      });
      prevPositions.current = positions;
    }
    setSelectedTier(tier);
  };

  const repoFilters: { id: "ALL" | AuditedRepoName; label: string }[] = [
    { id: "ALL", label: "Todos os Repositórios" },
    { id: "VERSO", label: "Verso" },
    { id: "DECODE", label: "DECODE" },
    { id: "BANKTEF", label: "BANKTEF (Java/Spring)" },
    { id: "BioStudy", label: "BioStudy (Supabase)" },
    { id: "Loja de Roupa", label: "Loja & ConektaCell" },
  ];

  // Filtragem composta por Nível (Tier), Categoria e Repositório
  const filteredTechs = techIndexData.filter((item) => {
    const matchTier = selectedTier === "ALL" || item.tier === selectedTier;
    const matchCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchRepo = selectedRepo === "ALL" || item.projects.includes(selectedRepo);
    return matchTier && matchCategory && matchRepo;
  });

  const activeCategories = techCategories.filter(
    (cat) => selectedCategory === "ALL" || cat.id === selectedCategory
  );

  return (
    <section
      className="editorial-chapter tech-showcase-section"
      id="tecnologias"
      aria-labelledby="tech-heading"
      data-chapter-section
    >
      <div className="tech-ambient-glow" aria-hidden="true" />

      <div className="container" data-reveal>
        {/* Top Header Row */}
        <div className="tech-showcase-top">
          <div className="tech-top-left">
            <div className="tech-kicker-row mono">
              <span className="tech-bracket-icon" aria-hidden="true">∏</span>
              <span data-scramble={techChapterData.spineLabel}>{techChapterData.spineLabel}</span>
            </div>

            <div className="tech-headline-split">
              <span className="tech-left-accent-bar" aria-hidden="true" />

              <h2 id="tech-heading" className="tech-display-heading">
                <span className="line-mask">
                  <span className="line-inner" style={{ "--line-delay": "40ms" } as React.CSSProperties}>
                    {techChapterData.headlineLine1}
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    className="line-inner tech-heading-blue"
                    style={{ "--line-delay": "140ms" } as React.CSSProperties}
                  >
                    {techChapterData.headlineAccent}
                  </span>
                </span>
              </h2>

              <span className="tech-vertical-divider" aria-hidden="true" />

              <p className="tech-split-subtitle">{techChapterData.subtitle}</p>
            </div>
          </div>

          <aside className="tech-epigraph-aside" aria-label="Citação sobre código">
            <span className="tech-epigraph-bracket" aria-hidden="true" />
            <p className="tech-epigraph-text mono">{techChapterData.epigraph}</p>
          </aside>
        </div>

        {/* 1. SELETOR DE NÍVEIS PRINCIPAIS (3 NÍVEIS + "VER TODAS") COM ANIMAÇÃO FLIP */}
        <div className="tech-tiers-bar" role="tablist" aria-label="Níveis de proficiência tecnológica">
          {techTiers.map((tier) => {
            const isActive = selectedTier === tier.id;
            const count =
              tier.id === "ALL"
                ? techIndexData.length
                : techIndexData.filter((t) => t.tier === tier.id).length;

            return (
              <button
                key={tier.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`tech-tier-btn mono ${isActive ? "is-active" : ""}`}
                onClick={() => handleTierChange(tier.id)}
                data-cursor-label="NÍVEL"
              >
                <span className="tier-bullet" aria-hidden="true">■</span>
                <span className="tier-title">{tier.label}</span>
                <span className="tier-badge mono">{count}</span>
              </button>
            );
          })}
        </div>

        {/* 2. BARRA DE FILTROS SECUNDÁRIOS: CATEGORIAS & REPOSITÓRIOS */}
        <div className="tech-filter-toolbar">
          <div className="tech-filter-group">
            <span className="tech-filter-group-label mono">CATEGORIA</span>
            <div className="tech-filter-pills" role="group" aria-label="Filtrar por categoria técnica">
              <button
                type="button"
                className={`tech-filter-pill mono ${selectedCategory === "ALL" ? "is-active" : ""}`}
                aria-pressed={selectedCategory === "ALL"}
                onClick={() => setSelectedCategory("ALL")}
              >
                TODAS ({filteredTechs.length})
              </button>
              {techCategories.map((cat) => {
                const count = techIndexData.filter(
                  (t) =>
                    t.category === cat.id &&
                    (selectedTier === "ALL" || t.tier === selectedTier) &&
                    (selectedRepo === "ALL" || t.projects.includes(selectedRepo))
                ).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`tech-filter-pill mono ${selectedCategory === cat.id ? "is-active" : ""}`}
                    aria-pressed={selectedCategory === cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.number} · {cat.title.split("&")[0].trim().toUpperCase()} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="tech-filter-group">
            <span className="tech-filter-group-label mono">REPOSITÓRIO AUDITADO</span>
            <div className="tech-filter-pills" role="group" aria-label="Filtrar por repositório auditado">
              {repoFilters.map((repo) => {
                const isActive = selectedRepo === repo.id;
                const isPrimary = repo.id === "VERSO" || repo.id === "DECODE" || repo.id === "BANKTEF";
                return (
                  <button
                    key={repo.id}
                    type="button"
                    className={`tech-filter-pill mono ${isActive ? "is-active" : ""} ${
                      isPrimary ? "is-primary-repo" : ""
                    }`}
                    aria-pressed={isActive}
                    onClick={() => setSelectedRepo(repo.id)}
                  >
                    {repo.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. GRADE DE SÍMBOLOS AGRUPADOS COM ANIMAÇÃO FLIP */}
        <div ref={cardsContainerRef} className="tech-categories-stack">
          {activeCategories.map((cat) => {
            const itemsInCat = filteredTechs.filter((t) => t.category === cat.id);
            if (itemsInCat.length === 0) return null;

            return (
              <div key={cat.id} className="tech-category-block">
                <div className="tech-category-header">
                  <div className="tech-category-title-wrap">
                    <span className="tech-category-num mono">{cat.number}</span>
                    <h3 className="tech-category-title">{cat.title}</h3>
                    <span className="tech-category-count mono">
                      {itemsInCat.length} {itemsInCat.length === 1 ? "ITEM" : "ITENS"}
                    </span>
                  </div>
                  <p className="tech-category-desc">{cat.description}</p>
                </div>

                <ul className="tech-symbols-grid" aria-label={`Tecnologias de ${cat.title}`}>
                  {itemsInCat.map((item, idx) => (
                    <li
                      key={item.name}
                      data-flip-card
                      data-flip-key={item.name}
                      className="tech-symbol-card"
                      data-tilt-card
                      data-cursor-label={item.projects.slice(0, 2).join(" · ") || item.name}
                      style={
                        {
                          "--stagger-index": idx,
                          "--brand-color": item.brandColor,
                        } as React.CSSProperties
                      }
                    >
                      <div className="tech-symbol-halo" aria-hidden="true" />
                      <div className="project-plate-spotlight" aria-hidden="true" />

                      <div className="tech-symbol-emblem-wrap">
                        {getColorTechEmblem(item.name, 54)}
                      </div>

                      <span className="tech-symbol-name">{item.name}</span>
                      <span className="tech-symbol-role">{item.role}</span>

                      <div
                        className="tech-symbol-badges"
                        aria-label={`Comprovado em ${item.projects.join(", ")}`}
                      >
                        {item.projects.slice(0, 3).map((proj) => {
                          const isMain = proj === "VERSO" || proj === "DECODE" || proj === "BANKTEF";
                          return (
                            <span
                              key={proj}
                              className={`tech-symbol-badge mono ${
                                isMain ? "is-featured-badge" : ""
                              }`}
                            >
                              {proj}
                            </span>
                          );
                        })}
                        {item.projects.length > 3 && (
                          <span className="tech-symbol-badge mono">
                            +{item.projects.length - 3}
                          </span>
                        )}
                      </div>

                      <span className="tech-symbol-provenance mono">{item.provenanceNote}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* 4. DOSSIÊ DE TRANSPARÊNCIA E AUDITORIA */}
        <details className="tech-audit-dossier" data-animated-details>
          <summary className="audit-summary mono" data-cursor-label="ORIGEM">
            <span>ORIGEM AUDITADA NOS REPOSITÓRIOS GITHUB &amp; NOTA DE TRANSPARÊNCIA</span>
            <span className="audit-plus" aria-hidden="true">+</span>
          </summary>
          <div className="audit-drawer tech-audit-drawer-grid">
            <div className="tech-audit-repos-col">
              <h4 className="audit-subhead mono">REPOSITÓRIOS VERIFICADOS (PACKAGE.JSON / POM.XML / DOCKERFILE / SQL)</h4>
              <ul className="tech-repo-evidence-list">
                {techChapterData.auditTransparency.verifiedRepos.map((repo) => (
                  <li key={repo.name} className="tech-repo-evidence-item">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-repo-evidence-link mono"
                    >
                      {repo.name} ↗
                    </a>
                    <span className="tech-repo-evidence-focus">{repo.focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tech-audit-note-col">
              <h4 className="audit-subhead audit-subhead-warn mono">
                DIFERENCIAÇÃO ENTRE PROJETOS, AMBIENTE E NÃO VERIFICADOS
              </h4>
              <p className="audit-arch-note">
                {techChapterData.auditTransparency.excludedFromReferenceNote}
              </p>
            </div>
          </div>
        </details>

        {/* 5. ASSINATURA ARQUITETÔNICA INFERIOR */}
        <div className="tech-showcase-footer mono" aria-hidden="true">
          <div className="tech-footer-left">
            <span className="tech-footer-square" />
            <span>ÁLEF FELIX TEIXEIRA</span>
            <span className="tech-footer-rule" />
          </div>
          <div className="tech-footer-right">
            <span className="tech-footer-slashes">//</span>
            <span>ENGENHARIA DE SOFTWARE</span>
            <span className="tech-footer-pipe">|</span>
          </div>
        </div>
      </div>
    </section>
  );
}
