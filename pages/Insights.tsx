
import React from 'react';
import { Scenario } from '../types';

interface InsightsProps {
  scenarios: Scenario[];
}

const Insights: React.FC<InsightsProps> = ({ scenarios }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">Weekly Insights 🧠</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Article 1 */}
        <article className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="h-40 bg-brand-green/10 rounded-2xl mb-4 flex items-center justify-center">
             <span className="text-4xl">💚</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Top 5 Green Flags in Dating this Week</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Analysis of over 10,000 votes reveals that "emotional consistency" is the ultimate green flag according to our community...
          </p>
          <button className="text-brand-green font-bold text-sm hover:underline">Read Analysis →</button>
        </article>

        {/* Featured Article 2 */}
        <article className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="h-40 bg-brand-red/10 rounded-2xl mb-4 flex items-center justify-center">
             <span className="text-4xl">🚩</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Workplace Red Flags: The Silent Career Killers</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            The "family vibe" in a startup is officially voted as a major red flag by 82% of users. Here is why Gen Z is pushing back...
          </p>
          <button className="text-brand-red font-bold text-sm hover:underline">Read Analysis →</button>
        </article>
      </div>

      <div className="mt-12 p-8 bg-gray-900 text-white rounded-3xl">
        <h3 className="text-2xl font-bold mb-4 italic">"True maturity is knowing which flags you're willing to salute and which you should run away from."</h3>
        <p className="text-gray-400">— RF/GF Editorial Team</p>
      </div>
    </div>
  );
};

export default Insights;
