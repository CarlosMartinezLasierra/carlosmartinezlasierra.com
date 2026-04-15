/* Documents.tsx — Design: "Grain & Glow"
   Section showcasing PDF documents (plans, case studies) inline.
   PDFs render on dark canvas — no flat white background. */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PdfViewer from "./PdfViewer";

const REODGLOBE_PDF =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/reodglobe_mkandbussinesplan_b0671200.pdf";

const documents = [
  {
    id: "reodglobe-mk",
    title: "Plan de Marketing & Negocio",
    company: "ReodGlobe",
    year: "2024",
    color: "#FF6B35",
    tags: ["Marketing Digital", "Business Plan", "Streetwear", "Meta Ads"],
    description:
      "Plan de marketing y negocio completo para ReodGlobe, marca de ropa streetwear fundada en diciembre de 2024. Incluye análisis de mercado, estrategia de contenido, campañas de Meta Ads y proyecciones de negocio.",
    url: REODGLOBE_PDF,
    pages: "Documento completo",
  },
];

export default function Documents() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <section id="documents" className="py-32 relative overflow-hidden">
      {/* Section number decoration */}
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
        05
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mono-label mb-4 text-[var(--glow-orange)]">✦ Documentos</p>
          <h2
            className="display-title text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Planes &{" "}
            <span style={{ color: "var(--glow-orange)" }}>Estrategias</span>
          </h2>
          <p
            className="mt-4 max-w-lg text-white/40 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Documentos estratégicos reales elaborados para proyectos propios y
            clientes. Planes de marketing, business plans y estrategias de
            comunicación.
          </p>
        </motion.div>

        {/* Document cards */}
        <div className="space-y-6">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Card header — always visible */}
              <div
                className="rounded-2xl border overflow-hidden transition-all duration-500"
                style={{
                  borderColor:
                    activeDoc === doc.id
                      ? doc.color + "40"
                      : "rgba(255,255,255,0.06)",
                  background:
                    activeDoc === doc.id
                      ? doc.color + "06"
                      : "rgba(255,255,255,0.02)",
                }}
              >
                {/* Header row */}
                <button
                  className="w-full text-left p-6 group"
                  onClick={() =>
                    setActiveDoc(activeDoc === doc.id ? null : doc.id)
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Color dot */}
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            background: doc.color,
                            boxShadow: `0 0 10px ${doc.color}60`,
                          }}
                        />
                        <span
                          className="mono-label"
                          style={{ color: doc.color }}
                        >
                          {doc.company} — {doc.year}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-bold text-white mb-2 group-hover:transition-colors duration-300"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color:
                            activeDoc === doc.id ? doc.color : "white",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {doc.title}
                      </h3>

                      <p
                        className="text-white/40 text-sm leading-relaxed mb-4"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {doc.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="skill-pill text-xs"
                            style={{
                              color: doc.color,
                              borderColor: doc.color + "35",
                              background: doc.color + "0D",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Toggle button */}
                    <div
                      className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300"
                      style={{
                        borderColor:
                          activeDoc === doc.id
                            ? doc.color + "50"
                            : "rgba(255,255,255,0.08)",
                        background:
                          activeDoc === doc.id
                            ? doc.color + "15"
                            : "transparent",
                        color:
                          activeDoc === doc.id
                            ? doc.color
                            : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <span
                        className="text-xs"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {activeDoc === doc.id ? "CERRAR" : "VER DOCUMENTO"}
                      </span>
                      <span
                        className="text-sm transition-transform duration-300"
                        style={{
                          transform:
                            activeDoc === doc.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        ↓
                      </span>
                    </div>
                  </div>
                </button>

                {/* PDF Viewer — expands on click */}
                <AnimatePresence>
                  {activeDoc === doc.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-6 border-t border-white/5"
                        style={{ paddingTop: "1.5rem" }}
                      >
                        <PdfViewer url={doc.url} title={`${doc.company} — ${doc.title}`} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
