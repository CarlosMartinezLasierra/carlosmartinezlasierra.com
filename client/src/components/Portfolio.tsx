/* Portfolio.tsx — Grain & Glow design system
   Single section "Portfolio & Casos". ReodGlobe card is expandable:
   clicking it reveals the AI gallery (flat→result pairs) and the PDF plan.
   AI Workflows card is also expandable with interactive step-by-step visualization.
   Other cards remain as standard project cards. */

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import PdfViewer from "./PdfViewer";

const AI_IMG = "/workflow-ecommerce-case.png";
const MKT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/meta-logo_43463381.png";
const YT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/yt-avatar_89417733.png";
const REODGLOBE_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/_logo_REODGLOBE_7399654f.webp";
const WEB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/web-dev-visual-CXHNU4ZYcAuuLypPhnxp3Q.webp";
const REODGLOBE_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/reodglobe-clean_e717466b.png";
const REODGLOBE_PRODUCTS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/reodglobe-products-clean_bce358d8.png";
const REODGLOBE_PDF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/reodglobe_mkandbussinesplan_b0671200.pdf";
const REODGLOBE_COVER_VIDEO = "/reodglobe-cover-loop.mp4";

// AI Workflow CDN assets
const WORKFLOW_DATASET_GIF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/dataset-spin_918674fe.gif";
const WORKFLOW_CAPTIONING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/Capturadepantalla2026-03-12171225_dbb4b1e5.png";
const WORKFLOW_COMFYUI = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/example_comfyUIworkflow_11e9683a.png";
const WORKFLOW_FINAL_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/img_workflow_final(1)_9e29aea1.webp";
const WORKFLOW_FINAL_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/img_workflow_final(2)_3b1c369a.webp";
const WORKFLOW_FINAL_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/img_workflow_final(3)_8224ee73.webp";
const WORKFLOW_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/video_resultado_opt_9130ce78.mp4";

const techPackItems = [
  {
    id: "tshirt",
    label: "Camiseta Oversize — Not Labeled",
    desc: "Algodón orgánico 230 GSM · Unisex · Double needle stitching · Screen print",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/tp_tshirt_47ff5a25.png",
  },
  {
    id: "longsleeve",
    label: "Manga Larga — My Chaos Is Art",
    desc: "Algodón orgánico 230 GSM · Drop shoulder · Screen print frontal y trasero",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/tp_longsleeve_375c1f4c.png",
  },
  {
    id: "hoodie",
    label: "Sudadera Zip-Up — Acid Wash",
    desc: "Algodón orgánico 350 GSM · Acid wash · Kangaroo pocket · Estrellas bordadas",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/tp_hoodie_cb65fb3a.png",
  },
  {
    id: "hat",
    label: "Gorra 5-Panel — StarSmoked",
    desc: "100% algodón · Cierre de cuero · Logo bordado · Hang tag personalizado",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/tp_hat_c880e64d.png",
  },
];

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/";

const aiPairs = [
  {
    id: "longsleeve",
    label: "Longsleeve Black",
    tag: "Modelo con producto",
    flat: CDN + "IMG_6057_0fa76836.webp",
    results: [CDN + "mychaosisart_blacktshirt_b57d7d52.jpg", CDN + "mychaosisart_blacktshirt2_8c0b76a3.jpg"],
  },
  {
    id: "acidcocoa",
    label: "Hoodie — Acid Cocoa",
    tag: "Editorial urbano",
    flat: CDN + "I_want_you_2k_202602152311_94ac662b.jpg",
    results: [CDN + "acidcocoa_hoodie_e8d1a878.webp", CDN + "acidcocoa_hoodie2_7085aaf8.jpg"],
  },
  {
    id: "uraniumacid",
    label: "Hoodie — Uranium Acid",
    tag: "Lifestyle nocturno",
    flat: CDN + "I_want_you_2k_202602152320_89c6b7be.jpg",
    results: [CDN + "uraniumacid_hoodie_a0b08ec5.webp"],
  },
  {
    id: "notlabeled",
    label: "Tee — Not Labeled White",
    tag: "E-commerce",
    flat: CDN + "Tabletop_photography_of_2k_202602170005_04693124.jpg",
    results: [CDN + "notlabeled_white_dcda140f.jpg", CDN + "notlabeled_white2_0ee72c04.jpg"],
  },
  {
    id: "starsmoked",
    label: "5-Panel Hat — StarSmoked",
    tag: "Producto + modelo",
    flat: CDN + "IMG_5964_b4b7e0c3.webp",
    results: [CDN + "starsmoked_5panel_b2e3e1a0.webp", CDN + "I_want_a_2k_202602161540_c8f9f5b7.jpg"],
  },
];

const projects = [
  {
    id: 1,
    title: "ReodGlobe — Marca Streetwear",
    category: "Emprendimiento & Diseño",
    color: "#FF6B35",
    image: REODGLOBE_LOGO,
    tags: ["Identidad Visual", "Tech Packs", "Sourcing", "Meta Ads", "IA Generativa", "Community Manager", "Content Strategy"],
    description:
      "Fundación y gestión integral de ReodGlobe (dic. 2024), marca de moda streetwear. Negociación con proveedores internacionales, diseño de producto, identidad visual, estrategia de marketing digital e integración de IA generativa para la creación de contenido.",
    size: "large",
    expandable: true,
    type: "reodglobe",
  },
  {
    id: 2,
    title: "Workflows IA para E-commerce",
    category: "IA Generativa",
    color: "#7B2FBE",
    image: AI_IMG,
    tags: ["LORA Training", "ControlNet", "ComfyUI", "Nano Banana", "Civitai", "Kling AI"],
    description:
      "Creación de workflows completos de IA generativa para generar imágenes de producto de e-commerce. Entrenamiento de modelos LORA con datasets propios, generación con ComfyUI y refinamiento con Nano Banana Pro para entregar contenido visual profesional.",
    size: "large",
    expandable: true,
    type: "workflows",
  },
  {
    id: 3,
    title: "HistorIAs IA — 271K Suscriptores",
    category: "Creación de Contenido",
    color: "#2196F3",
    image: YT_IMG,
    link: "https://www.youtube.com/@carloosmartz",
    tags: ["YouTube", "Viralización", "Analytics", "Hooks"],
    description:
      "Gestión completa de un canal de YouTube desde 0 hasta 271.000 suscriptores en 1 año. Estrategia de contenido, hooks narrativos, análisis profundo de métricas y optimización continua para maximizar el crecimiento orgánico.",
    size: "medium",
  },
  {
    id: 4,
    title: "ReodGlobe.es — E-commerce Hydrogen",
    category: "Desarrollo Web",
    color: "#2196F3",
    image: REODGLOBE_HERO,
    video: REODGLOBE_COVER_VIDEO,
    link: "https://www.reodglobe.es",
    tags: ["Hydrogen", "React", "Shopify", "Meta Pixel", "CAPI", "SEO", "Cookies"],
    description:
      "Tienda online completa desarrollada con Hydrogen (React + Shopify). Incluye Meta Pixel, Conversions API (CAPI) server-side, cookie consent, SEO avanzado con structured data, carrito deslizante, newsletter popup y animaciones de transición.",
    size: "medium",
    images: [REODGLOBE_HERO, REODGLOBE_PRODUCTS],
    techFeatures: [
      { label: "Meta Pixel + CAPI", desc: "Tracking server-side para máxima precisión de datos" },
      { label: "Cookie Consent RGPD", desc: "Banner con aceptación granular de cookies" },
      { label: "SEO Avanzado", desc: "Structured data, sitemap, meta tags dinámicos" },
      { label: "Hydrogen (React SSR)", desc: "Streaming SSR para máxima performance" },
      { label: "Gestión de Catálogo", desc: "Drops, colecciones, variantes y stock en tiempo real" },
      { label: "Newsletter + Drop List", desc: "Captura de leads con popup animado" },
    ],
  },
  {
    id: 5,
    title: "Campañas Meta Ads",
    category: "Marketing Digital",
    color: "#E63946",
    image: MKT_IMG,
    tags: ["Meta Ads", "Campañas Frías", "Retargeting", "ROAS"],
    description:
      "Gestión de campañas de Meta Ads: campañas frías de prospección, campañas templadas de engagement y campañas calientes de conversión. Estrategia de embudo completo con optimización continua de ROAS.",
    size: "small",
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-6 text-white/50 hover:text-white text-2xl transition-colors"
        onClick={onClose}
      >✕</button>
      <div className="relative flex items-center gap-4 px-12" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            className="text-white/40 hover:text-white text-3xl transition-colors"
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
          >‹</button>
        )}
        <img
          src={images[current]}
          alt=""
          className="max-h-[85vh] max-w-[80vw] rounded-xl object-contain"
          style={{ boxShadow: "0 0 80px rgba(0,0,0,0.6)" }}
        />
        {images.length > 1 && (
          <button
            className="text-white/40 hover:text-white text-3xl transition-colors"
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
          >›</button>
        )}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === current ? "white" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── AI Gallery inside ReodGlobe ─────────────────────────────────────────────
function AiGalleryTab({ color }: { color: string }) {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const items = useMemo(
    () =>
      language === "es"
        ? aiPairs
        : [
            { ...aiPairs[0], tag: "Model wearing product" },
            { ...aiPairs[1], tag: "Urban editorial" },
            { ...aiPairs[2], tag: "Night lifestyle" },
            { ...aiPairs[3], tag: "E-commerce" },
            { ...aiPairs[4], tag: "Product + model" },
          ],
    [language]
  );
  const allImages = items.flatMap((p) => [p.flat, ...p.results]);

  return (
    <div>
      <p className="mono-label mb-6" style={{ color }}>
        {language === "es" ? "✦ Imagenes IA - Flat -> Resultado" : "✦ AI Images - Flat -> Result"}
        {/*
        {language === "es" ? "✦ Imágenes IA — Flat → Resultado" : "✦ AI Images — Flat → Result"}
        */}
      </p>
      <div className="space-y-8">
        {items.map((pair) => (
          <div key={pair.id}>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="skill-pill text-xs"
                style={{ color, borderColor: color + "40", background: color + "10" }}
              >
                {pair.label}
              </span>
              <span className="mono-label text-white/30" style={{ fontSize: "0.6rem" }}>
                {pair.tag}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Flat */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden cursor-zoom-in"
                style={{ width: 140, height: 140, border: `1px solid ${color}30` }}
                onClick={() => setLightbox({ images: allImages, index: allImages.indexOf(pair.flat) })}
              >
                <img src={pair.flat} alt={pair.label + " flat"} className="w-full h-full object-cover" />
                <div
                  className="absolute bottom-0 left-0 right-0 text-center py-1 text-xs"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.6rem",
                  }}
                >
                  FLAT
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-px" style={{ background: color + "60" }} />
                <span style={{ color, fontSize: "1.2rem" }}>→</span>
                <div className="w-8 h-px" style={{ background: color + "60" }} />
              </div>

              {/* Results */}
              <div className="flex gap-3 flex-wrap">
                {pair.results.map((src, ri) => (
                  <motion.div
                    key={ri}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-xl overflow-hidden cursor-zoom-in"
                    style={{ width: 140, height: 140, border: `1px solid ${color}30` }}
                    onClick={() => setLightbox({ images: allImages, index: allImages.indexOf(src) })}
                  >
                    <img src={src} alt={pair.label + " result " + ri} className="w-full h-full object-cover" />
                    <div
                      className="absolute bottom-0 left-0 right-0 text-center py-1 text-xs"
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        fontFamily: "'DM Mono', monospace",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.6rem",
                      }}
                    >
                      IA
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tech Packs Tab inside ReodGlobe ────────────────────────────────────────
function TechPacksTab({ color }: { color: string }) {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const items = useMemo(
    () =>
      language === "es"
        ? techPackItems
        : [
            { ...techPackItems[0], label: "Oversized Tee - Not Labeled", desc: "230 GSM organic cotton - Unisex - Double needle stitching - Screen print" },
            { ...techPackItems[1], label: "Long Sleeve - My Chaos Is Art", desc: "230 GSM organic cotton - Drop shoulder - Front and back screen print" },
            { ...techPackItems[2], label: "Zip-Up Hoodie - Acid Wash", desc: "350 GSM organic cotton - Acid wash - Kangaroo pocket - Embroidered stars" },
            { ...techPackItems[3], label: "5-Panel Hat - StarSmoked", desc: "100% cotton - Leather strap - Embroidered logo - Custom hang tag" },
          ],
    [language]
  );
  const allImgs = items.map((t) => t.img);

  return (
    <div>
      <p className="mono-label mb-2" style={{ color }}>
        {language === "es" ? "✦ Identidad Visual & Tech Packs" : "✦ Visual Identity & Tech Packs"}
      </p>
      <p className="text-white/35 text-xs mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {language === "es"
          ? "Diseños técnicos elaborados en Adobe Illustrator para producción con proveedores internacionales. Cada prenda incluye especificaciones de materiales, medidas, costuras y posicionamiento de logos."
          : "Technical designs created in Adobe Illustrator for production with international suppliers. Each garment includes material specs, measurements, stitching, and logo placement."}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl overflow-hidden border cursor-zoom-in"
            style={{ borderColor: color + "25", background: color + "05" }}
            onClick={() => setLightbox({ images: allImgs, index: i })}
          >
            <div className="relative" style={{ height: 200 }}>
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-contain"
                style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem" }}
              />
              <div
                className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs"
                style={{
                  background: color + "20",
                  color,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  border: `1px solid ${color}30`,
                }}
              >
                TECH PACK
              </div>
            </div>
            <div className="px-4 py-3 border-t" style={{ borderColor: color + "15" }}>
              <p className="text-white/80 text-sm font-medium mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.label}
              </p>
              <p className="text-white/30 text-xs" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem" }}>
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {lightbox && (
          <Lightbox images={lightbox.images} index={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PDF Tab inside ReodGlobe ─────────────────────────────────────────────────
function PdfTab({ color }: { color: string }) {
  const { language } = useLanguage();
  return (
    <div>
      <p className="mono-label mb-6" style={{ color }}>
        {language === "es" ? "✦ Plan de Marketing & Negocio" : "✦ Marketing & Business Plan"}
      </p>
      <PdfViewer
        url={REODGLOBE_PDF}
        title={language === "es" ? "ReodGlobe — Plan de Marketing & Negocio" : "ReodGlobe — Marketing & Business Plan"}
      />
    </div>
  );
}

// ─── AI Workflows Step-by-Step Visualization ─────────────────────────────────
const workflowSteps = [
  {
    id: "dataset",
    number: "01",
    title: "Dataset Collection",
    subtitle: "Fotografía del producto",
    description: "Se fotografía el producto en maniquí desde múltiples ángulos (frontal, trasero, lateral izquierdo, lateral derecho) sobre fondo blanco con iluminación de estudio uniforme. El dataset incluye entre 30-80 imágenes por prenda para garantizar que el modelo LORA aprenda la forma, textura y caída del tejido con precisión.",
    tools: ["Cámara DSLR", "Fondo blanco", "Iluminación estudio"],
    visual: "gif",
    visualSrc: WORKFLOW_DATASET_GIF,
    visualAlt: "Dataset de vestido negro rotando en maniquí",
    visualCaption: "Imágenes del dataset — múltiples ángulos",
  },
  {
    id: "captioning",
    number: "02",
    title: "Captioning & Etiquetado",
    subtitle: "Preparación del dataset",
    description: "Cada imagen del dataset recibe un caption descriptivo que el modelo utilizará para aprender la asociación entre el texto y la imagen. Los captions incluyen el trigger word del LORA (p.ej. 'bl4ck dress'), descripción de la pose, el fondo y las condiciones de iluminación. Este paso es crítico para que el modelo genere imágenes coherentes con el prompt.",
    tools: ["Dataset Tagger", "Kohya SS", "Trigger words"],
    visual: "image",
    visualSrc: WORKFLOW_CAPTIONING,
    visualAlt: "Interfaz de captioning con etiquetas de imagen",
    visualCaption: "Dataset Tagger — etiquetado de imágenes",
  },
  {
    id: "training",
    number: "03",
    title: "LORA Training",
    subtitle: "Entrenamiento del modelo",
    description: "El modelo LORA (Low-Rank Adaptation) se entrena usando Kohya SS o AI-Toolkit. Este proceso requiere una GPU potente (mínimo 8GB VRAM) y conocimientos de programación para configurar los hiperparámetros: learning rate, número de epochs, network rank y alpha. El resultado es un archivo .safetensors de ~150MB que contiene el 'ADN visual' del producto.",
    tools: ["Kohya SS", "AI-Toolkit", "NVIDIA GPU", "Python"],
    visual: "code",
    visualCaption: "Configuración de entrenamiento LORA",
    codeLines: [
      { label: "Modelo base", value: "FLUX.1-dev" },
      { label: "Network rank", value: "32" },
      { label: "Learning rate", value: "0.0004" },
      { label: "Epochs", value: "20" },
      { label: "Batch size", value: "1" },
      { label: "Output", value: "bl4ck_dress_v1.safetensors" },
    ],
    warning: "Requiere PC potente con GPU dedicada y conocimientos de Python",
  },
  {
    id: "generation",
    number: "04",
    title: "Generación con ComfyUI",
    subtitle: "Workflow de generación",
    description: "Con el LORA entrenado, se construye un workflow en ComfyUI que carga el modelo base FLUX, el LORA del producto, y un ControlNet de depth para controlar la pose. El prompt describe la escena deseada mientras el trigger word activa el LORA para mantener la fidelidad del producto. Se generan múltiples variantes para seleccionar las mejores.",
    tools: ["ComfyUI", "FLUX.1-dev", "ControlNet", "Depth Map"],
    visual: "image",
    visualSrc: WORKFLOW_COMFYUI,
    visualAlt: "Workflow de ComfyUI con nodos de generación",
    visualCaption: "ComfyUI — workflow de generación con LORA",
  },
  {
    id: "refinement",
    number: "05",
    title: "Refinamiento & Upscaling",
    subtitle: "Post-producción IA",
    description: "Las imágenes generadas pasan por un proceso de refinamiento en varias etapas: Nano Banana Pro o Nano Banana 2 para mejorar la coherencia visual, upscaling con IA para aumentar la resolución a 4K, y retoque final en Photoshop para ajustar color, eliminar artefactos y adaptar la imagen al brief del cliente.",
    tools: ["Nano Banana Pro", "Nano Banana 2", "AI Upscaling", "Photoshop"],
    visual: "gallery",
    galleryImages: [WORKFLOW_FINAL_1, WORKFLOW_FINAL_2, WORKFLOW_FINAL_3],
    visualCaption: "Resultados finales — vestido negro en diferentes escenas",
  },
  {
    id: "animation",
    number: "06",
    title: "Animación con IA",
    subtitle: "Video product shots",
    description: "Las imágenes refinadas se convierten en vídeos de producto usando Kling AI o Sídance. Estos modelos de video-to-video generan movimientos naturales del tejido, cambios de luz y movimientos de cámara cinematográficos. El resultado son vídeos de 5-10 segundos perfectos para redes sociales y e-commerce.",
    tools: ["Kling AI", "Sídance", "Video-to-Video"],
    visual: "video",
    visualSrc: WORKFLOW_VIDEO,
    visualCaption: "Resultado final — animación del vestido negro",
  },
];

function WorkflowVisualization({ color }: { color: string }) {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const step = workflowSteps[activeStep];

  return (
    <div>
      <div className="flex items-start gap-2 mb-8">
        <p className="mono-label" style={{ color }}>
          {language === "es"
            ? "✦ Proceso Completo — LORA Training & Generación IA"
            : "✦ Full Process — LORA Training & AI Generation"}
        </p>
      </div>

      {/* Disclaimer */}
      <div
        className="mb-8 px-4 py-3 rounded-xl border text-xs"
        style={{
          borderColor: color + "25",
          background: color + "06",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: color + "cc", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
          {language === "es" ? "NOTA" : "NOTE"}
        </span>
        {" "}
        —{" "}
        {language === "es"
          ? "Las imágenes de resultado mostradas corresponden a un proyecto de cliente. Los datos identificativos han sido omitidos por confidencialidad. El workflow y la metodología son propios y aplicables a cualquier producto de e-commerce."
          : "The result images shown belong to a client project. Identifying details have been omitted for confidentiality. The workflow and methodology are my own and can be applied to any e-commerce product."}
      </div>

      {/* Step selector — horizontal scrollable pills */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {workflowSteps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(i)}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300"
            style={{
              borderColor: activeStep === i ? color + "60" : "rgba(255,255,255,0.08)",
              background: activeStep === i ? color + "15" : "transparent",
              color: activeStep === i ? color : "rgba(255,255,255,0.35)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: activeStep === i ? color : "rgba(255,255,255,0.08)",
                color: activeStep === i ? "black" : "rgba(255,255,255,0.35)",
                fontSize: "0.55rem",
              }}
            >
              {s.number}
            </span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left: text content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-4xl font-black"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: color + "25",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>
              <div>
                <h4
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-xs"
                  style={{ fontFamily: "'DM Mono', monospace", color: color, letterSpacing: "0.06em" }}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>

            <p
              className="text-white/50 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              {step.description}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-4">
              {step.tools.map((tool) => (
                <span
                  key={tool}
                  className="skill-pill text-xs"
                  style={{ color, borderColor: color + "35", background: color + "08" }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Warning for training step */}
            {step.warning && (
              <div
                className="mt-4 px-3 py-2.5 rounded-lg border text-xs flex items-start gap-2"
                style={{
                  borderColor: "#f59e0b40",
                  background: "#f59e0b08",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ color: "#f59e0b", fontSize: "0.8rem", lineHeight: 1.4 }}>⚠</span>
                <span>{step.warning}</span>
              </div>
            )}

            {/* Navigation arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-xl border text-xs transition-all duration-300 disabled:opacity-20"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                }}
              >
                {language === "es" ? "← Anterior" : "← Previous"}
              </button>
              <button
                onClick={() => setActiveStep((s) => Math.min(workflowSteps.length - 1, s + 1))}
                disabled={activeStep === workflowSteps.length - 1}
                className="px-4 py-2 rounded-xl border text-xs transition-all duration-300 disabled:opacity-20"
                style={{
                  borderColor: color + "40",
                  color,
                  background: color + "10",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                }}
              >
                {language === "es" ? "Siguiente →" : "Next →"}
              </button>
            </div>
          </div>

          {/* Right: visual */}
          <div>
            {step.visual === "gif" && (
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: color + "20", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="relative flex items-center justify-center" style={{ minHeight: 280, background: "rgba(0,0,0,0.3)" }}>
                  <img
                    src={step.visualSrc}
                    alt={step.visualAlt}
                    className="max-h-72 object-contain"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}
                  />
                </div>
                <div
                  className="px-4 py-3 border-t text-xs"
                  style={{
                    borderColor: color + "15",
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {step.visualCaption}
                </div>
              </div>
            )}

            {step.visual === "image" && step.visualSrc && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl overflow-hidden border cursor-zoom-in"
                style={{ borderColor: color + "20" }}
                onClick={() => setLightbox({ images: [step.visualSrc!], index: 0 })}
              >
                <img
                  src={step.visualSrc}
                  alt={step.visualAlt}
                  className="w-full object-cover"
                  style={{ maxHeight: 320 }}
                />
                <div
                  className="px-4 py-3 border-t text-xs flex items-center justify-between"
                  style={{
                    borderColor: color + "15",
                    background: "rgba(0,0,0,0.4)",
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  <span>{step.visualCaption}</span>
                  <span style={{ color: color + "80" }}>🔍 ampliar</span>
                </div>
              </motion.div>
            )}

            {step.visual === "code" && step.codeLines && (
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: color + "20" }}
              >
                <div
                  className="px-4 py-3 border-b flex items-center gap-2"
                  style={{ borderColor: color + "15", background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                  </div>
                  <span
                    className="text-xs ml-2"
                    style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.62rem" }}
                  >
                    lora_config.toml
                  </span>
                </div>
                <div className="p-5 space-y-3" style={{ background: "rgba(0,0,0,0.35)" }}>
                  {step.codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between"
                    >
                      <span
                        className="text-xs"
                        style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}
                      >
                        {line.label}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          color,
                          background: color + "15",
                          fontSize: "0.7rem",
                          border: `1px solid ${color}25`,
                        }}
                      >
                        {line.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div
                  className="px-4 py-3 border-t text-xs"
                  style={{
                    borderColor: color + "15",
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {step.visualCaption}
                </div>
              </div>
            )}

            {step.visual === "gallery" && step.galleryImages && (
              <div>
                <div className="grid grid-cols-3 gap-3">
                  {step.galleryImages.map((src, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="relative rounded-xl overflow-hidden cursor-zoom-in border"
                      style={{ aspectRatio: "2/3", borderColor: color + "20" }}
                      onClick={() => setLightbox({ images: step.galleryImages!, index: i })}
                    >
                      <img src={src} alt={"Resultado " + (i + 1)} className="w-full h-full object-cover" />
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ background: `${color}20` }}
                      >
                        <span className="text-white text-xl">🔍</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div
                  className="mt-3 text-xs"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {step.visualCaption}
                </div>
              </div>
            )}

            {step.visual === "video" && step.visualSrc && (
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: color + "20" }}
              >
                <video
                  src={step.visualSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full"
                  style={{ maxHeight: 380, objectFit: "cover", display: "block" }}
                />
                <div
                  className="px-4 py-3 border-t text-xs flex items-center justify-between"
                  style={{
                    borderColor: color + "15",
                    background: "rgba(0,0,0,0.4)",
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  <span>{step.visualCaption}</span>
                  <span style={{ color: color + "80" }}>▶ autoplay</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-10 flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full"
            style={{ background: color }}
            animate={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span
          className="text-xs shrink-0"
          style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.62rem" }}
        >
          {activeStep + 1} / {workflowSteps.length}
        </span>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Generic Expandable Card (ReodGlobe or Workflows) ────────────────────────
function ExpandableCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const color = project.color;
  const isReodGlobe = project.type === "reodglobe";
  const isWorkflows = project.type === "workflows";

  // ReodGlobe tabs
  const [activeTab, setActiveTab] = useState<"ai" | "techpacks" | "pdf">("ai");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="border transition-all duration-500"
      style={{
        borderRadius: "1rem",
        overflow: expanded ? "visible" : "hidden",
        borderColor: expanded || hovered ? color + "50" : "rgba(255,255,255,0.06)",
        background: expanded || hovered ? color + "06" : "rgba(255,255,255,0.02)",
        boxShadow: expanded || hovered ? `0 0 40px ${color}12` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card header — always visible */}
      <div className="flex flex-col md:flex-row gap-0">
        {/* Image/Logo side */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ width: "100%", maxWidth: 280, minHeight: 200 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full transition-all duration-700"
            style={{
              objectFit: isReodGlobe ? "contain" : "cover",
              filter: hovered || expanded ? "none" : "brightness(0.6) saturate(0.5)",
              background: "rgba(0,0,0,0.3)",
              padding: isReodGlobe ? "1.5rem" : "0",
              minHeight: 200,
            }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
              opacity: hovered || expanded ? 1 : 0,
            }}
          />
        </div>

        {/* Info side */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="skill-pill text-xs"
                style={{ color, borderColor: color + "50", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="text-xl font-bold mb-3 transition-colors duration-300"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: hovered || expanded ? color : "white",
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-white/45 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-pill text-xs transition-all duration-300"
                  style={{
                    color: hovered || expanded ? color : "rgba(255,255,255,0.35)",
                    borderColor: hovered || expanded ? color + "40" : "rgba(255,255,255,0.1)",
                    background: hovered || expanded ? color + "10" : "transparent",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigate to case study page */}
          <Link href={isReodGlobe ? "/reodglobe" : "/workflow-ia"}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300"
              style={{
                borderColor: color + "60",
                background: color + "12",
                color: color,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
              }}
            >
              {language === "es" ? "VER CASO COMPLETO" : "VIEW FULL CASE"}
              <span>→</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 border-t px-6 pt-6 pb-8" style={{ borderColor: color + "20" }}>
              {isReodGlobe && (
                <>
                  {/* Tabs */}
                  <div className="flex gap-2 mb-8">
                    {[
                      { key: "ai" as const, label: language === "es" ? "Imágenes IA" : "AI Images" },
                      { key: "techpacks" as const, label: "Tech Packs" },
                      { key: "pdf" as const, label: language === "es" ? "Plan de Marketing" : "Marketing Plan" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: "0.06em",
                          background: activeTab === tab.key ? color + "20" : "transparent",
                          color: activeTab === tab.key ? color : "rgba(255,255,255,0.35)",
                          border: `1px solid ${activeTab === tab.key ? color + "50" : "rgba(255,255,255,0.08)"}`,
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "ai" ? (
                        <AiGalleryTab color={color} />
                      ) : activeTab === "techpacks" ? (
                        <TechPacksTab color={color} />
                      ) : (
                        <PdfTab color={color} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}

              {isWorkflows && (
                <WorkflowVisualization color={color} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Standard Project Card ────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const hasLink = !!(project as any).link;
  const hasTechFeatures = !!(project as any).techFeatures;
  const hasVideo = !!(project as any).video;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer"
      style={{
        borderColor: hovered ? project.color + "50" : "rgba(255,255,255,0.06)",
        background: hovered ? project.color + "08" : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 0 40px ${project.color}15` : "none",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: hasTechFeatures ? "16/7" : "16/9" }}>
        <div className="w-full h-full overflow-hidden" style={{ position: "relative" }}>
          {hasVideo ? (
            <video
              src={(project as any).video}
              poster={project.image}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
              style={{ filter: hovered ? "none" : "brightness(0.68) saturate(0.82)" }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={(project as any).images ? (project as any).images[0] : project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
              style={{ filter: hovered ? "none" : "brightness(0.65) saturate(0.6)" }}
            />
          )}
          {!hasVideo && (project as any).images?.[1] && (
            <img
              src={(project as any).images[1]}
              alt={project.title + " products"}
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          )}
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, rgba(5,6,10,0.8) 0%, transparent 100%)" }}
        />
        <div
          className="absolute top-4 left-4 skill-pill text-xs"
          style={{ color: project.color, borderColor: project.color + "50", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        >
          {project.category}
        </div>
        {hasLink && (
          <a
            href={(project as any).link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 skill-pill text-xs flex items-center gap-1.5 transition-all duration-300"
            style={{
              color: hovered ? project.color : "rgba(255,255,255,0.5)",
              borderColor: hovered ? project.color + "60" : "rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: hovered ? project.color : "#4ade80", boxShadow: `0 0 6px ${hovered ? project.color : "#4ade80"}` }}
            />
            {language === "es" ? "Ver web" : "Visit site"}
          </a>
        )}
        {hasTechFeatures && (
          <div
            className="absolute bottom-3 right-4 text-xs transition-opacity duration-300"
            style={{ fontFamily: "'DM Mono', monospace", color: hovered ? project.color : "rgba(255,255,255,0.2)", opacity: hovered ? 1 : 0.6 }}
          >
            {language === "es" ? "↕ scroll preview" : "↕ scroll preview"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-lg font-bold mb-2 transition-colors duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: hovered ? project.color : "white" }}
        >
          {project.title}
        </h3>
        <p
          className="text-white/45 text-sm leading-relaxed mb-5"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="skill-pill text-xs"
              style={{
                color: hovered ? project.color : "rgba(255,255,255,0.35)",
                borderColor: hovered ? project.color + "40" : "rgba(255,255,255,0.1)",
                background: hovered ? project.color + "10" : "transparent",
                transition: "all 0.3s ease",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {hasTechFeatures && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {((project as any).techFeatures as { label: string; desc: string }[]).map((feat) => (
              <div
                key={feat.label}
                className="rounded-xl p-3 border transition-all duration-300"
                style={{
                  borderColor: hovered ? project.color + "25" : "rgba(255,255,255,0.05)",
                  background: hovered ? project.color + "06" : "rgba(255,255,255,0.015)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-0.5 transition-colors duration-300"
                  style={{ fontFamily: "'DM Mono', monospace", color: hovered ? project.color : "rgba(255,255,255,0.55)" }}
                >
                  {feat.label}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.3)" }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{ outline: hovered ? `1.5px dashed ${project.color}60` : "none", outlineOffset: "4px", opacity: hovered ? 1 : 0 }}
      />
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const { language } = useLanguage();
  const localizedProjects = useMemo(
    () =>
      language === "es"
        ? projects
        : [
            {
              ...projects[0],
              title: "ReodGlobe - Streetwear Brand",
              category: "Entrepreneurship & Design",
              tags: [
                "Visual Identity",
                "Tech Packs",
                "Sourcing",
                "Meta Ads",
                "Generative AI",
                "Community Manager",
                "Content Strategy",
              ],
              description:
                "End-to-end creation and management of ReodGlobe, a streetwear brand launched in December 2024. International supplier negotiation, product design, visual identity, digital marketing strategy, and generative AI content production.",
            },
            {
              ...projects[1],
              title: "AI Workflows for E-commerce",
              category: "Generative AI",
              description:
                "Complete generative AI workflows designed to create product visuals for e-commerce. LORA training with custom datasets, generation in ComfyUI, and refinement to deliver professional visual content.",
            },
            {
              ...projects[2],
              title: "HistorIAs IA - 271K Subscribers",
              category: "Content Creation",
              tags: ["YouTube", "Virality", "Analytics", "Hooks"],
              description:
                "Full management of a YouTube channel from 0 to 271,000 subscribers in one year. Content strategy, narrative hooks, metrics analysis, and continuous optimization for organic growth.",
            },
            {
              ...projects[3],
              title: "ReodGlobe.es - Hydrogen E-commerce",
              category: "Web Development",
              description:
                "Complete online store built with Hydrogen, React, and Shopify. Includes Meta Pixel, server-side CAPI, cookie consent, advanced SEO, slide cart, newsletter popup, and transition animations.",
              techFeatures: [
                { label: "Meta Pixel + CAPI", desc: "Server-side tracking for more reliable data accuracy" },
                { label: "Cookie Consent", desc: "Granular cookie banner for GDPR compliance" },
                { label: "Advanced SEO", desc: "Structured data, sitemap, and dynamic meta tags" },
                { label: "Hydrogen (React SSR)", desc: "Streaming SSR for maximum performance" },
                { label: "Catalog Management", desc: "Drops, collections, variants, and live stock handling" },
                { label: "Newsletter + Drop List", desc: "Lead capture with animated popup" },
              ],
            },
            {
              ...projects[4],
              title: "Meta Ads Campaigns",
              category: "Digital Marketing",
              tags: ["Meta Ads", "Cold Campaigns", "Retargeting", "ROAS"],
              description:
                "Meta Ads campaign management across prospecting, engagement, and conversion stages. Full-funnel strategy with continuous ROAS optimization.",
            },
          ],
    [language]
  );
  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
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
        04
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mono-label mb-4 text-[var(--glow-orange)]">
            {language === "es" ? "✦ Proyectos" : "✦ Projects"}
          </p>
          <h2
            className="display-title text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Portfolio &{" "}
            <span style={{ color: "var(--glow-orange)" }}>
              {language === "es" ? "Casos" : "Case Studies"}
            </span>
          </h2>
          <p
            className="mt-4 max-w-lg text-white/40 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {language === "es"
              ? "Una selección de proyectos reales que reflejan mi capacidad de combinar creatividad, tecnología y estrategia de negocio."
              : "A selection of real projects that reflects how I combine creativity, technology, and business strategy."}
          </p>
        </motion.div>

        {/* ReodGlobe — expandable card (full width) */}
        <div className="mb-6">
          <ExpandableCard project={localizedProjects[0]} index={0} />
        </div>

        {/* AI Workflows — expandable card (full width) */}
        <div className="mb-6">
          <ExpandableCard project={localizedProjects[1]} index={1} />
        </div>

        {/* Rest of projects in asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard project={localizedProjects[2]} index={2} />
          <div className="md:col-span-2">
            <ProjectCard project={localizedProjects[3]} index={3} />
          </div>
          <ProjectCard project={localizedProjects[4]} index={4} />
        </div>
      </div>
    </section>
  );
}
