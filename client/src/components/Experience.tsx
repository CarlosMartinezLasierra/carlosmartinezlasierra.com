import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Experience() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();

  const experiences = useMemo(
    () =>
      language === "es"
        ? [
            {
              company: "ReodGlobe",
              role: "Fundador & CEO",
              period: "Dic. 2024 - Presente",
              color: "#FF6B35",
              tags: ["Emprendimiento", "Diseno", "Sourcing"],
              description:
                "Funde y gestione de forma integral ReodGlobe, una marca de ropa streetwear fundada en diciembre de 2024. Negocie con proveedores en Portugal, Francia y China. Disene la identidad visual completa, elabore tech packs en Adobe Illustrator y lidere la estrategia de marketing digital desde cero.",
            },
            {
              company: "Fiverr",
              role: "Freelance - IA, Diseno y Web",
              period: "2022 - 2024",
              color: "#4CAF50",
              tags: ["IA Generativa", "Diseno", "Desarrollo Web"],
              description:
                "Preste servicios internacionales especializados en generacion de imagenes con IA, diseno grafico y desarrollo web. Trabaje con clientes de varios paises y entregas sujetas a estandares altos de calidad.",
            },
            {
              company: "HistorIAs IA (YouTube)",
              role: "Content Creator & Manager",
              period: "2021 - 2022",
              color: "#2196F3",
              tags: ["YouTube", "Viralizacion", "Analytics"],
              description:
                "Gestione por completo el canal HistorIAs IA y lo lleve de 0 a 271.000 suscriptores en un ano. Implemente estrategias de viralizacion, hooks narrativos y analisis de metricas para optimizar cada publicacion.",
            },
            {
              company: "Reodglobe",
              role: "Marketing, Content Manager & Publicista",
              period: "2020 - 2021",
              color: "#FF9800",
              tags: ["Marketing", "Contenido", "Streetwear"],
              description:
                "Gestion integral del marketing y la comunicacion para esta marca de streetwear espanola. Planificacion de campanas, creacion de contenido digital y gestion de identidad de marca en un sector competitivo.",
            },
            {
              company: "Wow Effect",
              role: "Especialista IA Generativa & E-commerce",
              period: "2019 - 2020",
              color: "#7B2FBE",
              tags: ["IA Generativa", "LORA Training", "ControlNet", "E-commerce", "Workflows"],
              description:
                "Desarrolle soluciones de inteligencia artificial generativa para marcas y clientes de esta empresa alemana. Entrene modelos LORA sobre productos reales para generar imagenes de e-commerce de alta calidad de forma mas eficiente y cree workflows publicados en plataformas como Civitai.",
            },
            {
              company: "Piazza Com",
              role: "Comunicacion Corporativa",
              period: "2017 - 2019",
              color: "#00BCD4",
              tags: ["Comunicacion", "PR", "Agencia"],
              description:
                "Desarrolle estrategias de comunicacion, relaciones publicas y campanas para distintas marcas en esta agencia. Fueron dos anos de experiencia en entorno de agencia.",
            },
          ]
        : [
            {
              company: "ReodGlobe",
              role: "Founder & CEO",
              period: "Dec. 2024 - Present",
              color: "#FF6B35",
              tags: ["Entrepreneurship", "Design", "Sourcing"],
              description:
                "I founded and managed ReodGlobe end to end, a streetwear brand launched in December 2024. I negotiated with suppliers in Portugal, France, and China, built the full visual identity, prepared tech packs in Adobe Illustrator, and led the digital marketing strategy from scratch.",
            },
            {
              company: "Fiverr",
              role: "Freelance - AI, Design & Web",
              period: "2022 - 2024",
              color: "#4CAF50",
              tags: ["Generative AI", "Design", "Web Development"],
              description:
                "I provided international services focused on AI image generation, graphic design, and web development. I worked with clients from multiple countries and delivered under demanding quality standards.",
            },
            {
              company: "HistorIAs IA (YouTube)",
              role: "Content Creator & Manager",
              period: "2021 - 2022",
              color: "#2196F3",
              tags: ["YouTube", "Virality", "Analytics"],
              description:
                "I managed the HistorIAs IA channel from end to end and grew it from 0 to 271,000 subscribers in one year. I implemented viral growth strategies, narrative hooks, and metric analysis to optimize every upload.",
            },
            {
              company: "Reodglobe",
              role: "Marketing, Content Manager & Advertising",
              period: "2020 - 2021",
              color: "#FF9800",
              tags: ["Marketing", "Content", "Streetwear"],
              description:
                "I handled marketing and communication for this Spanish streetwear brand, including campaign planning, digital content creation, and brand identity management in a competitive niche.",
            },
            {
              company: "Wow Effect",
              role: "Generative AI & E-commerce Specialist",
              period: "2019 - 2020",
              color: "#7B2FBE",
              tags: ["Generative AI", "LORA Training", "ControlNet", "E-commerce", "Workflows"],
              description:
                "I built generative AI solutions for brands and clients at this German company. I trained LORA models on real products to produce high-quality e-commerce visuals more efficiently and created workflows later published on platforms such as Civitai.",
            },
            {
              company: "Piazza Com",
              role: "Corporate Communications",
              period: "2017 - 2019",
              color: "#00BCD4",
              tags: ["Communications", "PR", "Agency"],
              description:
                "I worked on communication strategies, public relations, and campaigns for several brands in this agency setting. It gave me two years of hands-on agency experience.",
            },
          ],
    [language]
  );

  const copy =
    language === "es"
      ? {
          eyebrow: "✦ Trayectoria",
          titleMain: "Experiencia",
          titleAccent: "profesional",
        }
      : {
          eyebrow: "✦ Journey",
          titleMain: "Professional",
          titleAccent: "experience",
        };

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div
        className="absolute left-0 top-0 select-none pointer-events-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(8rem, 20vw, 18rem)",
          color: "oklch(0.72 0.18 50 / 0.04)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        02
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mono-label mb-4 text-[var(--glow-orange)]">{copy.eyebrow}</p>
          <h2 className="display-title text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {copy.titleMain}
            <br />
            <span style={{ color: "var(--glow-orange)" }}>{copy.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <div className="lg:col-span-2 space-y-1">
            {experiences.map((exp, i) => (
              <motion.button
                key={exp.company + exp.period}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  active === i
                    ? "bg-white/6 border border-white/10"
                    : "hover:bg-white/3 border border-transparent"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ background: exp.color }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="font-semibold text-sm transition-colors duration-300"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: active === i ? exp.color : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {exp.company}
                    </p>
                    <p className="text-xs text-white/35 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {exp.role}
                    </p>
                  </div>
                  <span className="mono-label text-white/25 shrink-0 ml-4" style={{ fontSize: "0.6rem" }}>
                    {exp.period}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-8 rounded-2xl border border-white/8 bg-white/3 h-full"
                style={{ borderColor: experiences[active].color + "30" }}
              >
                <div
                  className="w-3 h-3 rounded-full mb-6"
                  style={{
                    background: experiences[active].color,
                    boxShadow: `0 0 20px ${experiences[active].color}80`,
                  }}
                />

                <p className="mono-label text-white/30 mb-2">{experiences[active].period}</p>
                <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {experiences[active].company}
                </h3>
                <p
                  className="mb-6"
                  style={{
                    color: experiences[active].color,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.8rem",
                  }}
                >
                  {experiences[active].role}
                </p>

                <p
                  className="text-white/55 leading-relaxed mb-8"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.95rem",
                  }}
                >
                  {experiences[active].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experiences[active].tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-pill"
                      style={{
                        color: experiences[active].color,
                        borderColor: experiences[active].color + "40",
                        background: experiences[active].color + "10",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
