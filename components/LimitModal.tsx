
import React from 'react';
import { X } from 'lucide-react';
import { SUBSCRIPTION_URL } from '../constants';

export const LimitModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in" aria-modal="true" role="dialog">
      <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl text-center transform transition-transform duration-300 animate-scale-in">
        <button 
          onClick={onClose} 
          title="Zamknij" 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors" 
          aria-label="Zamknij"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-black mb-4">Dzienny limit wyczerpany!</h2>
        <p className="text-gray-700 mb-8">Wykorzystałeś/aś już wszystkie darmowe kolorowanki na dziś. Aby tworzyć bez ograniczeń, sprawdź nasze pakiety!</p>
        <a 
          href={SUBSCRIPTION_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block w-full sm:w-auto px-8 py-3.5 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Zobacz Pakiety
        </a>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
