
import React, { useState } from 'react';
import { Category, Scenario } from '../types';
import ScenarioCard from '../components/ScenarioCard';
import { useI18n } from '../i18nContext';

interface CategoriesProps {
  scenarios: Scenario[];
}

const Categories: React.FC<CategoriesProps> = ({ scenarios }) => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filtered = activeCategory === 'All' 
    ? scenarios.filter(s => s.status === 'approved')
    : scenarios.filter(s => s.status === 'approved' && s.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-black mb-10 tracking-tight">{t.nav.categories}</h1>
      
      <div className="flex flex-wrap gap-3 mb-16">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-wider transition-all border-2 ${activeCategory === 'All' ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xl scale-105' : 'bg-white dark:bg-gray-800 border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'}`}
        >
          {t.categories.all}
        </button>
        {Object.values(Category).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-wider transition-all border-2 ${activeCategory === cat ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xl scale-105' : 'bg-white dark:bg-gray-800 border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'}`}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(s => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-32 bg-gray-50 dark:bg-gray-800/30 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-gray-700/50">
          <div className="text-6xl mb-6 opacity-30">🔍</div>
          <p className="text-gray-400 font-bold text-xl">{t.categories.empty}</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
