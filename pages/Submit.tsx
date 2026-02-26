
import React, { useState } from 'react';
import { Category, Scenario } from '../types';
import { moderateText } from '../services/moderationService';
import { useI18n } from '../i18nContext';

interface SubmitProps {
  onNewScenario: (s: Scenario) => void;
}

const Submit: React.FC<SubmitProps> = ({ onNewScenario }) => {
  const { t, locale } = useI18n();
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>(Category.DATING);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Moderate local text first
      const moderation = await moderateText(text, locale);
      
      if (!moderation.isSafe) {
        const errorKey = moderation.reason as keyof typeof t.submit.errors;
        setError(t.submit.errors[errorKey] || t.submit.errors.blocked);
        setLoading(false);
        return;
      }

      // 2. Mocking bilingual translation for database
      // In a real app, this would happen in a Cloud Function
      const newScenario: Scenario = {
        id: Math.random().toString(36).substr(2, 9),
        text_en: locale === 'en' ? text : '[Translation pending]',
        text_fr: locale === 'fr' ? text : '[Traduction en cours]',
        slug_en: `new-${Date.now()}-en`,
        slug_fr: `new-${Date.now()}-fr`,
        category,
        createdAt: Date.now(),
        status: 'pending',
        votesGreen: 0,
        votesRed: 0,
        reportCount: 0,
        scoreHot: 0,
        needsReview: moderation.needsReview
      };

      onNewScenario(newScenario);
      setSuccess(true);
      setText('');
    } catch (err) {
      setError(t.submit.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-pop">
        <div className="text-7xl mb-8">🚀</div>
        <h2 className="text-4xl font-black mb-4">{t.submit.successTitle}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">{t.submit.successDesc}</p>
        <button 
          onClick={() => setSuccess(false)}
          className="px-10 py-4 bg-brand-green text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
        >
          {t.submit.another}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-black mb-4 tracking-tight">{t.submit.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">{t.submit.desc}</p>

      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 mb-8 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <label className="block text-sm font-black mb-3 uppercase tracking-widest text-gray-400">{t.nav.categories}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${category === cat ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-emerald-500/10' : 'bg-gray-50 dark:bg-gray-700 border-transparent text-gray-500 dark:text-gray-400'}`}
                >
                  {t.categories[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-black uppercase tracking-widest text-gray-400">Scenario</label>
              <span className={`text-xs font-bold ${text.length > 180 ? 'text-red-500' : 'text-gray-300'}`}>{text.length} / 180</span>
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.submit.placeholder}
              className="w-full h-40 px-6 py-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-brand-green focus:bg-white dark:focus:bg-gray-800 outline-none transition-all resize-none text-lg font-medium shadow-inner"
            />
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-xl flex items-center gap-3 animate-shake">
                <span className="text-xl">⚠️</span>
                <p className="text-sm text-red-600 dark:text-red-400 font-bold">{error}</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
            <h4 className="font-black mb-3 uppercase tracking-wider">{t.submit.rulesTitle}</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 opacity-80">
              <li className="flex items-start gap-2"><span>✅</span> {t.submit.rule1}</li>
              <li className="flex items-start gap-2"><span>✅</span> {t.submit.rule2}</li>
              <li className="flex items-start gap-2"><span>✅</span> {t.submit.rule3}</li>
              <li className="flex items-start gap-2"><span>✅</span> {t.submit.rule4}</li>
            </ul>
          </div>

          <button 
            type="submit"
            disabled={loading || text.length < 30 || text.length > 180}
            className="w-full py-5 bg-brand-green disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-white text-xl font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
          >
            {loading ? t.submit.checking : t.actions.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
