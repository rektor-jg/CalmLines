
import React from 'react';
import { Eraser, Dices, WandSparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onRandomize: () => void;
  onClear: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, onGenerate, onRandomize, onClear, isLoading, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !disabled) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Opisz, co chcesz narysować..."
        className="w-full py-4 pl-16 pr-32 text-lg bg-gray-50/80 text-black placeholder-gray-500 border border-gray-300/60 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white/80 transition duration-300 resize-none shadow-lg backdrop-blur-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
        rows={1}
        disabled={isLoading || disabled}
      />
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
         <button onClick={onClear} disabled={isLoading} title="Wyczyść wszystko" className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:text-gray-400" aria-label="Wyczyść wszystko">
          <Eraser className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center space-x-2">
        <button onClick={onRandomize} disabled={isLoading || disabled} title="Wylosuj pomysł" className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:text-gray-400" aria-label="Wylosuj pomysł">
          <Dices className="w-6 h-6" />
        </button>
        <button onClick={onGenerate} disabled={isLoading || disabled} title="Stwórz" className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:bg-gray-400 disabled:shadow-none" aria-label="Stwórz obrazek">
          {isLoading ? <div className="w-6 h-6 border-2 border-white/80 border-t-white rounded-full animate-spin"></div> : <WandSparkles className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};
