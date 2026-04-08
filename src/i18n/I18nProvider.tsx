import { createContext, useContext, useMemo } from 'react';
import { useAuthStore } from '@/store';
import type { Language } from '@/types';
import { translations, type I18nKey } from './translations';

const I18nContext = createContext<{ language: Language; t: (key: I18nKey) => string }>({
  language: 'en',
  t: (key) => translations.en[key],
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const language = (user?.language || 'en') as Language;

  const value = useMemo(
    () => ({
      language,
      t: (key: I18nKey) => translations[language]?.[key] || translations.en[key],
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
