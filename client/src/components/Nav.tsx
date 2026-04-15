import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = useMemo(
    () =>
      language === "es"
        ? {
            links: [
              { label: "Sobre mi", href: "#about" },
              { label: "Experiencia", href: "#experience" },
              { label: "Skills", href: "#skills" },
              { label: "Portfolio", href: "#portfolio" },
            ],
            cta: "Contactar",
          }
        : {
            links: [
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Skills", href: "#skills" },
              { label: "Portfolio", href: "#portfolio" },
            ],
            cta: "Contact",
          },
    [language]
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.08_0.005_260/0.92)] backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container relative flex items-center justify-between h-16 pt-4">
        <a
          href="#"
          className="font-['Space_Grotesk'] font-800 text-base tracking-tight text-white/90 hover:text-[var(--glow-orange)] transition-colors duration-300"
          style={{ fontWeight: 800 }}
        >
          CML<span className="text-[var(--glow-orange)]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {copy.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mono-label hover:text-[var(--glow-orange)] hover:opacity-100 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border rounded-full text-white/70 hover:text-[var(--glow-orange)] transition-all duration-300"
          style={{
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.08em",
            borderColor: "var(--glow-orange)",
          }}
        >
          {copy.cta}
        </a>
      </div>
    </motion.nav>
  );
}
