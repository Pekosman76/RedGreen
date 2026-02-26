
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from './types';
import { translations } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // 1. Check URL path if using real routing, otherwise fallback to storage
    const saved = localStorage.getItem('rf_gf_locale') as Locale;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      const browserLang = navigator.language.split('-')[0];
      const detected = browserLang === 'fr' ? 'fr' : 'en';
      setLocaleState(detected);
      document.documentElement.lang = detected;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('rf_gf_locale', l);
    document.cookie = `rf_gf_locale=${l}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = l;
  };

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
