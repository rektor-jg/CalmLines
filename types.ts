
export type Category = 'Wszystko' | 'Zwierzęta' | 'Pojazdy' | 'Fantazja' | 'Natura' | 'Jedzenie' | 'Sport' | 'Kosmos' | 'Zawody';
export type LineThickness = 'Grube' | 'Cienkie';
export type AgeGroup = '2-4 lata' | '5-7 lat' | '8+ lat';

export interface OptionValues {
  category: Category;
  lineThickness: LineThickness;
  ageGroup: AgeGroup;
}
