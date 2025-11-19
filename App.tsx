
import React, { useRef, useState, useEffect } from 'react';
import { X, SlidersHorizontal, UploadCloud } from 'lucide-react';
import { useColoringState } from './hooks/useColoringState';
import { useTheme } from './hooks/useTheme';
import { PromptInput } from './components/PromptInput';
import { ColoringOptions } from './components/ColoringOptions';
import { ResultDisplay } from './components/ResultDisplay';
import { InspirationSection } from './components/InspirationSection';
import { LimitModal } from './components/LimitModal';
import { ModeSelector } from './components/ModeSelector';
import { OnboardingTutorial } from './components/OnboardingTutorial';

const App: React.FC = () => {
  const {
    prompt, setPrompt,
    options, setOptions, setAppMode, setSubject,
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
    handleFileChange,
    // Booklet state
    isSelectionMode,
    toggleSelectionMode,
    selectedImages,
    handleDownloadBooklet
  } = useColoringState();

  const mainContentRef = useRef<HTMLDivElement>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  // Apply theme variables
  useTheme(options.appMode === 'educational' ? options.subject : null);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial_v1');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('hasSeenTutorial_v1', 'true');
    setShowTutorial(false);
  };

  const shouldShowInspiration = !isLoading && !error && !activeImage;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-black bg-[var(--theme-bg)] transition-colors duration-500">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg, image/png, image/webp" />
        
        {showTutorial && <OnboardingTutorial onComplete={handleTutorialComplete} />}

        {/* Mobile Backdrop */}
        {isPanelOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setIsPanelOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Side Panel */}
        <aside className={`fixed top-0 left-0 z-50 w-80 h-full bg-white/90 backdrop-blur-xl border-r border-gray-200/80 shadow-2xl transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-black">Opcje</h2>
                    <button 
                      onClick={() => setIsPanelOpen(false)} 
                      title="Zamknij" 
                      className="p-2.5 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                    >
                        <X size={24} />
                    </button>
                </div>
                <ColoringOptions
                  options={options}
                  onOptionsChange={setOptions}
                  isLoading={isLoading}
                  history={history}
                  onHistoryClick={(url) => { handleHistoryClick(url); if(!isSelectionMode && mainContentRef.current) mainContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                  onPremiumClick={() => setIsLimitModalOpen(true)}
                  isSelectionMode={isSelectionMode}
                  toggleSelectionMode={toggleSelectionMode}
                  selectedImages={selectedImages}
                  onDownloadBooklet={handleDownloadBooklet}
                />
            </div>
        </aside>

      {/* Floating Buttons (Settings & Upload) */}
      <div className={`fixed top-6 z-30 flex items-center space-x-3 transition-all duration-300 ease-in-out ${isPanelOpen ? 'left-6 lg:left-[22rem]' : 'left-6'}`}>
          {!isPanelOpen && (
            <button 
              onClick={() => setIsPanelOpen(true)} 
              title="Opcje i historia" 
              className="p-3.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-700 hover:text-black hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-white/50"
            >
                <SlidersHorizontal size={24} />
            </button>
          )}
          <button 
            onClick={handleUploadClick} 
            title="Stwórz kolorowankę ze zdjęcia" 
            className="p-3.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-gray-700 hover:text-black hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 border border-white/50"
          >
              <UploadCloud size={24} />
          </button>
      </div>

      {/* Main Content */}
      <main 
        ref={mainContentRef} 
        className={`w-full min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ${isPanelOpen ? 'lg:pl-80' : 'lg:pl-0'}`}
      >

        <div className="w-full max-w-4xl mt-16 sm:mt-4 flex flex-col items-center">
           <ModeSelector 
             currentAppMode={options.appMode} 
             onAppModeChange={setAppMode}
             currentSubject={options.subject}
             onSubjectChange={setSubject}
           />
        </div>

        <div className="w-full max-w-2xl flex-grow flex items-center justify-center min-h-[40vh]">
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
        
        <div className="w-full max-w-3xl mt-8 flex-shrink-0 mb-8 relative z-20">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={isUploadMode ? handleGenerateFromImage : () => handleGenerateFromText(prompt)}
            onRandomize={handleRandomPrompt}
            onClear={clearAll}
            isLoading={isLoading}
            disabled={isUploadMode}
            appMode={options.appMode}
            subject={options.subject}
          />
        </div>
        
         {shouldShowInspiration && (
              <div className="w-full max-w-4xl mt-4 mb-12">
                <InspirationSection 
                  onExampleClick={handleExampleClick} 
                  isLoading={isLoading} 
                  appMode={options.appMode}
                  subject={options.subject}
                />
              </div>
         )}

      </main>

      <LimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
       <style>{`
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
