
import React, { useState } from 'react';
import { Scenario, VoteType } from '../types';
import ScenarioCard from '../components/ScenarioCard';
import { useI18n } from '../i18nContext';

interface HomeProps {
  scenarios: Scenario[];
  onVote: (id: string, type: VoteType) => void;
}

const Home: React.FC<HomeProps> = ({ scenarios, onVote }) => {
  const { t } = useI18n();
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <section className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-brand-yellow/10 to-transparent border border-brand-yellow/20">
        <h2 className="text-2xl font-black mb-3 text-gray-900 dark:text-white">{t.hero.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {t.hero.subtitle}
        </p>
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-yellow/20 text-brand-yellow text-xs font-bold rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
          </span>
          <span>{t.hero.liveCount.replace('{count}', '1.2k')}</span>
        </div>
      </section>

      <div className="mb-12 w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700">
        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Ad Slot</span>
      </div>

      <div className="space-y-8">
        {scenarios.slice(0, visibleCount).map(scenario => (
          <ScenarioCard 
            key={scenario.id} 
            scenario={scenario} 
            onVote={onVote}
            onReport={(id) => alert(`Scenario ${id} reported.`)}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => setVisibleCount(v => v + 10)}
          className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl hover:scale-105 transition-transform"
        >
          {t.actions.loadMore}
        </button>
      </div>
    </div>
  );
};

export default Home;
