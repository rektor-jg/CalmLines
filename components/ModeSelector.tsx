
import React from 'react';
import { MODES_CONFIG } from '../constants';
import { EducationalMode } from '../types';

interface ModeSelectorProps {
  currentMode: EducationalMode;
  onModeChange: (mode: EducationalMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-1.5 rounded-full shadow-lg flex space-x-1 sm:space-x-2 max-w-full overflow-x-auto">
        {MODES_CONFIG.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                relative px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 outline-none whitespace-nowrap
                ${isActive ? 'bg-white shadow-md text-black scale-105' : 'text-gray-500 hover:text-gray-800 hover:bg-white/40'}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--theme-color)]' : ''}`} />
              <span className={`text-sm font-semibold ${isActive ? 'text-black' : ''}`}>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
