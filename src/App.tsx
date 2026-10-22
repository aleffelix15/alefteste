import React, { useEffect } from "react";
import {
  Header,
  Hero,
  StackMarquee,
  Projects,
  About,
  Technologies,
  Process,
  Contact,
  Footer,
} from "./sections";
import { initPortfolioMotion } from "./motion";

export default function App() {
  useEffect(() => {
    const cleanup = initPortfolioMotion();
    return cleanup;
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
      <main id="conteudo">
        <Hero />
        <StackMarquee />
        <Projects />
        <About />
        <Technologies />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
