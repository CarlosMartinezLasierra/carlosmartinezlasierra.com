/* ReodGlobeGallery.tsx — Design: "Grain & Glow"
   Shows ReodGlobe product pairs: flat product shot → AI result image
   with an animated arrow between them. Lightbox on click.
   
   CORRECT IMAGE MAP (verified visually):
   - Longsleeve negra: IMG_6057 (flat) → mychaosisart_blacktshirt x2 (result)
   - Hoodie Acid Cocoa marrón: I_want_you_2311 (flat) → acidcocoa_hoodie + acidcocoa_hoodie2 (result)
   - Hoodie Uranium Acid verde: I_want_you_2320 (flat) → uraniumacid_hoodie (result)
   - Tee Not Labeled blanca: Tabletop (flat) → notlabeled_white + notlabeled_white2 (result)
   - Gorra 5-panel azul: IMG_5964 (flat) → starsmoked_5panel + I_want_a (result, back view)
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/";
const HAT_PRODUCT = "/reodglobe-hat-product.jpg";
const HAT_RESULT_1 = "/reodglobe-hat-result-1.jpg";
const HAT_RESULT_2 = "/reodglobe-hat-result-2.jpg";

const pairs = [
  {
    id: "longsleeve",
    label: "Longsleeve Black",
    tag: "IA Generativa · Modelo con producto",
    flat: CDN + "IMG_6057_0fa76836.webp",
    results: [
      CDN + "mychaosisart_blacktshirt_b57d7d52.jpg",
      CDN + "mychaosisart_blacktshirt2_8c0b76a3.jpg",
    ],
  },
  {
    id: "acidcocoa",
    label: "Hoodie — Acid Cocoa",
    tag: "IA Generativa · Editorial urbano",
    flat: CDN + "I_want_you_2k_202602152311_94ac662b.jpg",
    results: [
      CDN + "acidcocoa_hoodie_e8d1a878.webp",
      CDN + "acidcocoa_hoodie2_7085aaf8.jpg",
    ],
  },
  {
    id: "uraniumacid",
    label: "Hoodie — Uranium Acid",
    tag: "IA Generativa · Lifestyle nocturno",
    flat: CDN + "I_want_you_2k_202602152320_89c6b7be.jpg",
    results: [
      CDN + "uraniumacid_hoodie_a0b08ec5.webp",
    ],
  },
  {
    id: "notlabeled",
    label: "Tee — Not Labeled White",
    tag: "IA Generativa · E-commerce",
    flat: CDN + "Tabletop_photography_of_2k_202602170005_04693124.jpg",
    results: [
      CDN + "notlabeled_white_dcda140f.jpg",
      CDN + "notlabeled_white2_0ee72c04.jpg",
    ],
  },
  {
    id: "starsmoked",
    label: "5-Panel Hat — StarSmoked",
    tag: "IA Generativa · Lifestyle shot",
    flat: HAT_PRODUCT,
    results: [
      HAT_RESULT_1,
      HAT_RESULT_2,
    ],
  },
];

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(images.length - 1, i + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(5,6,10,0.96)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt=""
          className="w-full rounded-2xl object-contain max-h-[80vh]"
          style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
        />

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="px-4 py-2 rounded-lg text-xs border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-20"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              ← ANTERIOR
            </button>
            <span className="text-white/30 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
              {idx + 1} / {images.length}
            </span>
            <button
              onClick={next}
              disabled={idx === images.length - 1}
              className="px-4 py-2 rounded-lg text-xs border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-20"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              SIGUIENTE →
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30"
          style={{ background: "oklch(0.14 0.008 260)" }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ReodGlobeGallery() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index = 0) =>
    setLightbox({ images, index });

  return (
    <>
      <section id="reodglobe-gallery" className="py-20 relative overflow-hidden">
        <div className="container">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="mono-label mb-3" style={{ color: "#FF6B35" }}>
              ✦ ReodGlobe — Imágenes IA
            </p>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Flat → Resultado con IA Generativa
            </h3>
            <p
              className="text-white/40 text-sm leading-relaxed max-w-xl"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Cada producto parte de una fotografía plana (flat) y, mediante modelos LORA
              entrenados sobre la prenda, se generan imágenes de lifestyle y e-commerce con
              modelos reales — sin necesidad de shooting físico.
            </p>
          </motion.div>

          {/* Pairs */}
          <div className="space-y-5">
            {pairs.map((pair, pi) => (
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: pi * 0.07 }}
                className="rounded-2xl border border-white/6 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.015)" }}
              >
                {/* Row header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "#FF6B35", boxShadow: "0 0 8px #FF6B3580" }}
                    />
                    <span
                      className="text-white/80 text-sm font-semibold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {pair.label}
                    </span>
                  </div>
                  <span
                    className="text-white/25 text-xs hidden sm:block"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {pair.tag}
                  </span>
                </div>

                {/* Images row */}
                <div className="p-4 flex items-center gap-3 flex-wrap md:flex-nowrap">
                  {/* Flat */}
                  <div
                    className="relative group cursor-zoom-in shrink-0"
                    style={{ width: "clamp(110px, 20%, 180px)" }}
                    onClick={() => openLightbox([pair.flat], 0)}
                  >
                    <div
                      className="rounded-xl overflow-hidden border border-white/8"
                      style={{ background: "oklch(0.13 0.005 260)", aspectRatio: "1" }}
                    >
                      <img
                        src={pair.flat}
                        alt={pair.label + " flat"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p
                      className="text-white/25 text-xs text-center mt-1.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      FLAT
                    </p>
                  </div>

                  {/* Animated arrow */}
                  <div className="flex flex-col items-center gap-1 shrink-0 px-1">
                    <motion.span
                      animate={{ x: [0, 7, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      className="text-2xl select-none"
                      style={{ color: "#FF6B35", filter: "drop-shadow(0 0 6px #FF6B3560)" }}
                    >
                      →
                    </motion.span>
                    <span
                      className="text-white/15 text-xs"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      IA
                    </span>
                  </div>

                  {/* Results */}
                  <div className="flex gap-3 flex-wrap flex-1">
                    {pair.results.map((url, ri) => (
                      <div
                        key={ri}
                        className="relative group cursor-zoom-in"
                        style={{ width: "clamp(110px, 20%, 180px)" }}
                        onClick={() => openLightbox(pair.results, ri)}
                      >
                        <div
                          className="rounded-xl overflow-hidden border border-[#FF6B35]/20 relative"
                          style={{ background: "oklch(0.13 0.005 260)", aspectRatio: "1" }}
                        >
                          <img
                            src={url}
                            alt={pair.label + " resultado " + (ri + 1)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, transparent 60%)",
                            }}
                          />
                        </div>
                        <p
                          className="text-white/25 text-xs text-center mt-1.5"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {pair.results.length > 1 ? `RESULTADO ${ri + 1}` : "RESULTADO"}
                        </p>
                      </div>
                    ))}

                    {/* Placeholder slot for missing back-of-hat image */}
                    {pair.note && (
                      <div
                        className="shrink-0 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/8"
                        style={{
                          width: "clamp(110px, 20%, 180px)",
                          aspectRatio: "1",
                          background: "oklch(0.11 0.004 260)",
                        }}
                      >
                        <span className="text-white/15 text-xs text-center px-3 leading-relaxed" style={{ fontFamily: "'DM Mono', monospace" }}>
                          VISTA TRASERA
                          <br />PENDIENTE
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
