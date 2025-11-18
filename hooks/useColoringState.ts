
import React, { useState, useCallback, useRef } from 'react';
import { OptionValues, EducationalMode } from '../types';
import { DAILY_LIMIT, ALL_PROMPTS, CATEGORY_PROMPTS, LANGUAGE_PROMPTS, MATH_PROMPTS } from '../constants';
import { generateImage, generateColoringPageFromImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileHelpers';
import { generateBookletPDF } from '../utils/pdfGenerator';

export const useColoringState = () => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<OptionValues>({
    category: 'Wszystko',
    lineThickness: 'Grube',
    ageGroup: '5-7 lat',
    educationalMode: 'Brak',
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
  
  // Booklet features
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

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
    // Keep the current mode but reset other options
    setOptions(prev => ({
      ...prev,
      category: 'Wszystko',
      lineThickness: 'Grube',
      ageGroup: '5-7 lat',
    }));
  }, []);

  const setMode = useCallback((mode: EducationalMode) => {
    clearAll();
    setOptions(prev => ({ ...prev, educationalMode: mode }));
  }, [clearAll]);

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
      const imageUrl = await generateImage(promptToUse, options.category, options.lineThickness, options.ageGroup, options.educationalMode);

      setActiveImage(imageUrl);
      setHistory(prev => [imageUrl, ...prev].slice(0, 4));
      setGenerationCount(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setError('Ojej! Coś poszło nie tak podczas rysowania. Sprawdź połączenie lub spróbuj zmienić opis.');
    } finally {
      setIsLoading(false);
    }
  }, [options, generationCount, isPanelOpen]);

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
        
        const imageUrl = await generateColoringPageFromImage(base64, mimeType, options.lineThickness, options.ageGroup, options.educationalMode);
        
        setActiveImage(imageUrl);
        setHistory(prev => [imageUrl, ...prev].slice(0, 4));
        setGenerationCount(prev => prev + 1);
    } catch (err) {
        console.error(err);
        setError('Nie udało się zamienić tego zdjęcia w kolorowankę. Upewnij się, że zdjęcie jest wyraźne i spróbuj ponownie.');
    } finally {
        setIsLoading(false);
        handleClearUpload();
    }
  }, [options, generationCount, isPanelOpen, uploadedFile, handleClearUpload]);


  const handleRandomPrompt = useCallback(() => {
    handleClearUpload();
    let promptsToUse: string[];
    
    if (options.educationalMode === 'Języki') {
      promptsToUse = LANGUAGE_PROMPTS;
    } else if (options.educationalMode === 'Matematyka') {
      promptsToUse = MATH_PROMPTS;
    } else {
      const category = options.category;
      if (category === 'Wszystko') {
        promptsToUse = ALL_PROMPTS;
      } else {
        promptsToUse = CATEGORY_PROMPTS[category as Exclude<typeof options.category, 'Wszystko'>] || [];
      }
    }

    if (promptsToUse.length > 0) {
        const randomIndex = Math.floor(Math.random() * promptsToUse.length);
        setPrompt(promptsToUse[randomIndex]);
    }
  }, [options.category, options.educationalMode, handleClearUpload]);
  
  const handleExampleClick = useCallback((examplePrompt: string) => {
    handleClearUpload();
    setPrompt(examplePrompt);
    handleGenerateFromText(examplePrompt);
  }, [handleGenerateFromText, handleClearUpload]);

  const handleHistoryClick = useCallback((imageUrl: string) => {
    if (isSelectionMode) {
        toggleImageSelection(imageUrl);
    } else {
        handleClearUpload();
        setActiveImage(imageUrl);
        setIsPanelOpen(false);
    }
  }, [handleClearUpload, isSelectionMode]);

  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(prev => {
      if (prev) setSelectedImages([]); // Clear selections when exiting mode
      return !prev;
    });
  };

  const handleDownloadBooklet = async () => {
    if (selectedImages.length === 0) return;
    setIsLoading(true);
    try {
      await generateBookletPDF(selectedImages, 'Moja Kolorowanka');
      setSelectedImages([]);
      setIsSelectionMode(false);
    } catch (e) {
      console.error("Error generating booklet", e);
      setError("Nie udało się wygenerować książeczki.");
    } finally {
      setIsLoading(false);
    }
  };

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
    setMode,
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
    handleFileChange,
    // Booklet props
    selectedImages,
    isSelectionMode,
    toggleSelectionMode,
    handleDownloadBooklet
  };
};
