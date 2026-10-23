import React, { useEffect } from "react";
import {
  Header,
  OpeningSection,
  ProjectsChapter,
  AboutChapter,
  TechChapter,
  ContactChapter,
  Footer,
} from "./sections";
import { initPortfolioMotion } from "./motion";

export default function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      cleanup = initPortfolioMotion();
    }, 20);
    return () => {
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div
        className="scroll-progress-bar"
        data-scroll-progress
        aria-hidden="true"
      />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <OpeningSection />
        <ProjectsChapter />
        <AboutChapter />
        <TechChapter />
        <ContactChapter />
      </main>
      <Footer />
    </>
  );
}
