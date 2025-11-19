
import React from 'react';
import { WandSparkles, Dices, Eraser, Zap, Star, Sparkles, Award } from 'lucide-react';
import { Category, AgeGroup, LineThickness } from '../types';
import { CATEGORIES_DATA, MAIN_CATEGORIES, MORE_CATEGORIES } from '../constants';

interface CreatorStudioProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  category: Category;
  onCategoryChange: (cat: Category) => void;
  ageGroup: AgeGroup;
  onAgeGroupChange: (age: AgeGroup) => void;
  lineThickness: LineThickness;
  onLineThicknessChange: (thick: LineThickness) => void;
  onGenerate: () => void;
  onRandomize: () => void;
  isLoading: boolean;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  prompt,
  onPromptChange,
  category,
  onCategoryChange,
  ageGroup,
  onAgeGroupChange,
  lineThickness,
  onLineThicknessChange,
  onGenerate,
  onRandomize,
  isLoading
}) => {

  // Mapping AgeGroup to Visual Complexity Levels
  const complexityLevels: { val: AgeGroup, label: string, icon: any, color: string }[] = [
    { val: '2-4 lata', label: 'Prosty', icon: Star, color: 'text-green-500' },
    { val: '5-7 lat', label: 'Średni', icon: Sparkles, color: 'text-blue-500' },
    { val: '8+ lat', label: 'Mistrz', icon: Award, color: 'text-purple-500' },
  ];

  const currentComplexity = complexityLevels.find(c => c.val === ageGroup) || complexityLevels[1];

  const handleComplexityChange = (val: AgeGroup) => {
    onAgeGroupChange(val);
    // Auto-adjust line thickness based on complexity for better UX
    if (val === '2-4 lata') onLineThicknessChange('Grube');
    else onLineThicknessChange('Cienkie');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onGenerate();
    }
  };

  const allCategories = [...MAIN_CATEGORIES, ...MORE_CATEGORIES];

  return (
    <div className="w-full max-w-3xl mx-auto perspective-1000">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-white p-6 md:p-8 transform transition-all hover:shadow-indigo-500/20">
        
        {/* Header & Complexity Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-black rounded-xl text-white">
                <Zap size={20} fill="currentColor" />
            </div>
            <h2 className="text-xl font-black tracking-tight">Creator Studio</h2>
          </div>

          {/* Complexity Slider / Toggle */}
          <div className="bg-gray-100 p-1.5 rounded-full flex relative">
            {complexityLevels.map((level) => {
              const isActive = ageGroup === level.val;
              const Icon = level.icon;
              return (
                <button
                  key={level.val}
                  onClick={() => handleComplexityChange(level.val)}
                  className={`
                    relative z-10 px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition-all duration-300
                    ${isActive ? 'text-black shadow-sm bg-white' : 'text-gray-400 hover:text-gray-600'}
                  `}
                >
                  <Icon size={14} className={isActive ? level.color : ''} fill={isActive ? "currentColor" : "none"} />
                  <span>{level.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Category Selector */}
        <div className="mb-8">
           <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
              {allCategories.map((cat) => {
                 const catData = CATEGORIES_DATA.find(c => c.name === cat);
                 if(!catData) return null;
                 const Icon = catData.icon;
                 const isActive = category === cat;
                 
                 return (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`
                        flex-shrink-0 snap-center flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 transition-all duration-300 group
                        ${isActive 
                          ? 'border-black bg-black text-white scale-105 shadow-lg' 
                          : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-300 hover:bg-white hover:scale-105'}
                      `}
                    >
                       <Icon size={24} className={`mb-2 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                       <span className="text-[10px] font-bold truncate w-full px-1">{catData.label}</span>
                    </button>
                 );
              })}
           </div>
        </div>

        {/* Main Input Area */}
        <div className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-20 blur transition duration-500 group-hover:opacity-40 ${isLoading ? 'animate-pulse' : ''}`}></div>
            <div className="relative bg-white rounded-[1.8rem] p-2 flex flex-col md:flex-row items-end md:items-center gap-2 shadow-sm">
                
                {/* Random Button */}
                <button 
                  onClick={onRandomize}
                  disabled={isLoading}
                  className="p-4 text-gray-400 hover:text-black hover:bg-gray-50 rounded-2xl transition-colors"
                  title="Wylosuj pomysł"
                >
                   <Dices size={24} />
                </button>

                {/* Text Area */}
                <textarea
                  value={prompt}
                  onChange={(e) => onPromptChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Co rysujemy w stylu: ${currentComplexity.label}?`}
                  className="w-full py-4 px-2 text-lg font-medium placeholder-gray-300 bg-transparent border-none focus:ring-0 resize-none h-16 md:h-auto"
                  rows={1}
                  disabled={isLoading}
                />

                {/* Generate Button */}
                <button
                  onClick={onGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className={`
                    group relative flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300
                    ${isLoading || !prompt.trim() 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                        : 'bg-black hover:scale-105 hover:shadow-indigo-500/30 active:scale-95'}
                  `}
                >
                   <span className="mr-2">{isLoading ? 'Rysuję...' : 'Stwórz'}</span>
                   {isLoading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <WandSparkles size={20} className="group-hover:rotate-12 transition-transform" />
                   )}
                </button>
            </div>
        </div>
        
        {/* Footer hint */}
        <div className="mt-4 text-center">
           <p className="text-xs text-gray-400 font-medium">
              Wybrano: <span className="text-black">{category}</span> • Poziom: <span className="text-black">{currentComplexity.label}</span>
           </p>
        </div>

      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
