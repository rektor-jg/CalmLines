import React, { useState, useCallback, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { generateImage, Category, LineThickness, AgeGroup } from './services/geminiService';
import { Spinner } from './components/Spinner';
import { 
  PawPrint, Truck, Sparkles, Sprout, CakeSlice, 
  Bot, Castle, Rocket, Fish, 
  Dices, WandSparkles, ImageIcon, Printer, X 
} from 'lucide-react';

// --- CONSTANTS ---

const DAILY_LIMIT = 4;
const SUBSCRIPTION_URL = 'https://example.com/subscribe';

const CATEGORY_PROMPTS: Record<Category, string[]> = {
  'Zwierzęta': ['uśmiechnięty lew', 'słodki kotek w pudełku', 'dinozaur jedzący lody', 'grupa zwierząt na farmie', 'miś strażak gaszący pożar'],
  'Pojazdy': ['kosmiczny statek', 'ścigające się samochody', 'wóz strażacki', 'koparka na budowie', 'łódź podwodna z okienkami'],
  'Fantazja': ['zamek księżniczki na chmurze', 'wróżka latająca nad łąką', 'pirat na statku szukający skarbu', 'rycerz na lśniącym koniu', 'smok ziejący ogniem'],
  'Natura': ['magiczne drzewo z domkiem', 'góry o wschodzie słońca', 'łąka pełna kolorowych kwiatów', 'wodospad w dżungli', 'rodzina uroczych grzybów w lesie'],
  'Jedzenie': ['ogromny tort urodzinowy', 'góra lodów w pucharku', 'pudełko z wesołymi pączkami', 'pizza z uśmiechniętą buzią', 'koszyk pełen owoców'],
};

const EXAMPLE_COLORINGS = [
  { label: 'Wesoły robot', prompt: 'wesoły robot bawiący się z psem', icon: Bot },
  { label: 'Zamek na chmurze', prompt: 'zamek księżniczki na chmurze', icon: Castle },
  { label: 'Kosmiczna podróż', prompt: 'kosmiczny statek lecący między planetami', icon: Rocket },
  { label: 'Podwodny świat', prompt: 'podwodny świat z kolorowymi rybkami', icon: Fish },
];

const CATEGORIES: { name: Category, label: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { name: 'Zwierzęta', label: 'Zwierzęta', icon: PawPrint },
    { name: 'Pojazdy', label: 'Pojazdy', icon: Truck },
    { name: 'Fantazja', label: 'Fantazja', icon: Sparkles },
    { name: 'Natura', label: 'Natura', icon: Sprout },
    { name: 'Jedzenie', label: 'Jedzenie', icon: CakeSlice },
];

const AGE_GROUPS: AgeGroup[] = ['2-4 lata', '5-7 lat', '8+ lat'];
const LINE_THICKNESSES: LineThickness[] = ['Grube', 'Cienkie'];

// --- TYPE DEFINITIONS ---

interface OptionValues {
  category: Category;
  lineThickness: LineThickness;
  ageGroup: AgeGroup;
}

// --- PRESENTATIONAL COMPONENTS ---

const LimitModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in" aria-modal="true" role="dialog">
      <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl shadow-violet-300/30 text-center transform transition-transform duration-300 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-violet-500 rounded-full hover:bg-violet-100 transition-colors" aria-label="Zamknij">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-violet-700 mb-4">Dzienny limit wyczerpany!</h2>
        <p className="text-slate-600 mb-6">Wykorzystałeś/aś już wszystkie darmowe kolorowanki na dziś. Aby tworzyć bez ograniczeń, sprawdź nasze pakiety!</p>
        <a href={SUBSCRIPTION_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-violet-400 to-pink-300 text-white font-semibold rounded-lg shadow-lg shadow-violet-200/50 hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400">
          Zobacz Pakiety
        </a>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

const PromptInput: React.FC<{
  prompt: string,
  onPromptChange: (value: string) => void,
  onGenerate: () => void,
  onRandomize: () => void,
  isLoading: boolean
}> = ({ prompt, onPromptChange, onGenerate, onRandomize, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="np. uśmiechnięty lew w dżungli"
        className="w-full p-4 pr-28 sm:pr-32 text-lg bg-violet-50/50 text-slate-700 placeholder-violet-300 border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-violet-300 focus:bg-white transition duration-200 resize-none"
        rows={3}
        disabled={isLoading}
      />
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center space-x-2">
        <button onClick={onRandomize} disabled={isLoading} title="Wylosuj pomysł" className="p-2 text-slate-400 hover:text-violet-500 rounded-full hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-300 transition-colors disabled:text-slate-300" aria-label="Wylosuj pomysł">
          <Dices className="w-6 h-6" />
        </button>
        <button onClick={onGenerate} disabled={isLoading} title="Stwórz" className="p-3 bg-gradient-to-br from-violet-300 to-pink-200 text-white rounded-full shadow-lg shadow-violet-200/50 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400 transition-all disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none" aria-label="Stwórz obrazek">
          {isLoading ? <div className="w-6 h-6 border-2 border-white/80 border-t-white rounded-full animate-spin"></div> : <WandSparkles className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

const ColoringOptions: React.FC<{
  options: OptionValues,
  onOptionsChange: React.Dispatch<React.SetStateAction<OptionValues>>,
  isLoading: boolean
}> = ({ options, onOptionsChange, isLoading }) => {
  const handleOptionChange = <K extends keyof OptionValues>(key: K, value: OptionValues[K]) => {
    onOptionsChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-6 pt-6 border-t border-violet-100 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex bg-violet-100/70 rounded-lg p-1">
          {LINE_THICKNESSES.map(thickness => (
            <button key={thickness} onClick={() => handleOptionChange('lineThickness', thickness)} disabled={isLoading} className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 ${options.lineThickness === thickness ? 'bg-white text-violet-500 shadow-sm' : 'text-violet-400 hover:bg-white/50'}`}>
              {thickness} Linie
            </button>
          ))}
        </div>
        <div className="flex bg-violet-100/70 rounded-lg p-1">
          {AGE_GROUPS.map(age => (
            <button key={age} onClick={() => handleOptionChange('ageGroup', age)} disabled={isLoading} className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 ${options.ageGroup === age ? 'bg-white text-violet-500 shadow-sm' : 'text-violet-400 hover:bg-white/50'}`}>
              Wiek {age.replace(' lata', '').replace(' lat', '')}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {CATEGORIES.map(({ name, label, icon: Icon }) => (
          <button key={name} onClick={() => handleOptionChange('category', name)} disabled={isLoading} className={`flex flex-col items-center justify-center text-center p-3 rounded-xl border-2 transition-all duration-200 disabled:opacity-50 ${options.category === name ? 'bg-violet-100 border-violet-300 text-violet-600' : 'bg-white border-transparent text-slate-500 hover:bg-violet-50 hover:border-violet-200'}`}>
            <Icon className="w-8 h-8 mb-1.5" />
            <span className="text-xs font-semibold leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ResultDisplay: React.FC<{
  isLoading: boolean,
  error: string | null,
  activeImage: string | null
}> = ({ isLoading, error, activeImage }) => {
  const handleDownload = (format: 'png' | 'pdf', imageUrl: string) => {
    if (format === 'png') {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'kolorowanka.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const doc = new jsPDF();
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const { width, height } = doc.internal.pageSize;
        const margin = 10;
        const availableWidth = width - margin * 2;
        const availableHeight = height - margin * 2;
        const imgRatio = img.width / img.height;
        let imgWidth = availableWidth;
        let imgHeight = availableWidth / imgRatio;
        if (imgHeight > availableHeight) {
          imgHeight = availableHeight;
          imgWidth = availableHeight * imgRatio;
        }
        const x = (width - imgWidth) / 2;
        const y = (height - imgHeight) / 2;
        doc.addImage(img, 'PNG', x, y, imgWidth, imgHeight);
        doc.save('kolorowanka.pdf');
      };
    }
  };

  const containerClasses = "w-full bg-white rounded-3xl shadow-2xl shadow-violet-100/50 p-6 sm:p-8";

  if (isLoading) return <div className={`${containerClasses} flex justify-center items-center h-96`}><Spinner /></div>;
  if (error) return <div className={`${containerClasses} flex justify-center items-center h-96`}><p className="text-pink-500 text-center px-4">{error}</p></div>;
  if (activeImage) return (
    <div className={`${containerClasses} space-y-4`}>
      <img src={activeImage} alt="Wygenerowana kolorowanka" className="w-full h-auto rounded-xl border border-violet-100" />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <button onClick={() => handleDownload('png', activeImage)} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-violet-100 text-violet-600 font-semibold rounded-lg hover:bg-violet-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-300">
          <ImageIcon className="w-5 h-5" />
          <span>Pobierz Obrazek</span>
        </button>
        <button onClick={() => handleDownload('pdf', activeImage)} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-gradient-to-br from-violet-300 to-pink-200 text-white font-semibold rounded-lg shadow-lg shadow-violet-200/50 hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400">
          <Printer className="w-5 h-5" />
          <span>Pobierz do Druku</span>
        </button>
      </div>
    </div>
  );
  return null;
};

const InspirationSection: React.FC<{ onExampleClick: (prompt: string) => void }> = ({ onExampleClick }) => (
  <div className="w-full text-center">
    <h2 className="text-xl font-bold text-violet-700/80 mb-6">Albo zainspiruj się jednym z pomysłów</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {EXAMPLE_COLORINGS.map(({ label, prompt, icon: Icon }) => (
        <button key={prompt} onClick={() => onExampleClick(prompt)} className="group bg-white rounded-2xl p-4 shadow-lg shadow-violet-100/50 hover:shadow-xl hover:shadow-violet-200/50 hover:-translate-y-1.5 transition-all duration-300 text-slate-700 flex flex-col items-center justify-center space-y-2">
          <Icon className="w-12 h-12 text-violet-300 group-hover:text-pink-300 transition-colors" />
          <p className="font-semibold text-sm">{label}</p>
        </button>
      ))}
    </div>
  </div>
);

const HistorySection: React.FC<{ history: string[], onHistoryClick: (imageUrl: string) => void }> = ({ history, onHistoryClick }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-violet-700/80 mb-4">Historia</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {history.map((imgUrl, index) => (
          <button key={index} onClick={() => onHistoryClick(imgUrl)} className="aspect-square bg-white p-2 rounded-xl shadow-md shadow-violet-100/50 hover:shadow-lg hover:shadow-violet-200/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-300">
            <img src={imgUrl} alt={`Historia ${index + 1}`} className="w-full h-full object-cover rounded-md" />
          </button>
        ))}
        {Array.from({ length: 4 - history.length }).map((_, index) => (
          <div key={index + history.length} className="aspect-square bg-violet-100/50 rounded-xl border-2 border-dashed border-violet-200"></div>
        ))}
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<OptionValues>({
    category: 'Zwierzęta',
    lineThickness: 'Grube',
    ageGroup: '5-7 lat',
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async (promptToUse: string) => {
    if (generationCount >= DAILY_LIMIT) {
      setIsLimitModalOpen(true);
      return;
    }
      
    if (!promptToUse.trim()) {
      setError('Puste pole czeka na Twój pomysł! Wpisz, co mam narysować. ✨');
      return;
    }

    setIsLoading(true);
    setError(null);
    setActiveImage(null);

    try {
      const imageUrl = await generateImage(promptToUse, options.category, options.lineThickness, options.ageGroup);
      setActiveImage(imageUrl);
      setHistory(prev => [imageUrl, ...prev].slice(0, 4));
      setGenerationCount(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setError('Wystąpił błąd podczas generowania obrazka. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  }, [options, generationCount]);

  const handleRandomPrompt = useCallback(() => {
    const categoryPrompts = CATEGORY_PROMPTS[options.category];
    if (categoryPrompts && categoryPrompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryPrompts.length);
        setPrompt(categoryPrompts[randomIndex]);
    }
  }, [options.category]);
  
  const handleExampleClick = useCallback((examplePrompt: string) => {
    setPrompt(examplePrompt);
    handleGenerate(examplePrompt);
  }, [handleGenerate]);

  const handleHistoryClick = useCallback((imageUrl: string) => {
    setActiveImage(imageUrl);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  
  useEffect(() => {
    if (isLoading || activeImage || error) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, activeImage, error]);

  const shouldShowInspiration = !isLoading && !error && !activeImage;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 sm:p-6 lg:p-8 space-y-12">
      <main className="w-full max-w-2xl text-center space-y-12">
        <div ref={resultsRef} className="pt-8 sm:pt-0">
          {shouldShowInspiration ? (
            <InspirationSection onExampleClick={handleExampleClick} />
          ) : (
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              activeImage={activeImage}
            />
          )}
        </div>

        <div className="w-full bg-white rounded-3xl shadow-2xl shadow-violet-100/50 p-6 sm:p-8">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={() => handleGenerate(prompt)}
            onRandomize={handleRandomPrompt}
            isLoading={isLoading}
          />
          <ColoringOptions
            options={options}
            onOptionsChange={setOptions}
            isLoading={isLoading}
          />
        </div>
        
        <HistorySection
          history={history}
          onHistoryClick={handleHistoryClick}
        />
      </main>
      <LimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
    </div>
  );
};

export default App;
