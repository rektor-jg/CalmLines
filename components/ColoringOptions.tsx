
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OptionValues, Category } from '../types';
import { CATEGORIES_DATA, MAIN_CATEGORIES, MORE_CATEGORIES, AGE_GROUPS, LINE_THICKNESSES } from '../constants';
import { HistorySection } from './HistorySection';

interface ColoringOptionsProps {
  options: OptionValues;
  onOptionsChange: React.Dispatch<React.SetStateAction<OptionValues>>;
  isLoading: boolean;
  history: string[];
  onHistoryClick: (imageUrl: string) => void;
}

export const ColoringOptions: React.FC<ColoringOptionsProps> = ({ options, onOptionsChange, isLoading, history, onHistoryClick }) => {
  const [showMore, setShowMore] = useState(false);

  const handleOptionChange = <K extends keyof OptionValues>(key: K, value: OptionValues[K]) => {
    onOptionsChange(prev => ({ ...prev, [key]: value }));
  };

  const CategoryButton = ({ name }: { name: Category }) => {
    const categoryData = CATEGORIES_DATA.find(c => c.name === name);
    if (!categoryData) return null;
    const { label, icon: Icon } = categoryData;
    
    return (
      <button 
        onClick={() => handleOptionChange('category', name)} 
        disabled={isLoading} 
        title={`Wybierz temat: ${label}`}
        className={`flex items-center space-x-3 text-left w-full p-3 rounded-lg transition-all duration-200 disabled:opacity-50 ${options.category === name ? 'bg-black text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Icon className="w-6 h-6" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
       <div>
        <div className="space-y-3">
          <div className="flex bg-gray-200 rounded-lg p-1">
            {LINE_THICKNESSES.map(thickness => (
              <button 
                key={thickness} 
                onClick={() => handleOptionChange('lineThickness', thickness)} 
                disabled={isLoading} 
                title={`Ustaw grubość linii na: ${thickness}`}
                className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 ${options.lineThickness === thickness ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {thickness} Linie
              </button>
            ))}
          </div>
          <div className="flex bg-gray-200 rounded-lg p-1">
            {AGE_GROUPS.map(age => (
              <button 
                key={age} 
                onClick={() => handleOptionChange('ageGroup', age)} 
                disabled={isLoading} 
                title={`Dostosuj poziom trudności dla wieku: ${age}`}
                className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 ${options.ageGroup === age ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Wiek {age.replace(' lata', '').replace(' lat', '')}
              </button>
            ))}
          </div>
        </div>
       </div>
       <div>
         <div className="space-y-1">
          {MAIN_CATEGORIES.map(name => <CategoryButton key={name} name={name} />)}
           <button 
             onClick={() => setShowMore(prev => !prev)} 
             disabled={isLoading} 
             title={showMore ? "Zwiń listę kategorii" : "Rozwiń więcej kategorii"}
             className={`flex items-center space-x-3 text-left w-full p-3 rounded-lg transition-all duration-200 disabled:opacity-50 text-gray-700 hover:bg-gray-100`}
           >
            <ChevronDown className={`w-6 h-6 transition-transform ${showMore ? 'rotate-180' : ''}`} />
            <span>Więcej...</span>
          </button>
          {showMore && (
            <div className="pl-4 pt-1 space-y-1 border-l-2 border-gray-200 animate-fade-in-down">
              {MORE_CATEGORIES.map(name => <CategoryButton key={name} name={name} />)}
            </div>
          )}
        </div>
      </div>
       <div className="mt-8 pt-6 border-t border-gray-200">
          <HistorySection
            history={history}
            onHistoryClick={onHistoryClick}
          />
        </div>
      <style>{`
        @keyframes fade-in-down { 
          from { opacity: 0; transform: translateY(-10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
