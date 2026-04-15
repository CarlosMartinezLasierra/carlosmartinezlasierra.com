import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = {
  es: [
    { value: "271K", label: "Suscriptores YouTube" },
    { value: "6+", label: "Anos de experiencia" },
    { value: "4", label: "Empresas internacionales" },
    { value: "2", label: "Anos en Fiverr" },
  ],
  en: [
    { value: "271K", label: "YouTube Subscribers" },
    { value: "6+", label: "Years of Experience" },
    { value: "4", label: "International Companies" },
    { value: "2", label: "Years on Fiverr" },
  ],
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const copy = useMemo(
    () =>
      language === "es"
        ? {
            eyebrow: "✦ Sobre mi",
            titleLine1: "Creativo,",
            titleAccent: "tecnico",
            connector: "y",
            titleLine3: "emprendedor.",
            paragraphs: [
              "Soy Carlos Martinez Lasierra, un profesional multidisciplinar con una motivacion clara por entender como se cruzan la tecnologia, la creatividad y el negocio. Mi experiencia se ha centrado en desarrollar proyectos digitales y de marca de forma integral, combinando estrategia, ejecucion y aprendizaje constante.",
              "En diciembre de 2024 funde ReodGlobe, mi propia marca de streetwear. Desde entonces he trabajado en la negociacion con proveedores de Portugal, Francia y China, en el desarrollo de la tienda online y en la gestion del marketing, las campanas de ads, el retargeting y el rebranding. Tambien he gestionado un canal de YouTube hasta alcanzar los 271.000 suscriptores en un ano, he desarrollado e-commerce completos con React, Hydrogen y Shopify, y he integrado la inteligencia artificial generativa en flujos de trabajo aplicados a marcas y clientes internacionales con herramientas como Kling AI, Flux.dev, Stable Diffusion, ComfyUI, Kohya SS y AI Toolkit, publicando workflows en Civitai.",
              "Mi paso por ESIC Business School y el bootcamp de ISDI Coders me dio una base academica util, pero la mayor parte de mi perfil se ha formado en el trabajo real, colaborando con agencias, marcas y clientes como freelance en Fiverr.",
            ],
            quote:
              '"Me encanta innovar y descubrir nuevos conocimientos continuamente, ya sea para agilizar procesos o mejorar la calidad de un producto."',
          }
        : {
            eyebrow: "✦ About Me",
            titleLine1: "Creative,",
            titleAccent: "technical",
            connector: "and",
            titleLine3: "entrepreneurial.",
            paragraphs: [
              "I am Carlos Martinez Lasierra, a multidisciplinary professional with a clear interest in how technology, creativity, and business intersect. My experience has focused on building digital and brand projects end to end, combining strategy, execution, and constant learning.",
              "In December 2024 I founded ReodGlobe, my own streetwear brand. Since then, I have worked on supplier negotiations across Portugal, France, and China, built the online store, and managed marketing, ad campaigns, retargeting, and rebranding. I have also grown a YouTube channel to 271,000 subscribers in one year, developed complete e-commerce projects with React, Hydrogen, and Shopify, and integrated generative AI into real workflows for brands and international clients using tools such as Kling AI, Flux.dev, Stable Diffusion, ComfyUI, Kohya SS, and AI Toolkit, publishing workflows on Civitai.",
              "My time at ESIC Business School and the ISDI Coders bootcamp gave me a useful academic foundation, but most of my profile has been shaped by real work with agencies, brands, and freelance clients on Fiverr.",
            ],
            quote:
              '"I enjoy innovating and continuously exploring new knowledge, whether it helps streamline processes or improve the quality of a product."',
          },
    [language]
  );

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div
        className="absolute right-0 top-0 select-none pointer-events-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(8rem, 20vw, 18rem)",
          color: "oklch(0.72 0.18 50 / 0.04)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        01
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mono-label mb-4 text-[var(--glow-orange)]">{copy.eyebrow}</p>
            <h2
              className="display-title text-white mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {copy.titleLine1}
              <br />
              <span style={{ color: "var(--glow-orange)" }}>{copy.titleAccent}</span> {copy.connector}
              <br />
              {copy.titleLine3}
            </h2>

            <div
              className="space-y-5 text-white/55 leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
              }}
            >
              <p>{copy.paragraphs[0]}</p>
              <p>{copy.paragraphs[1]}</p>
              <p>
                {language === "es" ? (
                  <>
                    Mi paso por <strong className="text-white/80">ESIC Business School</strong> y el
                    bootcamp de <strong className="text-white/80">ISDI Coders</strong> me dio una base
                    academica util, pero la mayor parte de mi perfil se ha formado
                    en el trabajo real, colaborando con agencias, marcas y clientes
                    como freelance en Fiverr.
                  </>
                ) : (
                  <>
                    My time at <strong className="text-white/80">ESIC Business School</strong> and the
                    <strong className="text-white/80"> ISDI Coders</strong> bootcamp gave me a useful
                    academic foundation, but most of my profile has been shaped by
                    real work with agencies, brands, and freelance clients on Fiverr.
                  </>
                )}
              </p>
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
              <span className="skill-pill text-[var(--glow-orange)] border-[var(--glow-orange)]/30 bg-[var(--glow-orange)]/5">
                ESIC Business School
              </span>
              <span className="skill-pill text-[var(--glow-blue)] border-[var(--glow-blue)]/30 bg-[var(--glow-blue)]/5">
                ISDI Coders - Full Stack
              </span>
              <span className="skill-pill text-[var(--glow-green)] border-[var(--glow-green)]/30 bg-[var(--glow-green)]/5">
                Fiverr Freelance
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-6 lg:mt-16"
          >
            {stats[language].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-[var(--glow-orange)]/30 hover:bg-[var(--glow-orange)]/5 transition-all duration-500 group"
              >
                <div
                  className="text-4xl font-bold text-white group-hover:text-[var(--glow-orange)] transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </div>
                <div className="mono-label mt-2 text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}

            <div className="col-span-2 p-6 rounded-2xl border border-[var(--glow-orange)]/20 bg-[var(--glow-orange)]/5 mt-2">
              <p
                className="text-white/60 italic leading-relaxed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                }}
              >
                {copy.quote}
              </p>
              <p className="mono-label mt-3 text-[var(--glow-orange)]">- Carlos Martinez Lasierra</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
