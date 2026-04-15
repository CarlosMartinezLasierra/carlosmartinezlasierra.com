/* PdfViewer.tsx — Design: "Grain & Glow"
   Renders a PDF inline using pdfjs-dist. Each page is drawn on a canvas.
   Background matches the dark web theme — no flat white. */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfViewerProps {
  url: string;
  title?: string;
}

export default function PdfViewer({ url, title }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(false);

        // Dynamically import pdfjs to avoid SSR issues
        const pdfjsLib = await import("pdfjs-dist");
        // Use locally served worker to avoid CDN fetch issues
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjsLib.getDocument({
          url,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.5.207/cmaps/",
          cMapPacked: true,
        }).promise;

        if (cancelled) return;

        setTotalPages(pdf.numPages);
        const renderedCanvases: HTMLCanvasElement[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) break;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";

          const ctx = canvas.getContext("2d")!;

          // Dark background before rendering
          ctx.fillStyle = "#0d0e14";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport, canvas }).promise;

          // Apply dark overlay tint so PDF blends with the web background
          ctx.globalAlpha = 0.08;
          ctx.fillStyle = "#0a0b10";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;

          renderedCanvases.push(canvas);
        }

        if (!cancelled) {
          setPages(renderedCanvases);
          setLoading(false);
        }
      } catch (err) {
        console.error("PDF load error:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadPdf();
    return () => { cancelled = true; };
  }, [url]);

  // Attach canvases to DOM
  useEffect(() => {
    if (!containerRef.current || pages.length === 0) return;
    containerRef.current.innerHTML = "";
    const canvas = pages[currentPage];
    if (canvas) {
      containerRef.current.appendChild(canvas);
    }
  }, [pages, currentPage]);

  return (
    <>
      {/* PDF Viewer Card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/8"
        style={{ background: "oklch(0.10 0.008 260)" }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/6"
          style={{ background: "oklch(0.12 0.008 260)" }}
        >
          <div className="flex items-center gap-3">
            {/* Traffic lights decoration */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            {title && (
              <span
                className="text-white/40 text-xs"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {totalPages > 0 && (
              <span
                className="text-white/30 text-xs"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {currentPage + 1} / {totalPages}
              </span>
            )}
            <button
              onClick={() => setFullscreen(true)}
              className="text-white/30 hover:text-white/70 transition-colors text-xs"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              ⤢ EXPANDIR
            </button>
          </div>
        </div>

        {/* PDF canvas area */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "500px", background: "oklch(0.09 0.006 260)" }}
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-8 h-8 rounded-full border-2 border-[var(--glow-orange)] border-t-transparent animate-spin"
              />
              <p
                className="text-white/30 text-xs"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                CARGANDO DOCUMENTO...
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <p className="text-white/30 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No se pudo cargar el documento.
              </p>
            </div>
          )}

          {/* Canvas container */}
          <div
            ref={containerRef}
            className="w-full"
            style={{
              display: loading || error ? "none" : "block",
              filter: "contrast(1.02) brightness(0.97)",
            }}
          />
        </div>

        {/* Navigation controls */}
        {totalPages > 1 && !loading && (
          <div
            className="flex items-center justify-center gap-4 px-5 py-3 border-t border-white/6"
            style={{ background: "oklch(0.12 0.008 260)" }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-20"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: currentPage === 0 ? "transparent" : "rgba(255,107,53,0.15)",
                color: currentPage === 0 ? "rgba(255,255,255,0.2)" : "var(--glow-orange)",
                border: "1px solid",
                borderColor: currentPage === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,107,53,0.3)",
              }}
            >
              ← ANTERIOR
            </button>

            {/* Page dots */}
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: currentPage === i ? "20px" : "6px",
                    height: "6px",
                    background: currentPage === i ? "var(--glow-orange)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
              {totalPages > 10 && (
                <span className="text-white/20 text-xs self-center">+{totalPages - 10}</span>
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-20"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: currentPage === totalPages - 1 ? "transparent" : "rgba(255,107,53,0.15)",
                color: currentPage === totalPages - 1 ? "rgba(255,255,255,0.2)" : "var(--glow-orange)",
                border: "1px solid",
                borderColor: currentPage === totalPages - 1 ? "rgba(255,255,255,0.06)" : "rgba(255,107,53,0.3)",
              }}
            >
              SIGUIENTE →
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "oklch(0.07 0.005 260)" }}
          >
            {/* Fullscreen header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-white/6 shrink-0"
              style={{ background: "oklch(0.10 0.008 260)" }}
            >
              <span
                className="text-white/50 text-sm"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {title} — {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setFullscreen(false)}
                className="text-white/40 hover:text-white transition-colors text-sm px-3 py-1 rounded-lg border border-white/10 hover:border-white/20"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                ✕ CERRAR
              </button>
            </div>

            {/* Fullscreen canvas */}
            <div className="flex-1 overflow-auto flex items-start justify-center p-6">
              <div
                className="w-full max-w-4xl rounded-xl overflow-hidden"
                style={{ filter: "contrast(1.02) brightness(0.97)" }}
                ref={(el) => {
                  if (el && pages[currentPage]) {
                    el.innerHTML = "";
                    const clone = pages[currentPage].cloneNode(true) as HTMLCanvasElement;
                    clone.style.width = "100%";
                    clone.style.height = "auto";
                    el.appendChild(clone);
                  }
                }}
              />
            </div>

            {/* Fullscreen navigation */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-center gap-6 px-6 py-4 border-t border-white/6 shrink-0"
                style={{ background: "oklch(0.10 0.008 260)" }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-20"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: "rgba(255,107,53,0.15)",
                    color: "var(--glow-orange)",
                    border: "1px solid rgba(255,107,53,0.3)",
                  }}
                >
                  ← ANTERIOR
                </button>
                <span
                  className="text-white/30 text-xs"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  PÁGINA {currentPage + 1} DE {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-20"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: "rgba(255,107,53,0.15)",
                    color: "var(--glow-orange)",
                    border: "1px solid rgba(255,107,53,0.3)",
                  }}
                >
                  SIGUIENTE →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
