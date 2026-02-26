
import React, { useState, useEffect } from 'react';
import { Scenario, VoteType } from '../types';
import { getVotesFromStorage, saveVoteToStorage } from '../utils/storage';
import { useI18n } from '../i18nContext';
import VoteBar from './VoteBar';

interface ScenarioCardProps {
  scenario: Scenario;
  onVote?: (id: string, type: VoteType) => void;
  onReport?: (id: string) => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onVote, onReport }) => {
  const { locale, t } = useI18n();
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isReported, setIsReported] = useState(false);

  useEffect(() => {
    const votes = getVotesFromStorage();
    if (votes[scenario.id]) {
      setUserVote(votes[scenario.id]);
    }
  }, [scenario.id]);

  const handleVote = (type: VoteType) => {
    if (userVote) return;
    
    setUserVote(type);
    saveVoteToStorage(scenario.id, type);
    
    if (type === 'red') {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }

    if (onVote) onVote(scenario.id, type);
  };

  const handleReport = () => {
    if (isReported) return;
    setIsReported(true);
    onReport?.(scenario.id);
  };

  const currentGreen = userVote === 'green' ? scenario.votesGreen + 1 : scenario.votesGreen;
  const currentRed = userVote === 'red' ? scenario.votesRed + 1 : scenario.votesRed;
  const displayText = locale === 'fr' ? scenario.text_fr : scenario.text_en;
  const displayCategory = t.categories[scenario.category] || scenario.category;

  if (scenario.reportCount >= 5 && !userVote) return null; // Auto-hide threshold

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-all ${isShaking ? 'animate-shake' : ''} hover:shadow-2xl`}>
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-brand-green rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
          {displayCategory}
        </span>
        <button 
          onClick={handleReport}
          disabled={isReported}
          className={`transition-colors ${isReported ? 'text-red-500 font-bold text-xs flex items-center gap-1' : 'text-gray-400 hover:text-red-500'}`}
          title={t.actions.report}
        >
          {isReported ? (
            <><span>⚠️</span> {t.actions.reported}</>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-xl md:text-2xl font-bold leading-relaxed mb-10 text-gray-800 dark:text-gray-100">
        {displayText}
      </p>

      {!userVote ? (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleVote('green')}
            className="flex flex-col items-center justify-center py-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm"
          >
            <span className="text-4xl mb-2">✅</span>
            <span className="font-extrabold uppercase text-xs tracking-tighter">{t.actions.greenFlag}</span>
          </button>
          <button 
            onClick={() => handleVote('red')}
            className="flex flex-col items-center justify-center py-6 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-2 border-red-100 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm"
          >
            <span className="text-4xl mb-2">🚩</span>
            <span className="font-extrabold uppercase text-xs tracking-tighter">{t.actions.redFlag}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-pop">
          <VoteBar green={currentGreen} red={currentRed} showLabels={true} />
          <div className="text-center pt-2">
            <p className={`font-black text-xl uppercase italic tracking-tighter transform transition-all duration-500 scale-110 ${userVote === 'green' ? 'text-brand-green' : 'text-brand-red'}`}>
              {userVote === 'green' ? t.actions.voteGreen : t.actions.voteRed}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;
