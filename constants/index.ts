
import React from 'react';
import { 
  PawPrint, Truck, Sparkles, Sprout, CakeSlice, 
  Bot, Castle, Rocket, Fish, LayoutGrid,
  Bike, Orbit, HardHat,
  BookA, Calculator, Palette, Apple, Dog, Hash,
  Plus, X as MultiplyIcon, Shapes,
  Music, Feather, Atom, Globe, Leaf, Languages
} from 'lucide-react';
import { Category, AgeGroup, LineThickness, Subject, SubjectConfig, MathOperation } from '../types';

export const DAILY_LIMIT = 4;
export const SUBSCRIPTION_URL = 'https://example.com/subscribe';

// --- CLASSIC PROMPTS ---
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

export const ALL_PROMPTS = Object.values(CATEGORY_PROMPTS).flat();

// --- EDUCATIONAL PROMPTS ---

const POLSKI_PROMPTS = ['Literka A jak Aligator', 'Smok Wawelski', 'Syrenka Warszawska', 'Pan Twardowski na kogucie', 'Złota Kaczka', 'Polskie góry Tatry', 'Bocian na łące', 'Orzeł Biały'];
const MATH_PROMPTS = ['3 jabłka i 2 gruszki', 'geometryczny robot z trójkątów', 'sowa licząca gwiazdy', 'cyfry od 1 do 9 na balonach', 'sklepik z cenami'];
const NATURE_PROMPTS = ['Cykl życia motyla', 'Cztery pory roku na jednym drzewie', 'Obieg wody w przyrodzie', 'Las liściasty i jego mieszkańcy', 'Budowa kwiatu', 'Zwierzęta leśne', 'Segregacja śmieci'];
const ENGLISH_PROMPTS = ['Kot / Cat', 'Pies / Dog', 'Dom / House', 'Szkoła / School', 'Rodzina / Family', 'Kolory / Colors', 'Owoce / Fruits', 'Pogoda / Weather'];
const MUSIC_PROMPTS = ['Klucz wiolinowy i nutki', 'Gitara i perkusja', 'Orkiestra zwierząt', 'Fortepian z klawiszami', 'Dzieci śpiewające piosenkę', 'Trąbka i saksofon'];
const ART_PROMPTS = ['Paleta malarza z farbami', 'Martwa natura z owocami', 'Wielobarwna mozaika', 'Abstrakcyjne kształty', 'Dzieci malujące obraz', 'Rzeźba z gliny'];
const PHYSICS_PROMPTS = ['Magnes przyciągający metal', 'Tęcza i pryzmat (światło)', 'Równoważnia (dźwignia)', 'Rakieta startująca w kosmos', 'Balon na ogrzane powietrze', 'Koła zębate zegara'];

export const SUBJECT_PROMPTS: Record<Subject, string[]> = {
  'polski': POLSKI_PROMPTS,
  'matematyka': MATH_PROMPTS,
  'przyroda': NATURE_PROMPTS,
  'angielski': ENGLISH_PROMPTS,
  'muzyka': MUSIC_PROMPTS,
  'plastyka': ART_PROMPTS,
  'fizyka': PHYSICS_PROMPTS
};

// --- CONFIGS ---

export const SUBJECTS_CONFIG: SubjectConfig[] = [
  { id: 'angielski', label: 'Angielski', icon: Languages, themeColor: '#4f46e5', bgColor: '#eef2ff' },
  { id: 'matematyka', label: 'Matematyka', icon: Calculator, themeColor: '#059669', bgColor: '#ecfdf5' },
  { id: 'polski', label: 'J. Polski', icon: BookA, themeColor: '#dc2626', bgColor: '#fef2f2' },
  { id: 'przyroda', label: 'Przyroda', icon: Sprout, themeColor: '#65a30d', bgColor: '#f7fee7' },
  { id: 'muzyka', label: 'Muzyka', icon: Music, themeColor: '#db2777', bgColor: '#fdf2f8' },
  { id: 'plastyka', label: 'Plastyka', icon: Palette, themeColor: '#9333ea', bgColor: '#faf5ff' },
  { id: 'fizyka', label: 'Fizyka', icon: Atom, themeColor: '#0891b2', bgColor: '#ecfeff' },
];

export const MATH_OPERATIONS: { id: MathOperation, label: string, icon: any }[] = [
  { id: 'add_sub_10', label: 'Dodawanie do 10', icon: Plus },
  { id: 'add_sub_20', label: 'Dodawanie do 20', icon: Hash },
  { id: 'multiplication', label: 'Mnożenie', icon: MultiplyIcon },
  { id: 'shapes', label: 'Figury', icon: Shapes },
];

// --- EXAMPLES ---

const CLASSIC_EXAMPLES = [
  { label: 'Wesoły robot', prompt: 'wesoły robot bawiący się z psem', icon: Bot },
  { label: 'Zamek na chmurze', prompt: 'zamek księżniczki na chmurze', icon: Castle },
  { label: 'Kosmiczna podróż', prompt: 'kosmiczny statek lecący między planetami', icon: Rocket },
  { label: 'Podwodny świat', prompt: 'podwodny świat z kolorowymi rybkami', icon: Fish },
];

export const EXAMPLE_COLORINGS: Record<Subject | 'classic', { label: string, prompt: string, icon: any }[]> = {
  'classic': CLASSIC_EXAMPLES,
  'angielski': [
    { label: 'Pies / Dog', prompt: 'wesoły pies biegnący za piłką', icon: Dog },
    { label: 'Dom / House', prompt: 'mały domek z ogródkiem', icon: Castle },
    { label: 'Jabłko / Apple', prompt: 'duże czerwone jabłko na stole', icon: Apple },
    { label: 'Kot / Cat', prompt: 'kot śpiący na poduszce', icon: PawPrint },
  ],
  'matematyka': [
    { label: 'Dodawanie', prompt: 'dwie wesołe żabki na liściu lilii wodnej', icon: Calculator },
    { label: 'Liczby 1-5', prompt: 'pięć balonów lecących w niebo', icon: Hash },
    { label: 'Proste figury', prompt: 'robot zbudowany z kwadratów i trójkątów', icon: Bot },
    { label: 'Mnożenie', prompt: 'pudełka z cukierkami ułożone równo na półce', icon: LayoutGrid },
  ],
  'polski': [
    { label: 'Literka A', prompt: 'Wielka litera A i aligator', icon: BookA },
    { label: 'Smok Wawelski', prompt: 'Smok Wawelski ziejący ogniem pod zamkiem', icon: Castle },
    { label: 'Syrenka', prompt: 'Syrenka Warszawska nad rzeką Wisłą', icon: Fish },
    { label: 'Ortografia', prompt: 'Góra i chmura (wyrazy z Ó i U)', icon: Feather },
  ],
  'przyroda': [
    { label: 'Las', prompt: 'Las liściasty z grzybami i wiewiórką', icon: Leaf },
    { label: 'Pory roku', prompt: 'Drzewo podzielone na cztery pory roku', icon: Sprout },
    { label: 'Segregacja', prompt: 'Kolorowe kosze na śmieci i recykling', icon: Sparkles },
    { label: 'Woda', prompt: 'Obieg wody: chmury, deszcz, rzeka, morze', icon: Globe },
  ],
  'muzyka': [
    { label: 'Instrumenty', prompt: 'Gitara, trąbka i bębenek', icon: Music },
    { label: 'Klucz wiolinowy', prompt: 'Duży klucz wiolinowy i nutki na pięciolinii', icon: Feather },
    { label: 'Orkiestra', prompt: 'Zwierzęta grające w orkiestrze', icon: Music },
    { label: 'Pianino', prompt: 'Klawisze pianina z bliska', icon: LayoutGrid },
  ],
  'plastyka': [
    { label: 'Paleta barw', prompt: 'Paleta malarska z pędzlami', icon: Palette },
    { label: 'Martwa natura', prompt: 'Misa z owocami na stole', icon: Apple },
    { label: 'Mozaika', prompt: 'Wzór mozaiki z geometrycznych kształtów', icon: Shapes },
    { label: 'Sztuka', prompt: 'Sztaluga z pustym płótnem w pracowni', icon: Palette },
  ],
  'fizyka': [
    { label: 'Magnes', prompt: 'Magnes podkowiasty przyciągający śrubki', icon: Atom },
    { label: 'Kosmos', prompt: 'Układ Słoneczny z planetami', icon: Orbit },
    { label: 'Pryzmat', prompt: 'Pryzmat rozszczepiający światło na tęczę', icon: Sparkles },
    { label: 'Maszyny', prompt: 'Prosta waga szalkowa', icon: HardHat },
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
