
import React from 'react';
import { Download, Printer, X, BookOpen } from 'lucide-react';
import { Spinner } from './Spinner';
import { downloadImage, downloadPDF } from '../utils/pdfGenerator';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  activeImage: string | null;
  storyPages?: string[];
  isUploadPreview: boolean;
  onClearUpload: () => void;
  onDownloadStory?: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  isLoading, 
  error, 
  activeImage, 
  storyPages = [],
  isUploadPreview, 
  onClearUpload,
  onDownloadStory
}) => {
  const handleDownload = (format: 'png' | 'pdf', imageUrl: string) => {
    if (format === 'png') {
      downloadImage(imageUrl, 'kolorowanka.png');
    } else {
      downloadPDF(imageUrl, 'kolorowanka.pdf');
    }
  };

  const containerClasses = "w-full min-h-[40vh] bg-gray-50/60 border border-gray-200/50 rounded-3xl shadow-lg backdrop-blur-lg flex items-center justify-center p-6 mx-auto transition-all duration-500";

  if (isLoading) return <div className={containerClasses}><Spinner /></div>;
  if (error) return <div className={containerClasses}><p className="text-red-600 text-center font-semibold px-4">{error}</p></div>;

  // --- STORYBOOK MODE DISPLAY ---
  if (storyPages.length > 0) {
     return (
       <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {storyPages.map((img, index) => (
                <div key={index} className="relative group">
                   <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm z-10">
                      Strona {index + 1}
                   </div>
                   <img 
                      src={img} 
                      alt={`Strona ${index + 1}`} 
                      className="w-full h-auto object-contain rounded-2xl border-2 border-white shadow-md bg-white transition-transform hover:scale-[1.01]" 
                   />
                   <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-sm p-1 rounded-lg">
                      <button onClick={() => handleDownload('png', img)} className="p-1.5 bg-white text-black rounded-md hover:bg-gray-100 shadow-sm" title="Pobierz PNG"><Download size={14}/></button>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="flex justify-center">
             <button 
                onClick={onDownloadStory}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-700 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
             >
                <BookOpen className="w-6 h-6" />
                <span>Pobierz całą książeczkę (PDF)</span>
             </button>
          </div>
       </div>
     );
  }

  // --- CLASSIC/SINGLE IMAGE DISPLAY ---
  if (activeImage) {
    if (isUploadPreview) {
      return (
        <div className="relative w-full max-w-lg mx-auto space-y-4 animate-fade-in-up">
          <button 
            onClick={onClearUpload} 
            title="Anuluj wgrany obrazek" 
            className="absolute top-4 right-4 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/80 transition-all duration-200 hover:scale-110 backdrop-blur-sm" 
            aria-label="Anuluj wgrany obrazek"
          >
            <X size={20} />
          </button>
          <img src={activeImage} alt="Podgląd wgranego obrazka" className="w-full h-auto max-h-[50vh] object-contain rounded-3xl border-4 border-white shadow-xl bg-white" />
          <p className="text-center text-sm text-gray-600 font-semibold">Obrazek gotowy. Kliknij "Stwórz", by zamienić go w kolorowankę!</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in-up">
        <img src={activeImage} alt="Wygenerowana kolorowanka" className="w-full h-auto max-h-[50vh] object-contain rounded-3xl border-4 border-white shadow-xl bg-white" />
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button 
            onClick={() => handleDownload('png', activeImage)} 
            title="Zapisz kolorowankę jako plik obrazka (PNG)"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Download className="w-5 h-5" />
            <span>Zapisz PNG</span>
          </button>
          <button 
            onClick={() => handleDownload('pdf', activeImage)} 
            title="Pobierz gotowy plik PDF do wydruku (A4)"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Printer className="w-5 h-5" />
            <span>Drukuj (PDF)</span>
          </button>
        </div>
      </div>
    );
  }
  return null;
};