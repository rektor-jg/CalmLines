
import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Spinner } from './Spinner';
import { downloadImage, downloadPDF } from '../utils/pdfGenerator';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  activeImage: string | null;
  isUploadPreview: boolean;
  onClearUpload: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, activeImage, isUploadPreview, onClearUpload }) => {
  const handleDownload = (format: 'png' | 'pdf', imageUrl: string) => {
    if (format === 'png') {
      downloadImage(imageUrl, 'kolorowanka.png');
    } else {
      downloadPDF(imageUrl, 'kolorowanka.pdf');
    }
  };

  const containerClasses = "w-full max-h-[60vh] aspect-square bg-gray-50/60 border border-gray-200/50 rounded-3xl shadow-lg backdrop-blur-lg flex items-center justify-center p-6 mx-auto";

  if (isLoading) return <div className={containerClasses}><Spinner /></div>;
  if (error) return <div className={containerClasses}><p className="text-red-600 text-center font-semibold px-4">{error}</p></div>;
  if (activeImage) {
    if (isUploadPreview) {
      return (
        <div className="relative w-full max-w-lg mx-auto space-y-4 animate-fade-in-up">
          <button onClick={onClearUpload} title="Anuluj wgrany obrazek" className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-transform hover:scale-110" aria-label="Anuluj wgrany obrazek">
            <X size={20} />
          </button>
          <img src={activeImage} alt="Podgląd wgranego obrazka" className="w-full h-auto max-h-[50vh] object-contain rounded-2xl border-4 border-white shadow-xl bg-white" />
          <p className="text-center text-sm text-gray-600 font-semibold">Obrazek gotowy. Kliknij "Stwórz", by zamienić go w kolorowankę!</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-lg mx-auto space-y-4 animate-fade-in-up">
        <img src={activeImage} alt="Wygenerowana kolorowanka" className="w-full h-auto max-h-[50vh] object-contain rounded-2xl border-4 border-white shadow-xl bg-white" />
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <button 
            onClick={() => handleDownload('png', activeImage)} 
            title="Zapisz kolorowankę jako plik obrazka (PNG)"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black backdrop-blur-md border border-gray-300 shadow-md"
          >
            <Download className="w-5 h-5" />
            <span>Pobierz Obrazek</span>
          </button>
          <button 
            onClick={() => handleDownload('pdf', activeImage)} 
            title="Pobierz gotowy plik PDF do wydruku (A4)"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Printer className="w-5 h-5" />
            <span>Pobierz do Druku</span>
          </button>
        </div>
      </div>
    );
  }
  return null;
};
