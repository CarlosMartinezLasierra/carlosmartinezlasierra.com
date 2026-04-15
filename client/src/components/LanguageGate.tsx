import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

function SpainFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 32"
      className="h-8 w-12 overflow-hidden rounded-md border border-white/15"
    >
      <rect width="48" height="32" fill="#AA151B" />
      <rect y="8" width="48" height="16" fill="#F1BF00" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 32"
      className="h-8 w-12 overflow-hidden rounded-md border border-white/15"
    >
      <rect width="48" height="32" fill="#012169" />
      <path d="M0 0L48 32M48 0L0 32" stroke="#FFF" strokeWidth="7" />
      <path d="M0 0L48 32M48 0L0 32" stroke="#C8102E" strokeWidth="3.5" />
      <path d="M24 0V32M0 16H48" stroke="#FFF" strokeWidth="10" />
      <path d="M24 0V32M0 16H48" stroke="#C8102E" strokeWidth="5" />
    </svg>
  );
}

export default function LanguageGate() {
  const { hasSelection, setLanguage } = useLanguage();

  if (hasSelection) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/82 px-6 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[oklch(0.11_0.008_260/0.96)] p-8 text-center shadow-[0_32px_100px_rgba(0,0,0,0.45)]"
      >
        <p className="mono-label mb-4 text-[var(--glow-orange)]">
          REQUIRED / OBLIGATORIO
        </p>

        <h1 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Selecciona idioma
          <span className="block text-white/55">Select language</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/62 sm:text-base">
          Elige el idioma para entrar en la web.
          <span className="block">Choose your preferred language to continue.</span>
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setLanguage("es")}
            className="rounded-[1.6rem] border border-[var(--glow-orange)] bg-[linear-gradient(180deg,rgba(255,117,24,0.18),rgba(255,117,24,0.06))] px-6 py-6 text-left transition-transform duration-300 hover:-translate-y-1"
          >
            <SpainFlag />
            <span className="mt-4 block font-['Space_Grotesk'] text-2xl font-semibold text-white">
              ESP
            </span>
            <span className="mono-label mt-2 block text-white/55">
              Español
            </span>
          </button>

          <button
            type="button"
            onClick={() => setLanguage("en")}
            className="rounded-[1.6rem] border border-white/12 bg-white/[0.03] px-6 py-6 text-left transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--glow-orange)]"
          >
            <UkFlag />
            <span className="mt-4 block font-['Space_Grotesk'] text-2xl font-semibold text-white">
              ENG
            </span>
            <span className="mono-label mt-2 block text-white/55">
              English
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
