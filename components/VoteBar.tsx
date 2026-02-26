
import React from 'react';

interface VoteBarProps {
  green: number;
  red: number;
  showLabels?: boolean;
}

const VoteBar: React.FC<VoteBarProps> = ({ green, red, showLabels = true }) => {
  const total = green + red;
  const greenPct = total === 0 ? 50 : Math.round((green / total) * 100);
  const redPct = 100 - greenPct;

  return (
    <div className="w-full space-y-2 animate-pop">
      <div className="h-4 flex rounded-full overflow-hidden shadow-inner bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-brand-green transition-all duration-700 ease-out"
          style={{ width: `${greenPct}%` }}
        />
        <div 
          className="h-full bg-brand-red transition-all duration-700 ease-out"
          style={{ width: `${redPct}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-brand-green">{greenPct}% Green Flag</span>
          <span className="text-brand-red">{redPct}% Red Flag</span>
        </div>
      )}
    </div>
  );
};

export default VoteBar;
