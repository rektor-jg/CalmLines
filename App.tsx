
import React, { useRef } from 'react';
import { X, SlidersHorizontal, UploadCloud } from 'lucide-react';
import { useColoringState } from './hooks/useColoringState';
import { PromptInput } from './components/PromptInput';
import { ColoringOptions } from './components/ColoringOptions';
import { ResultDisplay } from './components/ResultDisplay';
import { InspirationSection } from './components/InspirationSection';
import { LimitModal } from './components/LimitModal';

const App: React.FC = () => {
  const {
    prompt, setPrompt,
    options, setOptions,
    activeImage,
    history,
    isLoading,
    error,
    isLimitModalOpen, setIsLimitModalOpen,
    isPanelOpen, setIsPanelOpen,
    isUploadMode,
    fileInputRef,
    clearAll,
    handleClearUpload,
    handleGenerateFromText,
    handleGenerateFromImage,
    handleRandomPrompt,
    handleExampleClick,
    handleHistoryClick,
    handleUploadClick,
    handleFileChange
  } = useColoringState();

  const mainContentRef = useRef<HTMLDivElement>(null);

  const shouldShowInspiration = !isLoading && !error && !activeImage;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-black">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg, image/png, image/webp" />
        
        {/* Side Panel */}
        <aside className={`fixed top-0 left-0 z-40 w-80 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/80 shadow-2xl transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-black">Opcje</h2>
                    <button onClick={() => setIsPanelOpen(false)} title="Zamknij" className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
                        <X />
                    </button>
                </div>
                <ColoringOptions
                  options={options}
                  onOptionsChange={setOptions}
                  isLoading={isLoading}
                  history={history}
                  onHistoryClick={(url) => { handleHistoryClick(url); if(mainContentRef.current) mainContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                />
            </div>
        </aside>

      {/* Main Content */}
      <main ref={mainContentRef} className={`w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-transform duration-300 ease-in-out ${isPanelOpen ? 'lg:translate-x-40' : 'lg:translate-x-0'}`}>
        <div className="fixed top-6 left-6 z-30 flex items-center space-x-2">
            <button onClick={() => setIsPanelOpen(true)} title="Opcje i historia" className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-700 hover:text-black hover:bg-white transition-all">
                <SlidersHorizontal />
            </button>
            <button onClick={handleUploadClick} title="Stwórz kolorowankę ze zdjęcia" className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-700 hover:text-black hover:bg-white transition-all">
                <UploadCloud />
            </button>
        </div>

        <div className="w-full max-w-2xl flex-grow flex items-center justify-center">
          <div className="w-full">
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              activeImage={activeImage}
              isUploadPreview={isUploadMode && !isLoading}
              onClearUpload={handleClearUpload}
            />
          </div>
        </div>
        
        <div className="w-full max-w-3xl mt-8 flex-shrink-0">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={isUploadMode ? handleGenerateFromImage : () => handleGenerateFromText(prompt)}
            onRandomize={handleRandomPrompt}
            onClear={clearAll}
            isLoading={isLoading}
            disabled={isUploadMode}
          />
        </div>
        
         {shouldShowInspiration && (
              <div className="w-full max-w-4xl mt-8">
                <InspirationSection onExampleClick={handleExampleClick} isLoading={isLoading} />
              </div>
         )}

      </main>

      <LimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
       <style>{`
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
