
import { 
  PawPrint, Truck, Sparkles, Sprout, CakeSlice, 
  Bot, Castle, Rocket, Fish, LayoutGrid,
  Bike, Orbit, HardHat
} from 'lucide-react';
import { Category, AgeGroup, LineThickness } from '../types';

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

export const ALL_PROMPTS = Object.values(CATEGORY_PROMPTS).flat();

export const EXAMPLE_COLORINGS = [
  { label: 'Wesoły robot', prompt: 'wesoły robot bawiący się z psem', icon: Bot },
  { label: 'Zamek na chmurze', prompt: 'zamek księżniczki na chmurze', icon: Castle },
  { label: 'Kosmiczna podróż', prompt: 'kosmiczny statek lecący między planetami', icon: Rocket },
  { label: 'Podwodny świat', prompt: 'podwodny świat z kolorowymi rybkami', icon: Fish },
];

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
  'Wszystko': 'Styl: czysta, urocza ilustracja. Powinien być prosty i łatwy do zrozumienia dla dzieci.',
  'Zwierzęta': 'Styl: urocza, kreskówkowa ilustracja zwierząt. Postacie powinny mieć duże oczy i przyjazne miny. Scena powinna być zabawna i pełna życia.',
  'Pojazdy': 'Styl: prosta, dynamiczna ilustracja pojazdów z zaokrąglonymi krawędziami. Unikaj skomplikowanych mechanizmów. Pojazdy mogą mieć zabawne cechy, jak oczy lub uśmiechy.',
  'Fantazja': 'Styl: baśniowa ilustracja, magiczny, pełen detali. Elementy powinny mieć delikatne, zakrzywione linie. Scena powinna być pełna uroku i tajemniczości.',
  'Natura': 'Styl: spokojna, organiczna ilustracja natury. Formy powinny być uproszczone i stylizowane. Paleta barw (w domyśle) powinna być harmonijna i inspirowana naturą.',
  'Jedzenie': 'Styl: apetyczna, zabawna ilustracja jedzenia. Postacie z jedzenia (np. chodząca pizza) powinny być śmieszne i przyjazne. Używaj przesadnych kształtów.',
  'Sport': 'Styl: dynamiczna, pełna energii ilustracja sportowa. Postacie w ruchu, z przesadzoną ekspresją. Scena powinna oddawać radość z aktywności fizycznej.',
  'Kosmos': 'Styl: kosmiczna, futurystyczna ilustracja z przyjaznymi kosmitami i planetami. Statki kosmiczne powinny mieć zabawne, nietypowe kształty. Tło może zawierać urocze gwiazdki i mgławice.',
  'Zawody': 'Styl: przyjazna, czytelna ilustracja przedstawiająca różne zawody. Postacie powinny być uśmiechnięte i przedstawione w humorystyczny, uproszczony sposób podczas wykonywania swojej pracy.',
};
