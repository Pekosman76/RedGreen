
import React from 'react';
import { useI18n } from '../i18nContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${locale === 'en' ? 'bg-white dark:bg-gray-600 shadow-sm text-brand-green' : 'text-gray-400'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('fr')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${locale === 'fr' ? 'bg-white dark:bg-gray-600 shadow-sm text-brand-green' : 'text-gray-400'}`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
