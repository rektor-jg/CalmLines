
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OptionValues, Category } from '../types';
import { CATEGORIES_DATA, MAIN_CATEGORIES, MORE_CATEGORIES, AGE_GROUPS, LINE_THICKNESSES } from '../constants';
import { HistorySection } from './HistorySection';

interface ColoringOptionsProps {
  options: OptionValues;
  onOptionsChange: React.Dispatch<React.SetStateAction<OptionValues>>;
  isLoading: boolean;
  history: string[];
  onHistoryClick: (imageUrl: string) => void;
  onPremiumClick: () => void;
  isSelectionMode: boolean;
  toggleSelectionMode: () => void;
  selectedImages: string[];
  onDownloadBooklet: () => void;
}

export const ColoringOptions: React.FC<ColoringOptionsProps> = ({ 
  options, 
  onOptionsChange, 
  isLoading, 
  history, 
  onHistoryClick, 
  onPremiumClick,
  isSelectionMode,
  toggleSelectionMode,
  selectedImages,
  onDownloadBooklet
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleOptionChange = <K extends keyof OptionValues>(key: K, value: OptionValues[K]) => {
    onOptionsChange(prev => ({ ...prev, [key]: value }));
  };

  // Helper for rendering category cards
  const renderCategoryCard = (name: Category) => {
    const categoryData = CATEGORIES_DATA.find(c => c.name === name);
    if (!categoryData) return null;
    const { label, icon: Icon } = categoryData;
    const isActive = options.category === name;
    
    return (
      <button 
        key={name}
        onClick={() => handleOptionChange('category', name)} 
        disabled={isLoading} 
        title={label}
        className={`
          flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group
          ${isActive 
            ? 'bg-black text-white border-black shadow-md transform scale-[1.02]' 
            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:scale-[1.02]'}
        `}
      >
        <Icon className={`w-6 h-6 mb-1.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full pb-20"> 
       
       {/* Configuration Section */}
       <div className="space-y-6 mb-8">
            
            {/* Educational Mode Specific Options */}
            {options.appMode === 'educational' && options.subject === 'angielski' && (
               <div className="space-y-2 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider px-1">Słowo do nauki</h3>
                  <input 
                    type="text"
                    value={options.customVocabulary || ''}
                    onChange={(e) => handleOptionChange('customVocabulary', e.target.value)}
                    placeholder="np. Dom / House"
                    className="w-full p-3 text-sm border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white text-indigo-900 placeholder-indigo-300 transition-shadow duration-200"
                  />
                  <p className="text-[10px] text-indigo-400 px-1 leading-tight">
                    Wpisz słowo, a stworzymy obrazek specjalnie dla niego.
                  </p>
               </div>
            )}

            {/* Age Group */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Wiek dziecka</h3>
              <div className="flex p-1 bg-gray-100/80 rounded-xl border border-gray-200/50">
                {AGE_GROUPS.map(age => {
                   const isActive = options.ageGroup === age;
                   return (
                    <button 
                      key={age} 
                      onClick={() => handleOptionChange('ageGroup', age)} 
                      disabled={isLoading}
                      className={`
                        flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-white text-black shadow-sm ring-1 ring-black/5 scale-[1.02]' 
                          : 'text-gray-500 hover:text-black hover:bg-white/50'}
                      `}
                    >
                      {age.replace(' lata', '').replace(' lat', '')}
                    </button>
                   );
                })}
              </div>
            </div>

            {/* Line Thickness */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Linie</h3>
              <div className="grid grid-cols-2 gap-3">
                {LINE_THICKNESSES.map(thickness => {
                  const isActive = options.lineThickness === thickness;
                  return (
                    <button 
                      key={thickness} 
                      onClick={() => handleOptionChange('lineThickness', thickness)} 
                      disabled={isLoading} 
                      className={`
                        py-3 px-4 text-sm font-bold rounded-xl border transition-all duration-200
                        ${isActive 
                          ? 'border-black bg-black text-white shadow-md scale-[1.02]' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-black'}
                      `}
                    >
                      {thickness}
                    </button>
                  );
                })}
              </div>
            </div>
       </div>

       {/* Categories Grid - Show only if in classic mode */}
       {options.appMode === 'classic' && (
         <div className="mb-8">
           <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Temat</h3>
           </div>
           
           <div className="grid grid-cols-3 gap-2">
              {MAIN_CATEGORIES.map(name => renderCategoryCard(name))}
              
              {showMore && MORE_CATEGORIES.map(name => renderCategoryCard(name))}

              <button 
                 onClick={() => setShowMore(!showMore)}
                 className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
              >
                 {showMore ? <ChevronUp className="w-5 h-5 mb-1" /> : <ChevronDown className="w-5 h-5 mb-1" />}
                 <span className="text-[10px] font-bold">{showMore ? 'Mniej' : 'Więcej'}</span>
              </button>
           </div>
        </div>
      )}
      
      {options.appMode === 'educational' && (
         <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium">
               W trybie edukacyjnym kategoria dobierana jest automatycznie do przedmiotu szkolnego.
            </p>
         </div>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

      {/* History Section - Always Visible */}
      <div className="flex-grow">
        <HistorySection
          history={history}
          onHistoryClick={onHistoryClick}
          onPremiumClick={onPremiumClick}
          isSelectionMode={isSelectionMode}
          toggleSelectionMode={toggleSelectionMode}
          selectedImages={selectedImages}
          