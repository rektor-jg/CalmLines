
import { useState, useCallback, useRef } from 'react';
import { OptionValues } from '../types';
import { DAILY_LIMIT, ALL_PROMPTS, CATEGORY_PROMPTS } from '../constants';
import { generateImage, generateColoringPageFromImage } from '../services/geminiService';

export const useColoringState = () => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<OptionValues>({
    category: 'Wszystko',
    lineThickness: 'Grube',
    ageGroup: '5-7 lat',
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploadMode, setIsUploadMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearAll = useCallback(() => {
    setPrompt('');
    setActiveImage(null);
    setError(null);
    setUploadedFile(null);
    setIsUploadMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOptions({
      category: 'Wszystko',
      lineThickness: 'Grube',
      ageGroup: '5-7 lat',
    });
  }, []);

  const handleClearUpload = useCallback(() => {
    setActiveImage(null);
    setUploadedFile(null);
    setIsUploadMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);
  
  const handleGenerateFromText = useCallback(async (promptToUse: string) => {
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
    if(isPanelOpen) setIsPanelOpen(false);


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
  }, [options, generationCount, isPanelOpen]);

   const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const mimeType = result.split(';')[0].split(':')[1];
                const base64 = result.split(',')[1];
                resolve({ base64, mimeType });
            };
            reader.onerror = error => reject(error);
        });
    };

  const handleGenerateFromImage = useCallback(async () => {
    if (!uploadedFile) return;

    if (generationCount >= DAILY_LIMIT) {
        setIsLimitModalOpen(true);
        return;
    }

    setIsLoading(true);
    setError(null);
    if(isPanelOpen) setIsPanelOpen(false);

    try {
        const { base64, mimeType } = await fileToBase64(uploadedFile);
        const imageUrl = await generateColoringPageFromImage(base64, mimeType, options.lineThickness, options.ageGroup);
        setActiveImage(imageUrl);
        setHistory(prev => [imageUrl, ...prev].slice(0, 4));
        setGenerationCount(prev => prev + 1);
    } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas przetwarzania obrazka. Spróbuj ponownie.');
    } finally {
        setIsLoading(false);
        handleClearUpload();
    }
  }, [options, generationCount, isPanelOpen, uploadedFile, handleClearUpload]);


  const handleRandomPrompt = useCallback(() => {
    handleClearUpload();
    let promptsToUse: string[];
    const category = options.category;

    if (category === 'Wszystko') {
      promptsToUse = ALL_PROMPTS;
    } else {
      promptsToUse = CATEGORY_PROMPTS[category as Exclude<typeof options.category, 'Wszystko'>] || [];
    }

    if (promptsToUse.length > 0) {
        const randomIndex = Math.floor(Math.random() * promptsToUse.length);
        setPrompt(promptsToUse[randomIndex]);
    }
  }, [options.category, handleClearUpload]);
  
  const handleExampleClick = useCallback((examplePrompt: string) => {
    handleClearUpload();
    setPrompt(examplePrompt);
    handleGenerateFromText(examplePrompt);
  }, [handleGenerateFromText, handleClearUpload]);

  const handleHistoryClick = useCallback((imageUrl: string) => {
    handleClearUpload();
    setActiveImage(imageUrl);
    setIsPanelOpen(false);
  }, [handleClearUpload]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setActiveImage(reader.result as string);
              setUploadedFile(file);
              setIsUploadMode(true);
              setError(null);
              setPrompt('');
          };
          reader.readAsDataURL(file);
      }
  };

  return {
    prompt, setPrompt,
    options, setOptions,
    activeImage, setActiveImage,
    history, setHistory,
    isLoading, setIsLoading,
    error, setError,
    generationCount, setGenerationCount,
    isLimitModalOpen, setIsLimitModalOpen,
    isPanelOpen, setIsPanelOpen,
    uploadedFile, setUploadedFile,
    isUploadMode, setIsUploadMode,
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
  };
};
