import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-martinez-lasierra/" },
  { label: "Fiverr", href: "https://www.fiverr.com/users/caarlosml/" },
  { label: "Instagram", href: "https://www.instagram.com/caarlos_martinezl/" },
  { label: "YouTube", href: "https://www.youtube.com/@MartzIA/videos" },
  { label: "GitHub", href: "https://github.com/CarlosMartinezLasierra" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  const copy = useMemo(
    () =>
      language === "es"
        ? {
            eyebrow: "✦ Contacto",
            title: "Hablemos",
            description:
              "Tienes un proyecto en mente o buscas un perfil creativo y tecnico? Estoy disponible para colaboraciones, proyectos freelance y oportunidades profesionales.",
            copied: "✓ Copiado",
            footer: "Diseno: Grain & Glow - React + Framer Motion + Matter.js",
          }
        : {
            eyebrow: "✦ Contact",
            title: "Lets talk",
            description:
              "Do you have a project in mind or need a creative and technical profile? I am available for collaborations, freelance work, and professional opportunities.",
            copied: "✓ Copied",
            footer: "Design: Grain & Glow - React + Framer Motion + Matter.js",
          },
    [language]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText("carlosmartinezlasierra@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        id="contact"
        className="py-32 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.72 0.18 50 / 0.08) 0%, oklch(0.08 0.005 260) 60%)",
        }}
      >
        <div
          className="absolute right-0 top-0 select-none pointer-events-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "oklch(0.72 0.18 50 / 0.08)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          05
        </div>

        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mono-label mb-6 text-[var(--glow-orange)]">{copy.eyebrow}</p>
            <h2 className="display-title text-white mb-4" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              {copy.title}
              <span style={{ color: "var(--glow-orange)" }}>.</span>
            </h2>
            <p
              className="max-w-lg mx-auto text-white/40 leading-relaxed mb-12"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem" }}
            >
              {copy.description}
            </p>

            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-black font-semibold text-base transition-all duration-300 mb-12"
              style={{
                background: "var(--glow-orange)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 0 40px rgba(255, 107, 53, 0.3)",
              }}
            >
              {copied ? copy.copied : "carlosmartinezlasierra@gmail.com"}
              {!copied && <span className="opacity-60 text-sm">↗</span>}
            </motion.button>

            <div className="flex items-center justify-center gap-8 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mono-label hover:text-[var(--glow-orange)] hover:opacity-100 transition-all duration-200"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="mono-label text-white/20">© 2026 Carlos Martinez Lasierra</p>
          <p className="mono-label text-white/15">{copy.footer}</p>
        </div>
      </footer>
    </>
  );
}
