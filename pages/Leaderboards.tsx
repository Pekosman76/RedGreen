
import React, { useState } from 'react';
import { Scenario, TimeFrame } from '../types';
import ScenarioCard from '../components/ScenarioCard';
import { useI18n } from '../i18nContext';

interface LeaderboardsProps {
  scenarios: Scenario[];
}

const Leaderboards: React.FC<LeaderboardsProps> = ({ scenarios }) => {
  const { t } = useI18n();
  const [timeframe, setTimeframe] = useState<TimeFrame>(TimeFrame.WEEK);

  const sortedScenarios = [...scenarios]
    .filter(s => s.status === 'approved')
    .sort((a, b) => (b.votesGreen + b.votesRed) - (a.votesGreen + a.votesRed));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 tracking-tight">{t.leaderboards.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">{t.leaderboards.desc}</p>
      </div>

      <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {Object.values(TimeFrame).map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-6 py-3 rounded-2xl text-sm font-black capitalize transition-all whitespace-nowrap border-2 ${timeframe === tf ? 'bg-brand-green border-brand-green text-white shadow-xl shadow-emerald-500/20' : 'bg-white dark:bg-gray-800 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            {t.leaderboards[tf]}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {sortedScenarios.slice(0, 15).map((s, idx) => (
          <div key={s.id} className="relative group">
            <div className={`absolute -left-6 md:-left-12 top-8 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-black rounded-2xl shadow-lg z-10 transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-brand-yellow text-white text-2xl' : idx === 1 ? 'bg-gray-300 text-gray-700 text-xl' : idx === 2 ? 'bg-orange-400 text-white text-lg' : 'bg-white dark:bg-gray-700 text-gray-400 text-sm'}`}>
              {idx + 1}
            </div>
            <ScenarioCard 
              scenario={s} 
              onReport={(id) => console.log(`Reported ${id}`)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;
