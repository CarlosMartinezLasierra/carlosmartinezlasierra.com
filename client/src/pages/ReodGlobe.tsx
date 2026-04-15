/* ============================================================
   ReodGlobe.tsx — Caso completo: ReodGlobe Marca Streetwear
   Design: Grain & Glow — dark, scroll-driven narrative
   Sections: Intro → Plan de Marketing → Identidad Visual →
             Tech Packs → IA Generativa → E-commerce → CTA
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/";

// ─── Assets ──────────────────────────────────────────────────────────────────
const LOGO        = CDN + "_logo_REODGLOBE_7399654f.webp";
const HERO_IMG    = CDN + "reodglobe-clean_e717466b.png";
const PRODUCTS    = CDN + "reodglobe-products-clean_bce358d8.png";
const PDF_URL     = CDN + "reodglobe_mkandbussinesplan_b0671200.pdf";

const TP_TSHIRT   = CDN + "tp_tshirt_47ff5a25.png";
const TP_LONG     = CDN + "tp_longsleeve_375c1f4c.png";
const TP_HOODIE   = CDN + "tp_hoodie_cb65fb3a.png";
const TP_HAT      = CDN + "tp_hat_c880e64d.png";
const HAT_PRODUCT = "/reodglobe-hat-product.jpg";
const HAT_RESULT_1 = "/reodglobe-hat-result-1.jpg";
const HAT_RESULT_2 = "/reodglobe-hat-result-2.jpg";

// AI pairs
const AI_PAIRS = [
  {
    label: "Longsleeve Black",
    flat: CDN + "IMG_6057_0fa76836.webp",
    results: [CDN + "mychaosisart_blacktshirt_b57d7d52.jpg", CDN + "mychaosisart_blacktshirt2_8c0b76a3.jpg"],
  },
  {
    label: "Hoodie — Acid Cocoa",
    flat: CDN + "I_want_you_2k_202602152311_94ac662b.jpg",
    results: [CDN + "acidcocoa_hoodie_e8d1a878.webp", CDN + "acidcocoa_hoodie2_7085aaf8.jpg"],
  },
  {
    label: "Hoodie — Uranium Acid",
    flat: CDN + "I_want_you_2k_202602152320_89c6b7be.jpg",
    results: [CDN + "uraniumacid_hoodie_a0b08ec5.webp"],
  },
  {
    label: "Tee — Not Labeled White",
    flat: CDN + "Tabletop_photography_of_2k_202602170005_04693124.jpg",
    results: [CDN + "notlabeled_white_dcda140f.jpg", CDN + "notlabeled_white2_0ee72c04.jpg"],
  },
  {
    label: "5-Panel Hat — StarSmoked",
    flat: HAT_PRODUCT,
    results: [HAT_RESULT_1, HAT_RESULT_2],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" as never });
  return { ref, inView };
}

function SectionLabel({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}60, transparent)` }} />
      <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${color}60, transparent)` }} />
    </div>
  );
}

function DashedArrow({ color }: { color: string }) {
  const { ref, inView } = useReveal();
  return (
    <div ref={ref} className="flex flex-col items-center my-2" style={{ height: 80 }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originY: 0 }}
        className="flex flex-col items-center gap-1"
      >
        <div
          className="w-px"
          style={{
            height: 52,
            backgroundImage: `repeating-linear-gradient(to bottom, ${color}80 0px, ${color}80 6px, transparent 6px, transparent 12px)`,
          }}
        />
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 10L0 0H14L7 10Z" fill={color + "cc"} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Section: Plan de Marketing ───────────────────────────────────────────────
function MarketingPlanSection() {
  const { ref, inView } = useReveal();
  const [pdfOpen, setPdfOpen] = useState(false);

  const pillars = [
    { icon: "◈", label: "Meta Ads", desc: "Campañas frías, templadas y calientes. Embudo completo con ROAS optimizado.", color: "#2196F3" },
    { icon: "◉", label: "Community Mgmt", desc: "Gestión diaria de Instagram. Hooks, reels, stories y análisis de algoritmo.", color: "#FF6B35" },
    { icon: "◆", label: "Análisis DAFO", desc: "Benchmarking de competidores, análisis de mercado y posicionamiento de marca.", color: "#7B2FBE" },
    { icon: "◎", label: "Estrategia de Drops", desc: "Lanzamientos limitados para generar escasez y urgencia de compra.", color: "#4CAF50" },
    { icon: "◇", label: "Influencer Seeding", desc: "Envío de producto a perfiles afines para generar contenido orgánico.", color: "#E63946" },
    { icon: "◐", label: "Email Marketing", desc: "Newsletter y lista de drops con popup animado en la tienda.", color: "#00BCD4" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <SectionLabel color="#FF6B35" label="Plan de Marketing" />
      <div
        className="rounded-2xl p-6 md:p-8 mb-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,107,53,0.2)",
          boxShadow: "0 0 40px rgba(255,107,53,0.06)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
          ◈ Estrategia de crecimiento
        </h3>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
          ReodGlobe nació sin presupuesto de marketing externo. La estrategia se basó en construir una comunidad orgánica primero, y escalar con paid media una vez validado el producto. El plan de marketing y negocio completo está disponible para consulta.
        </p>

        {/* Pillars grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="rounded-xl p-4"
              style={{ background: p.color + "10", border: `1px solid ${p.color}25` }}
            >
              <div className="text-lg mb-1" style={{ color: p.color }}>{p.icon}</div>
              <div className="text-white text-sm font-bold mb-1">{p.label}</div>
              <div className="text-white/40 text-xs leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* PDF CTA */}
        <button
          onClick={() => setPdfOpen(true)}
          className="w-full py-4 rounded-xl font-bold text-sm tracking-wider transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,107,53,0.1))",
            border: "1px solid rgba(255,107,53,0.4)",
            color: "#FF6B35",
          }}
        >
          Ver Plan de Marketing & Negocio completo →
        </button>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {pdfOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-white font-bold text-sm">Plan de Marketing — ReodGlobe</span>
              <button onClick={() => setPdfOpen(false)} className="text-white/50 hover:text-white text-xl transition-colors">✕</button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={PDF_URL + "#toolbar=0"}
                className="w-full h-full"
                title="Plan de Marketing ReodGlobe"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section: Identidad Visual ────────────────────────────────────────────────
function IdentidadVisualSection() {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <SectionLabel color="#E63946" label="Identidad Visual" />
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(230,57,70,0.2)",
          boxShadow: "0 0 40px rgba(230,57,70,0.06)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              ◉ Marca desde cero
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
              Diseñé la identidad visual completa de ReodGlobe: logotipo, paleta de colores, tipografía, iconografía y sistema de aplicación en producto. Todo en Adobe Illustrator, preparado para producción.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Adobe Illustrator", "Logotipo", "Paleta", "Tipografía", "Brand Guidelines"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(230,57,70,0.12)", border: "1px solid rgba(230,57,70,0.25)", color: "#E63946" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-56">
            <div className="rounded-xl overflow-hidden bg-white/5 p-4 flex items-center justify-center" style={{ border: "1px solid rgba(230,57,70,0.2)" }}>
              <img src={LOGO} alt="ReodGlobe Logo" className="w-full max-h-28 object-contain" />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(230,57,70,0.2)" }}>
              <img src={HERO_IMG} alt="ReodGlobe Hero" className="w-full object-cover" style={{ maxHeight: 120 }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section: Tech Packs ──────────────────────────────────────────────────────
function TechPacksSection() {
  const { ref, inView } = useReveal();
  const techPacks = [
    { label: "Camiseta Oversize — Not Labeled", desc: "Algodón orgánico 230 GSM · Unisex · Double needle", img: TP_TSHIRT },
    { label: "Manga Larga — My Chaos Is Art", desc: "230 GSM · Drop shoulder · Screen print frontal y trasero", img: TP_LONG },
    { label: "Sudadera Zip-Up — Acid Wash", desc: "350 GSM · Acid wash · Kangaroo pocket · Estrellas bordadas", img: TP_HOODIE },
    { label: "Gorra 5-Panel — StarSmoked", desc: "100% algodón · Cierre de cuero · Logo bordado", img: TP_HAT },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <SectionLabel color="#7B2FBE" label="Tech Packs" />
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(123,47,190,0.2)",
          boxShadow: "0 0 40px rgba(123,47,190,0.06)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
          ◆ Fichas técnicas de producto
        </h3>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
          Elaboré los tech packs completos de cada prenda en Adobe Illustrator: especificaciones de materiales, medidas, costuras, estampados y etiquetado. Documentos listos para enviar a proveedores en Portugal, Francia y China.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {techPacks.map((tp) => (
            <div
              key={tp.label}
              className="rounded-xl overflow-hidden"
              style={{ background: "rgba(123,47,190,0.08)", border: "1px solid rgba(123,47,190,0.2)" }}
            >
              <div className="bg-white/5 p-3 flex items-center justify-center" style={{ height: 100 }}>
                <img src={tp.img} alt={tp.label} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-3">
                <div className="text-white text-xs font-bold leading-tight mb-1">{tp.label}</div>
                <div className="text-white/40 text-[10px] leading-relaxed">{tp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section: IA Generativa ───────────────────────────────────────────────────
function IAGenerativaSection() {
  const { ref, inView } = useReveal();
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-auto"
      >
        <SectionLabel color="#4CAF50" label="IA Generativa — Contenido de Producto" />
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(76,175,80,0.2)",
            boxShadow: "0 0 40px rgba(76,175,80,0.06)",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            ◎ Producto plano → Editorial con IA
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
            Usando modelos LORA entrenados con las prendas de ReodGlobe, generé imágenes editoriales de alta calidad a partir de fotografías planas del producto. Cada par muestra el producto original y el resultado generado con IA.
          </p>

          {/* AI pairs */}
          <div className="flex flex-col gap-4">
            {AI_PAIRS.map((pair, i) => (
              <motion.div
                key={pair.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl overflow-hidden"
                style={{ background: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.15)" }}
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <span className="text-white/70 text-xs font-bold">{pair.label}</span>
                </div>
                <div className="flex items-center gap-3 p-3 overflow-x-auto">
                  {/* Flat */}
                  <div
                    className="flex-shrink-0 rounded-lg overflow-hidden cursor-zoom-in"
                    style={{ width: 100, height: 100, border: "1px solid rgba(255,255,255,0.1)" }}
                    onClick={() => setLightbox({ images: [pair.flat, ...pair.results], index: 0 })}
                  >
                    <img src={pair.flat} alt="Producto" className="w-full h-full object-cover" />
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="text-[10px] text-white/30 font-mono">IA</div>
                    <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                      <path d="M0 6H28M28 6L22 1M28 6L22 11" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Results */}
                  {pair.results.map((r, ri) => (
                    <div
                      key={ri}
                      className="flex-shrink-0 rounded-lg overflow-hidden cursor-zoom-in"
                      style={{ width: 100, height: 100, border: "1px solid rgba(76,175,80,0.3)" }}
                      onClick={() => setLightbox({ images: [pair.flat, ...pair.results], index: ri + 1 })}
                    >
                      <img src={r} alt={`Resultado ${ri + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-6 text-white/50 hover:text-white text-2xl" onClick={() => setLightbox(null)}>✕</button>
            <div className="relative flex items-center gap-4 px-12" onClick={(e) => e.stopPropagation()}>
              {lightbox.index > 0 && (
                <button className="text-white/40 hover:text-white text-3xl" onClick={() => setLightbox((l) => l ? { ...l, index: l.index - 1 } : null)}>‹</button>
              )}
              <img
                src={lightbox.images[lightbox.index]}
                alt=""
                className="max-h-[85vh] max-w-[80vw] rounded-xl object-contain"
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.6)" }}
              />
              {lightbox.index < lightbox.images.length - 1 && (
                <button className="text-white/40 hover:text-white text-3xl" onClick={() => setLightbox((l) => l ? { ...l, index: l.index + 1 } : null)}>›</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section: E-commerce ─────────────────────────────────────────────────────
function EcommerceSection() {
  const { ref, inView } = useReveal();
  const features = [
    { label: "Hydrogen (React SSR)", desc: "Streaming SSR para máxima performance con Shopify" },
    { label: "Meta Pixel + CAPI", desc: "Tracking server-side para máxima precisión de datos" },
    { label: "Cookie Consent RGPD", desc: "Banner con aceptación granular de cookies" },
    { label: "SEO Avanzado", desc: "Structured data, sitemap, meta tags dinámicos" },
    { label: "Newsletter + Drop List", desc: "Captura de leads con popup animado" },
    { label: "Carrito deslizante", desc: "Drawer cart con animaciones de transición" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <SectionLabel color="#2196F3" label="E-commerce — Hydrogen + Shopify" />
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(33,150,243,0.2)",
          boxShadow: "0 0 40px rgba(33,150,243,0.06)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              ◐ Tienda online completa
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
              Desarrollé reodglobe.es con Hydrogen (React + Shopify), incluyendo todas las funcionalidades necesarias para un e-commerce de moda streetwear de alto rendimiento.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 py-2 border-b border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#2196F3" }} />
                  <div>
                    <span className="text-white text-sm font-medium">{f.label}</span>
                    <span className="text-white/40 text-xs ml-2">— {f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.reodglobe.es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "rgba(33,150,243,0.15)", border: "1px solid rgba(33,150,243,0.35)", color: "#2196F3" }}
            >
              Ver reodglobe.es ↗
            </a>
          </div>
          <div className="flex-shrink-0 w-full md:w-52 flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(33,150,243,0.2)" }}>
              <img src={HERO_IMG} alt="ReodGlobe web" className="w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(33,150,243,0.2)" }}>
              <img src={PRODUCTS} alt="Productos ReodGlobe" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── End CTA ─────────────────────────────────────────────────────────────────
function EndCTA() {
  const { language } = useLanguage();
  const { ref, inView } = useReveal();
  const copy = useMemo(
    () =>
      language === "es"
        ? {
            title: "Caso completo",
            description:
              "De la idea al producto fisico, la tienda online y el contenido generado con IA — todo construido desde cero.",
            back: "← Volver al portfolio",
            visit: "Ver reodglobe.es ↗",
          }
        : {
            title: "Full case study",
            description:
              "From the initial idea to the physical product, online store, and AI-generated content — all built from scratch.",
            back: "← Back to portfolio",
            visit: "Visit reodglobe.es ↗",
          },
    [language]
  );
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-20 px-6"
    >
      <div className="text-5xl mb-6">✦</div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
        {copy.title}
      </h2>
      <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
        {copy.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-bold text-sm tracking-wider"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #E63946)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(255,107,53,0.3)",
            }}
          >
            {copy.back}
          </motion.button>
        </Link>
        <a href="https://www.reodglobe.es" target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-bold text-sm tracking-wider"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {copy.visit}
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ReodGlobePage() {
  const { language } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { component: <MarketingPlanSection />, nextColor: "#E63946" },
    { component: <IdentidadVisualSection />, nextColor: "#7B2FBE" },
    { component: <TechPacksSection />, nextColor: "#4CAF50" },
    { component: <IAGenerativaSection />, nextColor: "#2196F3" },
    { component: <EcommerceSection />, nextColor: null },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.12) 0%, transparent 60%), #0a0a0a",
      }}
    >
      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/">
          <span className="text-white/40 hover:text-white transition-colors text-sm font-mono cursor-pointer">
            ← CML.
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">ReodGlobe</span>
        </div>
      </nav>

      {/* Hero header */}
      <div className="relative z-10 pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", color: "#FF6B35" }}
          >
            {language === "es" ? "✦ CASO COMPLETO" : "✦ FULL CASE STUDY"}
          </div>
          <div className="flex justify-center mb-6">
            <img src={LOGO} alt="ReodGlobe" className="h-16 object-contain" style={{ filter: "brightness(1.1)" }} />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-4">
            ReodGlobe<br />
            <span style={{ color: "#FF6B35" }}>Marca Streetwear</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            {language === "es"
              ? "Fundación y gestión integral de una marca de moda streetwear: desde la identidad visual y los tech packs hasta el e-commerce, la estrategia de marketing y el contenido generado con IA."
              : "End-to-end creation and management of a streetwear brand: from visual identity and tech packs to e-commerce, marketing strategy, and AI-generated content."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Dic. 2024 — Presente", "Fundador & CEO", "Streetwear", "España"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-xs tracking-widest uppercase font-mono">
            {language === "es" ? "Scroll para explorar" : "Scroll to explore"}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(255,107,53,0.6), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Sections with arrows */}
      <div className="relative z-10 px-4 md:px-6 pb-8">
        {sections.map((s, i) => (
          <div key={i}>
            {s.component}
            {s.nextColor && <DashedArrow color={s.nextColor} />}
          </div>
        ))}
      </div>

      {/* End CTA */}
      <div className="relative z-10">
        <EndCTA />
      </div>
    </div>
  );
}
