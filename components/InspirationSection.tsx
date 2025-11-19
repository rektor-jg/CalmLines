
import React from 'react';
import { EXAMPLE_COLORINGS, SUBJECTS_CONFIG } from '../constants';
import { AppMode, Subject } from '../types';

interface InspirationSectionProps {
  onExampleClick: (prompt: string) => void;
  isLoading: boolean;
  appMode: AppMode;
  subject: Subject;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({ onExampleClick, isLoading, appMode, subject }) => {
  const examples = appMode === 'classic' 
    ? EXAMPLE_COLORINGS['classic'] 
    : EXAMPLE_COLORINGS[subject] || [];

  const title = appMode === 'classic' 
    ? 'Zainspiruj się jednym z pomysłów' 
    : `Zadania z przedmiotu: ${SUBJECTS_CONFIG.find(s => s.id === subject)?.label}`;

  return (
    <div className="w-full text-center p-6 animate-fade-in-up">
      <h2 className="text-xl font-bold text-black mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {examples.map(({ label, prompt, icon: Icon }) => (
          <button 
            key={prompt} 
            onClick={() => onExampleClick(prompt)} 
            disabled={isLoading} 
            className="group bg-white/60 border border-white/50 rounded-2xl p-4 hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] text-gray-800 flex flex-col items-center justify-center space-y-2 backdrop-blur-md shadow-md disabled:opacity-50 disabled:transform-none"
          >
            <Icon className="w-10 h-10 text-[var(--theme-color)] transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110" />
            <p className="font-bold text-sm text-center mt-2">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
