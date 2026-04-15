/* Home.tsx — Design: "Grain & Glow"
   Main portfolio page. Assembles all sections in order.
   Dark background with grain texture overlay (defined in index.css body::before). */

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.005 260)" }}
    >
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Contact />
    </div>
  );
}
