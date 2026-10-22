import React from "react";
import {
  Header,
  Hero,
  Projects,
  About,
  Technologies,
  Process,
  Contact,
  Footer,
} from "./sections";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
