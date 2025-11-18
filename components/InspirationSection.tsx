
import React from 'react';
import { EXAMPLE_COLORINGS } from '../constants';
import { EducationalMode } from '../types';

interface InspirationSectionProps {
  onExampleClick: (prompt: string) => void;
  isLoading: boolean;
  mode: EducationalMode;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({ onExampleClick, isLoading, mode }) => {
  const examples = EXAMPLE_COLORINGS[mode] || EXAMPLE_COLORINGS['Brak'];

  return (
    <div className="w-full text-center p-6 animate-fade-in-up">
      <h2 className="text-xl font-bold text-black mb-6">
        {mode === 'Brak' ? 'Zainspiruj się jednym z pomysłów' : 
         mode === 'Języki' ? 'Nauka słówek - wybierz przykład' : 
         'Matematyczne wyzwania'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {examples.map(({ label, prompt, icon: Icon }) => (
          <button key={prompt} onClick={() => onExampleClick(prompt)} disabled={isLoading} className="group bg-white/60 border border-white/50 rounded-2xl p-4 hover:shadow-lg hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 text-gray-800 flex flex-col items-center justify-center space-y-2 backdrop-blur-md shadow-md disabled:opacity-50 disabled:transform-none">
            <Icon className="w-12 h-12 text-[var(--theme-color)] transition-colors opacity-80 group-hover:opacity-100 group-hover:scale-110 duration-300" />
            <p className="font-semibold text-sm text-center">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
