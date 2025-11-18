
import React from 'react';
import { jsPDF } from 'jspdf';
import { Download, Printer, X } from 'lucide-react';
import { Spinner } from './Spinner';

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

  const containerClasses = "w-full aspect-square bg-gray-50/60 border border-gray-200/50 rounded-3xl shadow-lg backdrop-blur-lg flex items-center justify-center p-6";

  if (isLoading) return <div className={containerClasses}><Spinner /></div>;
  if (error) return <div className={containerClasses}><p className="text-red-600 text-center font-semibold px-4">{error}</p></div>;
  if (activeImage) {
    if (isUploadPreview) {
      return (
        <div className="relative w-full space-y-4 animate-fade-in-up">
          <button onClick={onClearUpload} title="Anuluj wgrany obrazek" className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-transform hover:scale-110" aria-label="Anuluj wgrany obrazek">
            <X size={20} />
          </button>
          <img src={activeImage} alt="Podgląd wgranego obrazka" className="w-full h-auto rounded-2xl border-4 border-white shadow-xl" />
          <p className="text-center text-sm text-gray-600 font-semibold">Obrazek gotowy. Kliknij "Stwórz", by zamienić go w kolorowankę!</p>
        </div>
      );
    }

    return (
      <div className="w-full space-y-4 animate-fade-in-up">
        <img src={activeImage} alt="Wygenerowana kolorowanka" className="w-full h-auto rounded-2xl border-4 border-white shadow-xl" />
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
