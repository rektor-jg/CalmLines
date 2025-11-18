
import React from 'react';
import { EXAMPLE_COLORINGS } from '../constants';

interface InspirationSectionProps {
  onExampleClick: (prompt: string) => void;
  isLoading: boolean;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({ onExampleClick, isLoading }) => (
  <div className="w-full text-center p-6 animate-fade-in-up">
    <h2 className="text-xl font-bold text-black mb-6">Zainspiruj się jednym z pomysłów</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {EXAMPLE_COLORINGS.map(({ label, prompt, icon: Icon }) => (
        <button key={prompt} onClick={() => onExampleClick(prompt)} disabled={isLoading} className="group bg-gray-50/60 border border-gray-200/50 rounded-2xl p-4 hover:shadow-lg hover:bg-white/70 hover:-translate-y-1 transition-all duration-300 text-gray-800 flex flex-col items-center justify-center space-y-2 backdrop-blur-md shadow-md disabled:opacity-50 disabled:transform-none">
          <Icon className="w-12 h-12 text-black transition-colors" />
          <p className="font-semibold text-sm text-center">{label}</p>
        </button>
      ))}
    </div>
  </div>
);
