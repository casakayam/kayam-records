import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'en' | 'es';

// Split into two contexts so consumers of t() don't re-render
// when setLanguage reference changes, and vice-versa.
type LangContextType = { language: Language; setLanguage: (l: Language) => void };

const LanguageContext = createContext<LangContextType | null>(null);
const TranslateContext = createContext<(key: string) => string>((k) => k);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Stable reference: only re-creates when language changes
  const langValue = useMemo<LangContextType>(
    () => ({ language, setLanguage }),
    [language]
  );

  // t is stable between renders as long as language doesn't change.
  // useCallback identity is the key: React.memo on children stays effective.
  const t = useCallback(
    (key: string): string => translations[key]?.[language] ?? key,
    [language]
  );

  return (
    <LanguageContext.Provider value={langValue}>
      <TranslateContext.Provider value={t}>
        {children}
      </TranslateContext.Provider>
    </LanguageContext.Provider>
  );
}

// For components that need language/setLanguage (Header, BuildPackage, etc.)
export function useLanguage(): LangContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

// For components that only translate strings (Footer, VideoSection, etc.)
// These won't re-render from parent re-renders — only when language changes.
export function useT(): (key: string) => string {
  return useContext(TranslateContext);
}
