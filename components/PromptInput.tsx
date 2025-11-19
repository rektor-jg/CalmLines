
import React from 'react';
import { Eraser, Dices, WandSparkles, Lightbulb } from 'lucide-react';
import { AppMode, Subject } from '../types';
import { SUBJECTS_CONFIG } from '../constants';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onRandomize: () => void;
  onClear: () => void;
  isLoading: boolean;
  disabled: boolean;
  appMode: AppMode;
  subject: Subject;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  onRandomize, 
  onClear, 
  isLoading, 
  disabled,
  appMode,
  subject
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !disabled) {
      e.preventDefault();
      onGenerate();
    }
  };

  const getModeHint = () => {
    if (appMode === 'classic') return null;

    const config = SUBJECTS_CONFIG.find(s => s.id === subject);
    if (!config) return null;

    let text = `Tryb ${config.label}: `;
    
    switch(subject) {
      case 'angielski': text += "AI doda angielskie podpisy. Wpisz słowo w Opcjach."; break;
      case 'matematyka': text += "Działania matematyczne wkomponowane w rysunek."; break;
      case 'polski': text += "Legendy, litery i polska kultura."; break;
      case 'przyroda': text += "Realistyczne zwierzęta i rośliny."; break;
      case 'muzyka': text += "Instrumenty i nuty muzyczne."; break;
      case 'plastyka': text += "Wzory, mandale i kreatywne kształty."; break;
      case 'fizyka': text += "Proste maszyny i zjawiska fizyczne."; break;
    }

    return {
      text,
      color: config.themeColor,
      bg: config.bgColor
    };
  };

  const hint = getModeHint();

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full group">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={appMode === 'educational' ? `Opisz zadanie z przedmiotu ${SUBJECTS_CONFIG.find(s=>s.id===subject)?.label}...` : "Opisz, co chcesz narysować..."}
          className="w-full py-5 pl-16 pr-36 text-lg bg-white/90 text-black placeholder-gray-400 border-2 border-gray-200 rounded-3xl focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 resize-none shadow-lg shadow-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
          rows={1}
          disabled={isLoading || disabled}
        />
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
           <button 
             onClick={onClear} 
             disabled={isLoading} 
             title="Wyczyść wszystko" 
             className="p-2.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 active:scale-90" 
             aria-label="Wyczyść wszystko"
           >
            <Eraser className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center space-x-2">
          <button 
            onClick={onRandomize} 
            disabled={isLoading || disabled} 
            title="Wylosuj pomysł" 
            className="p-2.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 active:scale-90" 
            aria-label="Wylosuj pomysł"
          >
            <Dices className="w-5 h-5" />
          </button>
          <button 
            onClick={onGenerate} 
            disabled={isLoading || disabled} 
            title="Stwórz" 
            className="p-3.5 bg-black text-white rounded-full shadow-md hover:shadow-xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 disabled:bg-gray-300 disabled:shadow-none disabled:transform-none" 
            aria-label="Stwórz obrazek"
          >
            {isLoading ? <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <WandSparkles className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {hint && (
        <div 
          className="mt-3 flex items-center px-4 py-2 rounded-xl border text-xs font-bold tracking-wide animate-fade-in shadow-sm backdrop-blur-sm select-none"
          style={{ color: hint.color, backgroundColor: hint.bg, borderColor: hint.color + '40' }}
        >
           <Lightbulb className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
           <span>{hint.text}</span>
        </div>
      )}
    </div>
  );
};
