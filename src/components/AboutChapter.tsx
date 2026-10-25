import React, { useRef, useEffect } from "react";
import { aboutData } from "../data";
import { RollText } from "./RollText";

export function AboutChapter() {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = timelineRef.current;
    if (!list) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const items = list.querySelectorAll(".timeline-vertical-step");
      items.forEach((it) => it.classList.add("is-active"));
      return;
    }

    const items = list.querySelectorAll<HTMLElement>(".timeline-vertical-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((it) => observer.observe(it));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="editorial-chapter about-section"
      id="sobre"
      aria-labelledby="about-heading"
      data-chapter-section
    >
      <div className="container">
        <div className="about-editorial-grid" data-reveal>
          {/* Left Visual Zone: Marker + Dual-Depth Photos Montage */}
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
                data-cursor-label="[ ESTÚDIO ↗ ]"
              >
                <div className="photo-curtain-wrap about-depth-viewport">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      type="image/webp"
                      srcSet={`${aboutData.studioDeskImage.base}-640.webp`}
                    />
                    <source
                      media="(max-width: 767px)"
                      type="image/avif"
                      srcSet={`${aboutData.studioDeskImage.base}-640.avif`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`${aboutData.studioDeskImage.base}.webp`}
                    />
                    <source
                      type="image/avif"
                      srcSet={`${aboutData.studioDeskImage.base}.avif`}
                    />
                    <img
                      src={`${aboutData.studioDeskImage.base}.webp`}
                      alt={aboutData.studioDeskImage.alt}
                      width={1120}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="about-studio-img"
                    />
                  </picture>
                </div>
                <figcaption className="photo-micro-caption mono">
                  {aboutData.studioDeskImage.caption}
                </figcaption>
              </figure>

              <figure
                className="about-photo-card about-photo-portrait"
                data-cursor-label="[ RETRATO ↗ ]"
              >
                <div className="photo-curtain-wrap about-depth-viewport">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      type="image/webp"
                      srcSet={`${aboutData.realPortraitImage.base}-640.webp`}
                    />
                    <source
                      media="(max-width: 767px)"
                      type="image/avif"
                      srcSet={`${aboutData.realPortraitImage.base}-640.avif`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`${aboutData.realPortraitImage.base}.webp`}
                    />
                    <source
                      type="image/avif"
                      srcSet={`${aboutData.realPortraitImage.base}.avif`}
                    />
                    <img
                      src={`${aboutData.realPortraitImage.base}.webp`}
                      alt={aboutData.realPortraitImage.alt}
                      width={720}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="about-portrait-img"
                    />
                  </picture>
                </div>
                <figcaption className="photo-micro-caption mono">
                  {aboutData.realPortraitImage.caption}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Right Narrative & Vertical Timeline */}
          <div className="about-narrative-zone">
            <h2 id="about-heading" className="section-serif-heading">
              <span className="line-mask">
                <span className="line-inner" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
                  {aboutData.headline}
                </span>
              </span>
            </h2>

            {/* Narrativa Editorial com renderização de nós DOM limpa e leve */}
            <div className="about-prose-stack">
              <p className="about-lead-p">{aboutData.paragraph1}</p>
              <p>{aboutData.paragraph2}</p>
              <p>{aboutData.paragraph3}</p>
            </div>

            {/* Linha do Tempo Vertical do Método de Trabalho */}
            <div className="about-process-ledger" aria-label="Método de trabalho em etapas cronológicas">
              <p className="process-ledger-kicker mono">MÉTODO &amp; PROCESSO DE ENGENHARIA (TIMELINE)</p>

              <ol ref={timelineRef} className="timeline-vertical-ledger">
                <div className="timeline-vertical-spine" aria-hidden="true" />

                {aboutData.processSteps.map((step, idx) => (
                  <li
                    key={step.number}
                    className="timeline-vertical-step"
                    style={{ "--step-index": idx } as React.CSSProperties}
                  >
                    <div className="timeline-node-marker mono">
                      <span className="timeline-node-dot" />
                      <span className="timeline-node-num">{step.number}</span>
                    </div>

                    <div className="timeline-step-card">
                      <h3 className="timeline-step-title">{step.title}</h3>
                      <p className="timeline-step-desc">{step.description}</p>
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
                data-cursor="magnetic"
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
