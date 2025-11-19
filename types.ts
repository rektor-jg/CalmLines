
import { LucideIcon } from 'lucide-react';

export type Category = 'Wszystko' | 'Zwierzęta' | 'Pojazdy' | 'Fantazja' | 'Natura' | 'Jedzenie' | 'Sport' | 'Kosmos' | 'Zawody';
export type LineThickness = 'Grube' | 'Cienkie';
export type AgeGroup = '2-4 lata' | '5-7 lat' | '8+ lat';

export type AppMode = 'classic' | 'educational';

export type Subject = 
  | 'polski' 
  | 'matematyka' 
  | 'przyroda' 
  | 'angielski' 
  | 'muzyka' 
  | 'plastyka' 
  | 'fizyka';

export type MathOperation = 'add_sub_10' | 'add_sub_20' | 'multiplication' | 'shapes';

export interface OptionValues {
  category: Category;
  lineThickness: LineThickness;
  ageGroup: AgeGroup;
  appMode: AppMode;
  subject: Subject; // Defaults to 'angielski' or first available if in educational mode
  mathOperation?: MathOperation;
  customVocabulary?: string;
}

export interface SubjectConfig {
  id: Subject;
  label: string;
  icon: LucideIcon;
  themeColor: string;
  bgColor: string;
}
