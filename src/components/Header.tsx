import React, { useState, useEffect, useRef } from "react";
import { links } from "../data";
import { GithubIcon, LinkedinIcon } from "../icons";
import { RollText } from "./RollText";
import { MonogramLogo } from "./MonogramLogo";

export const navItems = [
  { id: "abertura", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "contato", label: "Contato" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("abertura");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const current = document.documentElement.getAttribute("data-theme");
      return current === "light" ? "light" : "dark";
    }
    return "dark";
  });

  const navListRef = useRef<HTMLUListElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});

  // Atualiza posição do indicador deslizante ativo
  useEffect(() => {
    const list = navListRef.current;
    if (!list) return;

    const activeEl = list.querySelector<HTMLElement>(`[data-nav-id="${activeSection}"]`);
    if (activeEl) {
      const listRect = list.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setSliderStyle({
        left: `${activeRect.left - listRect.left}px`,
        width: `${activeRect.width}px`,
        opacity: 1,
      });
    }
  }, [activeSection]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", nextTheme);
      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}
    }
  };

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

        {/* Navegação Desktop com Indicador Deslizante Suave */}
        <nav className="desktop-nav" aria-label="Navegação principal">
          <ul ref={navListRef} className="nav-list">
            <span
              className="nav-sliding-indicator"
              style={sliderStyle}
              aria-hidden="true"
            />
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    data-nav-id={item.id}
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
              data-cursor-label="GITHUB"
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
              data-cursor-label="LINKEDIN"
            >
              <LinkedinIcon size={15} />
              <RollText text="LinkedIn" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>

          {/* Botão de Alternância de Tema Claro / Escuro */}
          <button
            type="button"
            className="theme-toggle-btn mono"
            onClick={toggleTheme}
            aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
            title={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
            data-magnetic
            data-cursor-label="TEMA"
          >
            {theme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

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
            <button
              type="button"
              className="header-social-link mono"
              onClick={toggleTheme}
            >
              <span>TEMA: {theme === "dark" ? "CLARO ☀" : "ESCURO ☾"}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
