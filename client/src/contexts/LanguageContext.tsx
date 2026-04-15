import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "es" | "en";

interface LanguageContextValue {
  language: Language;
  hasSelection: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    setLanguageState("es");
    setHasSelection(false);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    setHasSelection(true);
    document.documentElement.lang = nextLanguage === "es" ? "es" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = language === "es" ? "es" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      hasSelection,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "es" ? "en" : "es"),
    }),
    [hasSelection, language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
