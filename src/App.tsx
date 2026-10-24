import { useEffect } from "react";
import { Header } from "./components/Header";
import { OpeningSection } from "./components/OpeningSection";
import { EditorialTickerBand } from "./components/EditorialTickerBand";
import { ProjectsChapter } from "./components/ProjectsChapter";
import { AboutChapter } from "./components/AboutChapter";
import { TechChapter } from "./components/TechChapter";
import { ContactChapter } from "./components/ContactChapter";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
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
      <Preloader />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div
        className="scroll-progress-bar"
        data-scroll-progress
        aria-hidden="true"
      />
      {/* Cursor editorial contextual para dispositivos com ponteiro fino */}
      <div
        className="editorial-cursor"
        data-editorial-cursor
        aria-hidden="true"
      >
        <span className="editorial-cursor-dot" />
        <span className="editorial-cursor-label mono" data-editorial-cursor-text />
      </div>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <OpeningSection />
        <EditorialTickerBand />
        <ProjectsChapter />
        <AboutChapter />
        <TechChapter />
        <ContactChapter />
      </main>
      <Footer />
    </>
  );
}
