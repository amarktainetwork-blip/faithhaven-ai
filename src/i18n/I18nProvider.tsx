import { createContext, useContext, useMemo } from 'react';
import { useAuthStore, useUIStore } from '@/store';
import type { Language } from '@/types';
import { translations, type I18nKey } from './translations';

const I18nContext = createContext<{ language: Language; t: (key: I18nKey) => string }>({
  language: 'en',
  t: (key) => translations.en[key] ?? key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const { currentLanguage } = useUIStore();
  const language: Language = (user?.language || currentLanguage || 'en') as Language;

  const value = useMemo(
    () => ({
      language,
      t: (key: I18nKey) => translations[language]?.[key] ?? translations.en[key] ?? key,
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
