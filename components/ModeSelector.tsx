
import React from 'react';
import { SUBJECTS_CONFIG } from '../constants';
import { AppMode, Subject } from '../types';
import { Palette, GraduationCap, BookOpen } from 'lucide-react';

interface ModeSelectorProps {
  currentAppMode: AppMode;
  onAppModeChange: (mode: AppMode) => void;
  currentSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ 
  currentAppMode, 
  onAppModeChange,
  currentSubject,
  onSubjectChange
}) => {
  return (
    <div className="w-full flex flex-col items-center mb-6 space-y-5 animate-fade-in">
      
      {/* Top Tabs: Classic vs Educational vs Storybook */}
      <div className="bg-white/80 backdrop-blur-lg p-1.5 rounded-full shadow-sm border border-gray-200/60 flex flex-wrap justify-center sm:space-x-1 gap-1 sm:gap-0">
        <button
          onClick={() => onAppModeChange('classic')}
          className={`
            flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex-1 sm:flex-none justify-center
            ${currentAppMode === 'classic' 
              ? 'bg-black text-white shadow-md' 
              : 'text-gray-500 hover:text-black hover:bg-gray-100'}
          `}
        >
          <Palette className="w-4 h-4" />
          <span>Klasyczny</span>
        </button>
        
        <button
          onClick={() => onAppModeChange('educational')}
          className={`
            flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex-1 sm:flex-none justify-center
            ${currentAppMode === 'educational' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}
          `}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Edukacyjny</span>
        </button>

        <button
          onClick={() => onAppModeChange('storybook')}
          className={`
            flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex-1 sm:flex-none justify-center
            ${currentAppMode === 'storybook' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-gray-500 hover:text-amber-600 hover:bg-amber-50'}
          `}
        >
          <BookOpen className="w-4 h-4" />
          <span>Historyjka</span>
        </button>
      </div>

      {/* Sub-menu: Subjects (Only for Educational) */}
      {currentAppMode === 'educational' && (
        <div className="w-full max-w-4xl px-4 pt-4 pb-2 flex justify-center animate-fade-in">
           <div className="flex flex-wrap justify-center gap-3">
             {SUBJECTS_CONFIG.map((subject) => {
               const Icon = subject.icon;
               const isActive = currentSubject === subject.id;
               
               return (
                 <button
                   key={subject.id}
                   onClick={() => onSubjectChange(subject.id)}
                   className={`
                     flex flex-col items-center justify-center p-3 min-w-[90px] rounded-2xl border-2 transition-all duration-300 group
                     ${isActive 
                        ? 'bg-white scale-105 shadow-md' 
                        : 'bg-white/60 border-transparent hover:bg-white hover:border-gray-100 hover:scale-[1.02]'}
                   `}
                   style={{ 
                     borderColor: isActive ? subject.themeColor : 'transparent'
                   }}
                 >
                    <div 
                      className={`p-2.5 rounded-full mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}
                      style={{ backgroundColor: isActive ? subject.themeColor : subject.bgColor }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? 'white' : subject.themeColor }} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      {subject.label}
                    </span>
                 </button>
               );
             })}
           </div>
        </div>
      )}

      {/* Hint for Storybook */}
      {currentAppMode === 'storybook' && (
        <div className="text-center animate-fade-in px-4">
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl py-2 px-4 inline-block font-medium">
                Wpisz temat, a stworzę 4-częściową historyjkę do pokolorowania!
            </p>
        </div>
      )}
    </div>
  );
};