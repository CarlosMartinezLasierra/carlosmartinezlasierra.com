/* ============================================================
   WorkflowIA.tsx — Caso completo: Workflows IA para E-commerce
   Design: Grain & Glow — dark, scroll-driven narrative
   Each step enters from below with staggered animations.
   Dashed arrow connectors guide the eye downward.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/";

// ─── Assets ──────────────────────────────────────────────────────────────────
const DATASET_GIF = CDN + "dataset-spin_918674fe.gif";
const CAPTION_IMG = CDN + "Capturadepantalla2026-03-12171225_dbb4b1e5.png";
const COMFYUI_IMG = CDN + "example_comfyUIworkflow_11e9683a.png";
const RESULT_1    = CDN + "img_workflow_final(1)_9e29aea1.webp";
const RESULT_2    = CDN + "img_workflow_final(2)_3b1c369a.webp";
const RESULT_3    = CDN + "img_workflow_final(3)_8224ee73.webp";
const FINAL_VIDEO = CDN + "video_resultado_opt_9130ce78.mp4";

// ─── Step data ───────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    label: "RECOPILACIÓN",
    title: "Dataset de imágenes",
    color: "#7B2FBE",
    icon: "◈",
    description:
      "Se recopilan entre 15 y 72 fotografías de alta calidad del producto desde todos los ángulos posibles. La variedad de poses, fondos y encuadres es clave para que el modelo aprenda a generalizar correctamente.",
    media: { type: "gif" as const, src: DATASET_GIF, caption: "Dataset" },
    note: null,
  },
  {
    number: "02",
    label: "CAPTIONING",
    title: "Etiquetado con IA",
    color: "#2196F3",
    icon: "◉",
    description:
      "Cada imagen recibe un caption descriptivo en lenguaje natural. Estos textos enseñan a la IA qué es cada elemento: el tipo de prenda, el color, la postura, el fondo. El trigger word (ej. bl4ck_dress_ZQS) se incluye en todos los captions para que el modelo lo asocie con el producto.",
    media: { type: "image" as const, src: CAPTION_IMG, caption: "Interfaz de captioning — etiquetas por imagen" },
    note: "💡 Cuanto más precisos sean los captions, más fiel será el modelo al producto real.",
  },
  {
    number: "03",
    label: "ENTRENAMIENTO",
    title: "LORA con Kohya SS / AI-Toolkit",
    color: "#E63946",
    icon: "◆",
    description:
      "Con el dataset etiquetado se inicia el entrenamiento del modelo LORA. Se configuran parámetros como learning rate, número de pasos, resolución y network rank. El proceso requiere una GPU potente (mínimo RTX 3080) y conocimientos de Python y configuración de parámetros.",
    media: null,
    note: "⚡ Requiere PC con GPU de alto rendimiento y conocimientos de programación.",
    specs: [
      { label: "Herramientas", value: "Kohya SS · AI-Toolkit · Python" },
      { label: "Hardware", value: "GPU RTX 4090 / 24GB RAM" },
      { label: "Tiempo", value: "Entre 4 y 7 horas de entrenamiento" },
      { label: "Resultado", value: "Archivo .safetensors (modelo LORA)" },
    ],
  },
  {
    number: "04",
    label: "GENERACIÓN",
    title: "ComfyUI + modelo LORA",
    color: "#00BCD4",
    icon: "◇",
    description:
      "El modelo LORA entrenado se carga en ComfyUI. Al escribir el trigger word en el prompt (ej. \"bl4ck_dress_ZQS, editorial fashion, studio lighting\"), la IA genera imágenes del producto en cualquier escenario imaginado, manteniendo la fidelidad al diseño original.",
    media: { type: "image" as const, src: COMFYUI_IMG, caption: "Workflow en ComfyUI — 4 generaciones del vestido negro" },
    note: null,
  },
  {
    number: "05",
    label: "REFINAMIENTO",
    title: "Upscaling · AI Editor · Photoshop",
    color: "#4CAF50",
    icon: "◎",
    description:
      "Las mejores generaciones se refinan con herramientas de upscaling (Nano Banana Pro, Nano Banana 2), edición con IA y retoque manual en Photoshop. El resultado son imágenes de calidad editorial, listas para e-commerce o campañas de marketing.",
    media: {
      type: "gallery" as const,
      images: [RESULT_1, RESULT_2, RESULT_3],
      caption: "Resultados finales tras refinamiento con IA + Photoshop",
    },
    note: null,
  },
  {
    number: "06",
    label: "ANIMACIÓN",
    title: "Kling AI — Imagen a vídeo",
    color: "#FF6B35",
    icon: "◐",
    description:
      "Como paso final, las imágenes refinadas se animan con Kling AI para generar clips de vídeo de 3-5 segundos. Esto permite crear contenido dinámico para redes sociales, stories y campañas de Meta Ads con un aspecto completamente profesional.",
    media: { type: "video" as const, src: FINAL_VIDEO, caption: "Resultado final animado con Kling AI" },
    note: null,
  },
];

// ─── Animated dashed arrow ───────────────────────────────────────────────────
function DashedArrow({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="flex flex-col items-center my-2" style={{ height: 80 }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originY: 0 }}
        className="flex flex-col items-center gap-1"
      >
        {/* Dashed line */}
        <div
          className="w-px"
          style={{
            height: 52,
            backgroundImage: `repeating-linear-gradient(to bottom, ${color}80 0px, ${color}80 6px, transparent 6px, transparent 12px)`,
          }}
        />
        {/* Arrowhead */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 10L0 0H14L7 10Z" fill={color + "cc"} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Step card ───────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="relative w-full max-w-3xl mx-auto"
      >
        {/* Step number badge */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-mono"
            style={{ background: step.color + "22", border: `1.5px solid ${step.color}55`, color: step.color }}
          >
            {step.number}
          </div>
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: step.color }}
          >
            {step.label}
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${step.color}30`,
            boxShadow: `0 0 40px ${step.color}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          <div className={`flex flex-col ${step.media ? (isEven ? "md:flex-row" : "md:flex-row-reverse") : ""} gap-6`}>
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                {step.icon} {step.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base mb-4">
                {step.description}
              </p>

              {/* Specs table */}
              {step.specs && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {step.specs.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg p-3"
                      style={{ background: step.color + "12", border: `1px solid ${step.color}25` }}
                    >
                      <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: step.color }}>
                        {s.label}
                      </div>
                      <div className="text-white/80 text-xs font-medium">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Note */}
              {step.note && (
                <div
                  className="mt-4 rounded-lg px-4 py-3 text-sm"
                  style={{ background: step.color + "15", border: `1px solid ${step.color}30`, color: step.color }}
                >
                  {step.note}
                </div>
              )}
            </div>

            {/* Media */}
            {step.media && (
              <div className="flex-shrink-0 w-full md:w-64 lg:w-80">
                {step.media.type === "gif" && (
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${step.color}30` }}>
                    <img src={step.media.src} alt={step.media.caption} className="w-full object-cover" />
                    <div className="px-3 py-2 text-center text-[11px] text-white/40">{step.media.caption}</div>
                  </div>
                )}
                {step.media.type === "image" && (
                  <div
                    className="rounded-xl overflow-hidden cursor-zoom-in"
                    style={{ border: `1px solid ${step.color}30` }}
                    onClick={() => setLightbox(0)}
                  >
                    <img src={step.media.src} alt={step.media.caption} className="w-full object-cover" />
                    <div className="px-3 py-2 text-center text-[11px] text-white/40">{step.media.caption}</div>
                  </div>
                )}
                {step.media.type === "video" && (
                  <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${step.color}30` }}>
                    <video
                      src={step.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full object-cover"
                    />
                    <div className="px-3 py-2 text-center text-[11px] text-white/40">{step.media.caption}</div>
                  </div>
                )}
                {step.media.type === "gallery" && (
                  <div className="flex flex-col gap-2">
                    {step.media.images.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden cursor-zoom-in"
                        style={{ border: `1px solid ${step.color}30` }}
                        onClick={() => setLightbox(i)}
                      >
                        <img src={img} alt={`Resultado ${i + 1}`} className="w-full object-cover" style={{ maxHeight: 160 }} />
                      </div>
                    ))}
                    <div className="text-center text-[11px] text-white/40 mt-1">{step.media.caption}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && step.media && (step.media.type === "image" || step.media.type === "gallery") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close button — large tap target for mobile */}
            <button
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full text-white text-xl font-bold transition-all active:scale-90"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              aria-label="Cerrar"
            >✕</button>
            <div className="relative flex items-center gap-2 md:gap-4 px-4 md:px-12" onClick={(e) => e.stopPropagation()}>
              {step.media.type === "gallery" && lightbox > 0 && (
                <button
                  className="text-white/40 hover:text-white text-3xl transition-colors"
                  onClick={() => setLightbox((l) => (l! - 1))}
                >‹</button>
              )}
              <img
                src={step.media.type === "gallery" ? step.media.images[lightbox] : step.media.src}
                alt=""
                className="max-h-[85vh] max-w-[80vw] rounded-xl object-contain"
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.6)" }}
              />
              {step.media.type === "gallery" && lightbox < step.media.images.length - 1 && (
                <button
                  className="text-white/40 hover:text-white text-3xl transition-colors"
                  onClick={() => setLightbox((l) => (l! + 1))}
                >›</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── End CTA ─────────────────────────────────────────────────────────────────
function EndCTA() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const copy = useMemo(
    () =>
      language === "es"
        ? {
            title: "Workflow completado",
            description:
              "De una fotografia de producto a un video animado editorial, listo para campanas de e-commerce.",
            back: "← Volver al portfolio",
            contact: "Contactar ↗",
          }
        : {
            title: "Workflow completed",
            description:
              "From a product photo to an editorial animated video, ready for e-commerce campaigns.",
            back: "← Back to portfolio",
            contact: "Contact ↗",
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
              background: "linear-gradient(135deg, #7B2FBE, #2196F3)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(123,47,190,0.4)",
            }}
          >
            {copy.back}
          </motion.button>
        </Link>
        <a href="mailto:carlosmartinezlasierra@gmail.com">
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
            {copy.contact}
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WorkflowIA() {
  const { language } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,47,190,0.15) 0%, transparent 60%), #0a0a0a",
      }}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* Sticky nav */}
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
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">
            {language === "es" ? "Workflow IA" : "AI Workflow"}
          </span>
        </div>
      </nav>

      {/* Hero header */}
      <div className="relative z-10 pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(123,47,190,0.15)", border: "1px solid rgba(123,47,190,0.3)", color: "#a855f7" }}>
            {language === "es" ? "✦ CASO COMPLETO" : "✦ FULL CASE STUDY"}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-4">
            Workflows IA<br />
            <span style={{ color: "#7B2FBE" }}>
              {language === "es" ? "para E-commerce" : "for E-commerce"}
            </span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            {language === "es"
              ? "De una fotografía de producto a imágenes editoriales y vídeo animado, usando inteligencia artificial generativa de principio a fin."
              : "From a product photo to editorial images and animated video, using generative AI from start to finish."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["LORA Training", "ComfyUI", "Nano Banana Pro", "Kling AI", "Photoshop"].map((tag) => (
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
            style={{ background: "linear-gradient(to bottom, rgba(123,47,190,0.6), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Steps */}
      <div className="relative z-10 px-4 md:px-6 pb-8">
        {steps.map((step, i) => (
          <div key={step.number}>
            <StepCard step={step} index={i} />
            {i < steps.length - 1 && (
              <DashedArrow color={steps[i + 1].color} />
            )}
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
