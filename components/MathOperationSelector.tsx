
import React from 'react';
import { MATH_OPERATIONS } from '../constants';
import { MathOperation } from '../types';

interface MathOperationSelectorProps {
  currentOperation?: MathOperation;
  onOperationChange: (op: MathOperation) => void;
  disabled?: boolean;
}

export const MathOperationSelector: React.FC<MathOperationSelectorProps> = ({ 
  currentOperation, 
  onOperationChange,
  disabled 
}) => {
  return (
    <div className="flex flex-col items-center mb-6 animate-fade-in">
      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
        Wybierz zakres działań
      </span>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {MATH_OPERATIONS.map((op) => {
          const Icon = op.icon;
          const isActive = currentOperation === op.id;
          
          return (
            <button
              key={op.id}
              onClick={() => onOperationChange(op.id)}
              disabled={disabled}
              className={`
                flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border
                ${isActive 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]' 
                  : 'bg-white text-emerald-800 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 hover:scale-[1.02]'}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{op.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
