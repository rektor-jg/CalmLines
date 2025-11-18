
import { LucideIcon } from 'lucide-react';

export type Category = 'Wszystko' | 'Zwierzęta' | 'Pojazdy' | 'Fantazja' | 'Natura' | 'Jedzenie' | 'Sport' | 'Kosmos' | 'Zawody';
export type LineThickness = 'Grube' | 'Cienkie';
export type AgeGroup = '2-4 lata' | '5-7 lat' | '8+ lat';
export type EducationalMode = 'Brak' | 'Języki' | 'Matematyka';

export interface OptionValues {
  category: Category;
  lineThickness: LineThickness;
  ageGroup: AgeGroup;
  educationalMode: EducationalMode;
}

export interface ModeConfig {
  id: EducationalMode;
  label: string;
  icon: LucideIcon;
  themeColor: string;
  description: string;
}
