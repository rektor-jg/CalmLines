
import { useEffect } from 'react';
import { EducationalMode } from '../types';

export const useTheme = (mode: EducationalMode) => {
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'Języki') {
      root.style.setProperty('--theme-color', '#4f46e5'); // Indigo
      root.style.setProperty('--theme-bg', '#eef2ff');
    } else if (mode === 'Matematyka') {
      root.style.setProperty('--theme-color', '#059669'); // Emerald
      root.style.setProperty('--theme-bg', '#ecfdf5');
    } else {
      root.style.setProperty('--theme-color', '#000000'); // Black
      root.style.setProperty('--theme-bg', '#ffffff');
    }
  }, [mode]);
};
