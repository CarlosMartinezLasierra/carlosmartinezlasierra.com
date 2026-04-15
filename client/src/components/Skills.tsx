import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Skills() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();

  const categories = useMemo(
    () =>
      language === "es"
        ? [
            {
              id: "marketing",
              label: "Marketing Digital",
              color: "#E63946",
              icon: "◈",
              skills: [
                "Meta Ads",
                "Campanas de Trafico y Conversion",
                "Community Management",
                "Analisis de algoritmos en Instagram",
                "Hooks para viralizacion",
                "Marketing global y digital",
                "Analisis DAFO",
                "Benchmarking de competidores",
                "Planificacion de presupuestos",
                "Estrategia de comunicacion",
              ],
            },
            {
              id: "ai",
              label: "IA Generativa",
              color: "#7B2FBE",
              icon: "◉",
              skills: [
                "Entrenamiento de modelos LORA",
                "ControlNet",
                "Stable Diffusion",
                "Nano Banana 2 y Nano Banana Pro",
                "Clean AI",
                "Imagenes e-commerce con IA",
                "Modelos de personajes y estilos",
                "Flat background y silueteado",
                "Workflows publicados en Civitai",
                "Herramientas de video con IA",
                "Integracion de IA en flujos reales",
                "Contenido visual para marca",
              ],
            },
            {
              id: "webdev",
              label: "Desarrollo Web",
              color: "#2196F3",
              icon: "◇",
              skills: [
                "React / TypeScript",
                "Hydrogen (Shopify)",
                "Full Stack Development",
                "E-commerce a medida",
                "Tailwind CSS",
                "Node.js",
                "REST APIs",
                "Vite / Webpack",
              ],
            },
            {
              id: "design",
              label: "Diseno Grafico",
              color: "#00BCD4",
              icon: "◎",
              skills: [
                "Adobe Illustrator",
                "Adobe Photoshop",
                "Tech packs para produccion textil",
                "Identidad visual de marca",
                "Diseno de logotipos",
                "Diseno de producto",
              ],
            },
            {
              id: "content",
              label: "Creacion de Contenido",
              color: "#4CAF50",
              icon: "◆",
              skills: [
                "YouTube (271K suscriptores)",
                "Estrategias de viralizacion",
                "Retencion de audiencia",
                "Analisis de metricas YouTube",
                "Hooks narrativos",
                "Produccion de video",
                "Instagram content strategy",
              ],
            },
            {
              id: "business",
              label: "Negocio y Emprendimiento",
              color: "#FF6B35",
              icon: "◐",
              skills: [
                "Fundacion de empresa",
                "Negociacion internacional",
                "Sourcing de proveedores",
                "Analisis de competidores",
                "Gestion de muestras",
                "Gestion de proyectos",
                "Fiverr Freelance (2 anos)",
              ],
            },
          ]
        : [
            {
              id: "marketing",
              label: "Digital Marketing",
              color: "#E63946",
              icon: "◈",
              skills: [
                "Meta Ads",
                "Traffic and conversion campaigns",
                "Community Management",
                "Instagram algorithm analysis",
                "Hooks for virality",
                "Global digital marketing",
                "SWOT analysis",
                "Competitor benchmarking",
                "Budget planning",
                "Communication strategy",
              ],
            },
            {
              id: "ai",
              label: "Generative AI",
              color: "#7B2FBE",
              icon: "◉",
              skills: [
                "LORA model training",
                "ControlNet",
                "Stable Diffusion",
                "Nano Banana 2 and Nano Banana Pro",
                "Clean AI",
                "AI e-commerce imagery",
                "Character and style models",
                "Flat background and cutout workflows",
                "Workflows published on Civitai",
                "AI video tools",
                "AI integrated into real workflows",
                "Brand visual content generation",
              ],
            },
            {
              id: "webdev",
              label: "Web Development",
              color: "#2196F3",
              icon: "◇",
              skills: [
                "React / TypeScript",
                "Hydrogen (Shopify)",
                "Full Stack Development",
                "Custom e-commerce builds",
                "Tailwind CSS",
                "Node.js",
                "REST APIs",
                "Vite / Webpack",
              ],
            },
            {
              id: "design",
              label: "Graphic Design",
              color: "#00BCD4",
              icon: "◎",
              skills: [
                "Adobe Illustrator",
                "Adobe Photoshop",
                "Tech packs for apparel production",
                "Brand visual identity",
                "Logo design",
                "Product design",
              ],
            },
            {
              id: "content",
              label: "Content Creation",
              color: "#4CAF50",
              icon: "◆",
              skills: [
                "YouTube (271K subscribers)",
                "Viral growth strategies",
                "Audience retention",
                "YouTube metrics analysis",
                "Narrative hooks",
                "Video production",
                "Instagram content strategy",
              ],
            },
            {
              id: "business",
              label: "Business & Entrepreneurship",
              color: "#FF6B35",
              icon: "◐",
              skills: [
                "Company founding",
                "International negotiation",
                "Supplier sourcing",
                "Competitor analysis",
                "Sample management",
                "Project management",
                "Fiverr Freelance (2 years)",
              ],
            },
          ],
    [language]
  );

  const copy =
    language === "es"
      ? { eyebrow: "✦ Competencias", title: "Skills &", accent: "Expertise" }
      : { eyebrow: "✦ Capabilities", title: "Skills &", accent: "Expertise" };

  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse at 60% 50%, ${categories[active].color}12 0%, oklch(0.08 0.005 260) 65%)`,
      }}
    >
      <div
        className="absolute right-0 top-0 select-none pointer-events-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(8rem, 20vw, 18rem)",
          color: categories[active].color + "06",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          transition: "color 0.7s ease",
        }}
      >
        03
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="mono-label mb-4"
            style={{ color: categories[active].color, transition: "color 0.5s ease" }}
          >
            {copy.eyebrow}
          </p>
          <h2 className="display-title text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {copy.title}{" "}
            <span style={{ color: categories[active].color, transition: "color 0.5s ease" }}>
              {copy.accent}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-1">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-400 group relative overflow-hidden ${
                  active === i ? "border border-white/10" : "hover:bg-white/3 border border-transparent"
                }`}
                style={{
                  background: active === i ? cat.color + "12" : undefined,
                  borderColor: active === i ? cat.color + "30" : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-lg transition-all duration-300"
                    style={{ color: active === i ? cat.color : "rgba(255,255,255,0.2)" }}
                  >
                    {cat.icon}
                  </span>
                  <span
                    className="font-semibold text-sm transition-colors duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: active === i ? cat.color : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {cat.label}
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
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 rounded-2xl border bg-white/3"
                style={{ borderColor: categories[active].color + "25" }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl" style={{ color: categories[active].color }}>
                    {categories[active].icon}
                  </span>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: categories[active].color }}
                  >
                    {categories[active].label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {categories[active].skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="skill-pill"
                      style={{
                        color: categories[active].color,
                        borderColor: categories[active].color + "35",
                        background: categories[active].color + "0D",
                      }}
                    >
                      {skill}
                    </motion.span>
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
