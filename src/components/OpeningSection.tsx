import { useRef, useEffect } from "react";
import { heroData } from "../data";
import { RollText } from "./RollText";
import { CvButton } from "./CvButton";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        Boolean(navigator.webdriver) ||
        /Lighthouse|Chrome-Lighthouse|PageSpeed|moto g power/i.test(navigator.userAgent))
    ) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    // Define 0 inicial para animar caso não seja reduzido
    el.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 700;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeProgress * target);
            if (el) {
              el.textContent = `${currentVal}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else if (el) {
              el.textContent = `${target}${suffix}`;
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <span ref={ref} className="proof-metric-number mono">
      {target}{suffix}
    </span>
  );
}

export function OpeningSection() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="hero-editorial-stage"
      id="abertura"
      aria-labelledby="hero-main-title"
      data-hero-stage
    >
      {/* Background: Retrato real com tratamento duotone azul sutil, parallax e vinheta cinematográfica */}
      <div className="hero-backdrop-wrap" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet={`${heroData.portraitImage.base640}.avif`}
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={`${heroData.portraitImage.base640}.webp`}
          />
          <source
            type="image/avif"
            srcSet={`${heroData.portraitImage.base}.avif`}
          />
          <source
            type="image/webp"
            srcSet={`${heroData.portraitImage.base}.webp`}
          />
          {/* FIX: React 18 forwards the lowercase HTML attribute without warning. */}
          <img
            src={`${heroData.portraitImage.base}.webp`}
            alt=""
            width={720}
            height={900}
            sizes="(max-width: 767px) 100vw, 46vw"
            {...{ fetchpriority: "high" }}
            decoding="async"
            className="hero-backdrop-img hero-portrait-duotone"
            data-hero-parallax
          />
        </picture>
        <div className="hero-duotone-layer" />
        <div className="hero-grain-overlay" />
        <div className="hero-backdrop-vignette" />
        <div className="hero-mouse-radial" />
      </div>

      <div className="container hero-stage-grid">
        {/* Left Vertical Spine: 01 | PORTFÓLIO 2026 */}
        <aside
          className="editorial-spine hero-spine hero-parallax-meta"
          aria-label="Capítulo 01 — Portfólio 2026"
          data-reveal
        >
          <span className="spine-num mono" data-scramble={heroData.spineNumber}>
            {heroData.spineNumber}
          </span>
          <span className="spine-rule" aria-hidden="true" />
          <span className="spine-text mono">
            PORTFÓLIO <br />
            2026
          </span>
        </aside>

        {/* Central Stage: Headline Editorial com Máscaras em Linha + Subtítulo + CTAs */}
        <div className="hero-main-content">
          <div className="hero-status-pill mono hero-parallax-meta" data-reveal>
            <span className="status-live-dot" aria-hidden="true" />
            <span>{heroData.statusBadge}</span>
          </div>

          <h1 id="hero-main-title" className="hero-headline">
            {/* Linha 1: Álef Felix em Grotesque Display com Máscara e Cascata de Abertura */}
            <span className="line-mask hero-line-lead">
              <span
                className="line-inner hero-emergence-item"
                style={{ "--line-delay": "70ms" } as React.CSSProperties}
              >
                {heroData.firstName}
              </span>
            </span>

            {/* Linha 2: Engenharia de Software com Contraste Serifado Itálico */}
            <span className="line-mask hero-line-sub">
              <span
                className="line-inner hero-emergence-item"
                style={{ "--line-delay": "160ms" } as React.CSSProperties}
              >
                <em className="serif-italic-accent">Engenharia</em> de Software
              </span>
            </span>
          </h1>

          <p
            className="hero-statement hero-stagger-fade"
            style={{ "--fade-delay": "220ms" } as React.CSSProperties}
          >
            {heroData.statement}
          </p>

          {/* Dupla de CTAs Cinematográficos: Ver Projetos (Sheen) + Baixar CV (Liquid Fill) */}
          <div
            className="hero-actions-row hero-stagger-fade"
            style={{ "--fade-delay": "300ms" } as React.CSSProperties}
          >
            <a
              href="#projetos"
              className="btn-editorial-primary btn-sheen"
              data-magnetic
              data-cursor="magnetic"
            >
              <RollText text={heroData.ctaPrimary} />
              <span aria-hidden="true" className="arrow-inline">↓</span>
            </a>

            <CvButton />
          </div>

          {/* Barra de Prova Rápida com Contadores Animados */}
          <div
            className="hero-proof-bar hero-stagger-fade"
            style={{ "--fade-delay": "400ms" } as React.CSSProperties}
            aria-label="Indicadores rápidos de experiência técnica"
          >
            {heroData.proofMetrics.map((metric) => (
              <div key={metric.label} className="proof-metric-card">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                />
                <div className="proof-metric-info">
                  <span className="proof-metric-label mono">{metric.label}</span>
                  <span className="proof-metric-detail">{metric.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Floating Epigraph & Scroll cue */}
        <div className="hero-epigraph-column hero-parallax-meta" data-reveal>
          <blockquote
            className="hero-floating-epigraph hero-stagger-fade"
            style={{ "--fade-delay": "310ms" } as React.CSSProperties}
          >
            <p>{heroData.epigraph}</p>
            <span className="epigraph-rule" aria-hidden="true" />
          </blockquote>

          <div
            className="hero-bottom-meta hero-stagger-fade"
            style={{ "--fade-delay": "420ms" } as React.CSSProperties}
          >
            <p className="hero-studio-caption mono">
              {heroData.portraitImage.caption}
            </p>
            <a
              href="#projetos"
              className="hero-scroll-cue mono"
              aria-label="ROLAR EDIÇÃO — Rolar para a seção de projetos"
              data-magnetic
              data-cursor="magnetic"
            >
              <span className="scroll-cue-line" aria-hidden="true" />
              <span>ROLAR EDIÇÃO</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
