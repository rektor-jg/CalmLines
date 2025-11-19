
import React from 'react';
import { Coins, Check, BookOpen, Lock, Image as ImageIcon, CheckSquare, MousePointer2 } from 'lucide-react';

interface HistorySectionProps {
  history: string[];
  onHistoryClick: (imageUrl: string) => void;
  onPremiumClick: () => void;
  isSelectionMode: boolean;
  toggleSelectionMode: () => void;
  selectedImages: string[];
  onDownloadBooklet: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ 
  history, 
  onHistoryClick, 
  onPremiumClick,
  isSelectionMode,
  toggleSelectionMode,
  selectedImages,
  onDownloadBooklet
}) => {
  const totalSlots = 6;
  const hasHistory = history.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Twoje Prace ({history.length})
        </h3>
        
        {hasHistory && (
          <button 
            onClick={toggleSelectionMode}
            className={`
              flex items-center space-x-1.5 text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200
              ${isSelectionMode 
                ? 'bg-black text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'}
            `}
          >
            {isSelectionMode ? <CheckSquare className="w-3 h-3" /> : <MousePointer2 className="w-3 h-3" />}
            <span>{isSelectionMode ? 'Gotowe' : 'Wybierz'}</span>
          </button>
        )}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4 pr-1 custom-scrollbar">
        {Array.from({ length: totalSlots }).map((_, index) => {
          
          // 1. History Item
          if (index < history.length) {
            const imageUrl = history[index];
            const isSelected = selectedImages.includes(imageUrl);
            
            return (
              <button 
                key={`hist-${index}`} 
                onClick={() => onHistoryClick(imageUrl)} 
                className={`
                  group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300
                  ${isSelectionMode ? 'cursor-pointer' : 'cursor-pointer hover:scale-[1.03] hover:shadow-lg'}
                  ${isSelected ? 'ring-2 ring-black ring-offset-2' : 'border border-gray-100'}
                `}
              >
                <img 
                  src={imageUrl} 
                  alt={`Historia ${index + 1}`} 
                  className={`w-full h-full object-cover bg-white transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} 
                />
                
                {/* Selection Overlay */}
                {isSelectionMode && (
                  <div className={`absolute inset-0 transition-colors duration-200 flex items-center justify-center ${isSelected ? 'bg-black/40' : 'bg-transparent hover:bg-black/5'}`}>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected ? 'bg-black border-black scale-100' : 'bg-white/80 border-gray-300 scale-90 opacity-0 group-hover:opacity-100'}
                    `}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                )}

                {/* Hover Actions (View Mode) */}
                {!isSelectionMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                     <span className="text-[10px] font-medium text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">Podgląd</span>
                  </div>
                )}
              </button>
            );
          }

          // 2. Premium Slot
          if (index >= 4) {
            return (
              <button 
                key={`premium-${index}`} 
                onClick={onPremiumClick}
                className="aspect-square rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/50 to-amber-100/50 flex flex-col items-center justify-center group transition-all hover:border-amber-200 hover:shadow-sm hover:scale-[1.02]"
              >
                <div className="w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-[10px] font-bold text-amber-700/70 uppercase tracking-wide">Premium</span>
              </button>
            );
          }

          // 3. Empty Free Slot
          return (
            <div key={`empty-${index}`} className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:text-gray-400 hover:border-gray-200 transition-colors bg-gray-50/30">
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-[10px] font-medium">Wolne</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Action for Booklet */}
      {isSelectionMode && (
        <div className="mt-auto pt-4 animate-fade-in-up">
          <button 
            onClick={onDownloadBooklet}
            disabled={selectedImages.length === 0}
            className={`
              w-full py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 text-sm font-bold shadow-lg transition-all duration-200
              ${selectedImages.length > 0 
                ? 'bg-black text-white hover:bg-gray-800 hover:scale-[1.02]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <BookOpen className="w-4 h-4" />
            <span>Pobierz PDF {selectedImages.length > 0 && `(${selectedImages.length})`}</span>
          </button>
          {selectedImages.length === 0 && (
             <p className="text-[10px] text-center text-gray-400 mt-2">Zaznacz obrazki powyżej</p>
          )}
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};
