
import React from 'react';

interface HistorySectionProps {
  history: string[];
  onHistoryClick: (imageUrl: string) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ history, onHistoryClick }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Historia</h3>
      <div className="grid grid-cols-2 gap-3">
        {history.map((imgUrl, index) => (
          <button key={index} onClick={() => onHistoryClick(imgUrl)} className="aspect-square bg-white p-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <img src={imgUrl} alt={`Historia ${index + 1}`} className="w-full h-full object-cover rounded-sm" />
          </button>
        ))}
        {Array.from({ length: 4 - history.length }).map((_, index) => (
          <div key={index + history.length} className="aspect-square bg-gray-100 rounded-lg border border-dashed border-gray-200"></div>
        ))}
      </div>
    </div>
  );
};
