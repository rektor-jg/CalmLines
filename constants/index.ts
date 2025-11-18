import React from 'react';
import { 
  PawPrint, Truck, Sparkles, Sprout, CakeSlice, 
  Bot, Castle, Rocket, Fish, LayoutGrid,
  Bike, Orbit, HardHat,
  BookA, Calculator, Palette, Apple, Dog, Hash
} from 'lucide-react';
import { Category, AgeGroup, LineThickness, EducationalMode, ModeConfig } from '../types';

export const DAILY_LIMIT = 4;
export const SUBSCRIPTION_URL = 'https://example.com/subscribe';

export const CATEGORY_PROMPTS: Record<Exclude<Category, 'Wszystko'>, string[]> = {
  'Zwierzęta': ['sowa w okularach czytająca książkę', 'leniwiec w hamaku', 'tańczący hipopotam w spódniczce baletowej', 'lis detektyw z lupą', 'żyrafa w szaliku'],
  'Pojazdy': ['latający autobus szkolny', 'monster truck zrobiony z warzyw', 'wyścigówka prowadzona przez ślimaka', 'statek piracki na kółkach', 'motocykl z koszem dla psa'],
  'Fantazja': ['ogrodowy krasnal na deskorolce', 'podwodny zamek z piasku', 'robot uczący się piec ciasto', 'wróżka zębuszka z wielkim workiem na zęby', 'smok jedzący pizzę'],
  'Natura': ['gadające drzewo opowiadające historie', 'góra z twarzą śpiącego olbrzyma', 'rzeka z mleka i miodu płynąca przez las', 'tęcza, po której można chodzić', 'chmura w kształcie owcy'],
  'Jedzenie': ['chodząca marchewka w kapeluszu', 'dom z piernika z czekoladowym dachem', 'latające spaghetti z klopsikami', 'drzewo, na którym rosną pączki', 'kanapka, która jest statkiem kosmicznym'],
  'Sport': ['koszykówka na Marsie', 'wyścigi żółwi z numerami startowymi', 'pingwiny grające w hokeja', 'słoń próbujący surfować', 'koty uprawiające jogę'],
  'Kosmos': ['kosmita na wakacjach na Ziemi', 'planeta zrobiona w całości z waty cukrowej', 'astronauta sadzący kwiaty na Księżycu', 'zabawny robot naprawiający satelitę', 'gwiazdy tworzące kształt uśmiechniętej buzi'],
  'Zawody': ['kucharz żonglujący warzywami', 'naukowiec z szalonymi włosami i miksturami', 'budowniczy konstruujący wieżę z klocków LEGO', 'strażak ratujący kota z drzewa', 'ogrodnik rozmawiający z kwiatami'],
};

export const LANGUAGE_PROMPTS: string[] = [
  'Kot', 'Pies', 'Dom', 'Jabłko', 'Samochód', 'Drzewo', 'Słońce', 'Księżyc', 'Ryba', 'Ptak', 'Kwiat', 'Piłka', 'Lody', 'Zegar', 'Klucz'
];

export const MATH_PROMPTS: string[] = [
  '3 jabłka', '5 balonów', '2 koty', '4 samochody', '1 słońce', '6 motyli', '3 kaczki', '2 domki', '5 gwiazdek', '4 cukierki'
];

export const ALL_PROMPTS = Object.values(CATEGORY_PROMPTS).flat();

export const MODES_CONFIG: ModeConfig[] = [
  { 
    id: 'Brak', 
    label: 'Klasyczny', 
    icon: Palette, 
    themeColor: 'var(--theme-classic)',
    description: 'Standardowe kolorowanki'
  },
  { 
    id: 'Języki', 
    label: 'Języki', 
    icon: BookA, 
    themeColor: 'var(--theme-lang)',
    description: 'Nauka słówek PL/ENG'
  },
  { 
    id: 'Matematyka', 
    label: 'Matematyka', 
    icon: Calculator, 
    themeColor: 'var(--theme-math)',
    description: 'Działania i cyfry'
  }
];

export const EXAMPLE_COLORINGS: Record<EducationalMode, { label: string, prompt: string, icon: any }[]> = {
  'Brak': [
    { label: 'Wesoły robot', prompt: 'wesoły robot bawiący się z psem', icon: Bot },
    { label: 'Zamek na chmurze', prompt: 'zamek księżniczki na chmurze', icon: Castle },
    { label: 'Kosmiczna podróż', prompt: 'kosmiczny statek lecący między planetami', icon: Rocket },
    { label: 'Podwodny świat', prompt: 'podwodny świat z kolorowymi rybkami', icon: Fish },
  ],
  'Języki': [
    { label: 'Pies / Dog', prompt: 'wesoły pies biegnący za piłką', icon: Dog },
    { label: 'Dom / House', prompt: 'mały domek z ogródkiem', icon: Castle },
    { label: 'Jabłko / Apple', prompt: 'duże czerwone jabłko na stole', icon: Apple },
    { label: 'Kot / Cat', prompt: 'kot śpiący na poduszce', icon: PawPrint },
  ],
  'Matematyka': [
    { label: 'Dodawanie', prompt: 'dwie wesołe żabki na liściu lilii wodnej', icon: Calculator },
    { label: 'Liczby 1-5', prompt: 'pięć balonów lecących w niebo', icon: Hash },
    { label: 'Proste figury', prompt: 'robot zbudowany z kwadratów i trójkątów', icon: Bot },
    { label: 'Odejmowanie', prompt: 'trzy ptaszki siedzące na gałęzi', icon: Sprout },
  ]
};

export const CATEGORIES_DATA: { name: Category, label: string, icon: React.FC<any> }[] = [
    { name: 'Wszystko', label: 'Wszystko', icon: LayoutGrid },
    { name: 'Zwierzęta', label: 'Zwierzęta', icon: PawPrint },
    { name: 'Pojazdy', label: 'Pojazdy', icon: Truck },
    { name: 'Fantazja', label: 'Fantazja', icon: Sparkles },
    { name: 'Natura', label: 'Natura', icon: Sprout },
    { name: 'Jedzenie', label: 'Jedzenie', icon: CakeSlice },
    { name: 'Sport', label: 'Sport', icon: Bike },
    { name: 'Kosmos', label: 'Kosmos', icon: Orbit },
    { name: 'Zawody', label: 'Zawody', icon: HardHat },
];

export const MAIN_CATEGORIES: Category[] = ['Wszystko', 'Zwierzęta', 'Pojazdy', 'Fantazja'];
export const MORE_CATEGORIES: Category[] = ['Natura', 'Jedzenie', 'Sport', 'Kosmos', 'Zawody'];

export const AGE_GROUPS: AgeGroup[] = ['2-4 lata', '5-7 lat', '8+ lat'];
export const LINE_THICKNESSES: LineThickness[] = ['Grube', 'Cienkie'];

export const CATEGORY_STYLES: Record<Category, string> = {
  'Wszystko': 'Style: clean, cute illustration. Simple and easy to understand for children.',
  'Zwierzęta': 'Style: cute, cartoon animal illustration. Characters should have big eyes and friendly expressions. The scene should be fun and lively.',
  'Pojazdy': 'Style: simple, dynamic vehicle illustration with rounded edges. Avoid complex mechanisms. Vehicles can have fun features like eyes or smiles.',
  'Fantazja': 'Style: fairytale illustration, magical, full of details. Elements should have soft, curved lines. The scene should be charming and mysterious.',
  'Natura': 'Style: calm, organic nature illustration. Forms should be simplified and stylized. Harmonious composition inspired by nature.',
  'Jedzenie': 'Style: appetizing, funny food illustration. Food characters (e.g., walking pizza) should be funny and friendly. Use exaggerated shapes.',
  'Sport': 'Style: dynamic, energetic sports illustration. Characters in motion, with exaggerated expressions. The scene should capture the joy of physical activity.',
  'Kosmos': 'Style: cosmic, futuristic illustration with friendly aliens and planets. Spaceships should have funny, unusual shapes. Background can contain cute stars.',
  'Zawody': 'Style: friendly, readable illustration depicting different professions. Characters should be smiling and presented in a humorous, simplified way while working.',
};