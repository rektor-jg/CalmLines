
import { useEffect } from 'react';
import { Subject } from '../types';
import { SUBJECTS_CONFIG } from '../constants';

export const useTheme = (subject?: Subject | null) => {
  useEffect(() => {
    const root = document.documentElement;
    
    if (subject) {
      const config = SUBJECTS_CONFIG.find(s => s.id === subject);
      if (config) {
        root.style.setProperty('--theme-color', config.themeColor);
        root.style.setProperty('--theme-bg', config.bgColor);
        return;
      }
    }

    // Default Classic Theme
    root.style.setProperty('--theme-color', '#000000'); 
    root.style.setProperty('--theme-bg', '#ffffff');
    
  }, [subject]);
};
