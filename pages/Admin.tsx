import React from 'react';
import { Scenario } from '../types';
// Add i18n context to handle localized text and categories
import { useI18n } from '../i18nContext';

interface AdminProps {
  scenarios: Scenario[];
  setScenarios: React.Dispatch<React.SetStateAction<Scenario[]>>;
}

const Admin: React.FC<AdminProps> = ({ scenarios, setScenarios }) => {
  // Use translations and locale for the admin dashboard
  const { locale, t } = useI18n();
  const pending = scenarios.filter(s => s.status === 'pending');

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setScenarios(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Moderation Queue</h1>
        <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
          {pending.length} Pending
        </span>
      </div>

      {pending.length === 0 ? (
        <div className="p-20 text-center bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-400">Queue is clear! Great job, moderator. ☕️</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pending.map(s => (
            <div key={s.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-grow">
                {/* Use localized category names */}
                <span className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                  {t.categories[s.category] || s.category}
                </span>
                {/* Fix: Use text_fr or text_en based on locale as Scenario interface lacks a generic 'text' property */}
                <p className="text-lg font-medium">"{locale === 'fr' ? s.text_fr : s.text_en}"</p>
              </div>
              <div className="flex space-x-2 w-full md:w-auto">
                <button 
                  onClick={() => updateStatus(s.id, 'approved')}
                  className="flex-1 md:flex-none px-6 py-2 bg-brand-green text-white font-bold rounded-xl hover:bg-emerald-600"
                >
                  Approve
                </button>
                <button 
                  onClick={() => updateStatus(s.id, 'rejected')}
                  className="flex-1 md:flex-none px-6 py-2 bg-brand-red text-white font-bold rounded-xl hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;