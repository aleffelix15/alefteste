import React, { useState, useEffect, useRef } from "react";
import { links } from "../data";
import { GithubIcon, LinkedinIcon } from "../icons";
import { RollText } from "./RollText";
import { MonogramLogo } from "./MonogramLogo";
import { CvButton } from "./CvButton";

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

  const navListRef = useRef<HTMLUListElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const scrollYRef = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);

  // Atualiza posição do indicador deslizante ativo com suporte a resize/rotação
  useEffect(() => {
    const updateSlider = () => {
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
    };

    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [activeSection]);

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

  // Scroll lock robusto no iOS e gerenciamento de foco acessível
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        firstNavLinkRef.current?.focus();
      });
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, scrollYRef.current);
      }
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    toggleBtnRef.current?.focus();
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
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

          {/* Botão de Acesso Rápido ao Currículo */}
          <CvButton variant="header" label="CV" />

          <button
            ref={toggleBtnRef}
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
                    ref={idx === 0 ? firstNavLinkRef : undefined}
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "location" : undefined}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    onClick={() => {
                      setActiveSection(item.id);
                      closeMenu();
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
              onClick={closeMenu}
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
              onClick={closeMenu}
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn ↗</span>
            </a>
            <CvButton variant="header" label="Baixar CV" showViewLink />
          </div>
        </nav>
      </div>
    </header>
  );
}
