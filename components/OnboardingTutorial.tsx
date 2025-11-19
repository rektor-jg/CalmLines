
import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Witaj w Kreatorze!",
      desc: "Stwórz unikalne kolorowanki dla dzieci w kilka sekund przy pomocy sztucznej inteligencji. Zobaczmy, jak to działa.",
      position: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      arrow: null
    },
    {
      title: "Dostosuj Styl",
      desc: "Kliknij tutaj, aby wybrać kategorię, wiek dziecka, grubość linii oraz tryb edukacyjny (np. naukę języków).",
      position: "top-24 left-6 sm:left-24", // Near the top-left toggle button
      arrow: "top-[-10px] left-4 rotate-180"
    },
    {
      title: "Wpisz swój pomysł",
      desc: "Opisz, co chcesz zobaczyć na obrazku. Np. 'Kosmiczny kot jedzący pizzę'.",
      position: "bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-lg", // Above the input bar
      arrow: "bottom-[-10px] left-1/2 transform -translate-x-1/2"
    },
    {
      title: "Wygeneruj!",
      desc: "Kliknij różdżkę, aby stworzyć obrazek, lub kostkę, aby wylosować pomysł.",
      position: "bottom-32 left-1/2 transform translate-x-16 sm:translate-x-32", // Pointing generally towards right side of input
      arrow: "bottom-[-10px] right-8"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col pointer-events-auto">
      {/* Dark Backdrop with cutout hole simulation using simple opacity for now */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" />

      {/* Interactive Card */}
      <div className={`absolute ${currentStep.position} transition-all duration-500 ease-in-out p-4`}>
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full relative animate-scale-in border border-gray-200">
          
          {/* Arrow pointer */}
          {currentStep.arrow && (
            <div className={`absolute w-4 h-4 bg-white transform rotate-45 ${currentStep.arrow}`} />
          )}

          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-black">{currentStep.title}</h3>
            <button 
              onClick={onComplete}
              className="text-gray-400 hover:text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Pomiń
            </button>
          </div>
          
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {currentStep.desc}
          </p>

          <div className="flex items-center justify-between">
            {/* Dots indicator */}
            <div className="flex space-x-1.5">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-black' : 'w-2 bg-gray-200'}`} 
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="flex items-center space-x-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] shadow-md"
            >
              <span>{step === steps.length - 1 ? 'Zaczynamy' : 'Dalej'}</span>
              {step === steps.length - 1 ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
