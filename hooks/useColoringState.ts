
import React, { useState, useCallback, useRef } from 'react';
import { OptionValues, AppMode, Subject } from '../types';
import { DAILY_LIMIT, ALL_PROMPTS, CATEGORY_PROMPTS, SUBJECT_PROMPTS } from '../constants';
import { generateImage, generateColoringPageFromImage, generateStoryScenes } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileHelpers';
import { generateBookletPDF } from '../utils/pdfGenerator';

export const useColoringState = () => {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<OptionValues>({
    category: 'Wszystko',
    lineThickness: 'Grube',
    ageGroup: '5-7 lat',
    appMode: 'classic',
    subject: 'angielski', // Default subject
    mathOperation: 'add_sub_10',
    customVocabulary: ''
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [storyPages, setStoryPages] = useState<string[]>([]); // NEW: For story mode
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
    setStoryPages([]);
    setError(null);
    setUploadedFile(null);
    setIsUploadMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Reset minor options but keep mode
    setOptions(prev => ({
      ...prev,
      category: 'Wszystko',
      lineThickness: 'Grube',
      ageGroup: '5-7 lat',
      customVocabulary: ''
    }));
  }, []);

  const setAppMode = useCallback((mode: AppMode) => {
    clearAll();
    setOptions(prev => ({ ...prev, appMode: mode }));
  }, [clearAll]);
  
  const setSubject = useCallback((subj: Subject) => {
    clearAll();
    setOptions(prev => ({ ...prev, subject: subj }));
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
    
    // If in Language mode and custom vocab is set, we allow empty prompt (because vocab IS the prompt)
    const isLanguageOverride = options.appMode === 'educational' && options.subject === 'angielski' && options.customVocabulary?.trim();

    if (!promptToUse.trim() && !isLanguageOverride) {
      setError('Puste pole czeka na Twój pomysł! Wpisz, co mam narysować. ✨');
      return;
    }

    setIsLoading(true);
    setError(null);
    setActiveImage(null);
    setStoryPages([]);
    if(isPanelOpen) setIsPanelOpen(false);

    try {
      if (options.appMode === 'storybook') {
         // STORY MODE LOGIC
         const scenes = await generateStoryScenes(promptToUse, options.ageGroup);
         
         // Generate images in parallel (or separate promises to track progress if needed)
         // Using Promise.all for speed
         const imagePromises = scenes.map(scene => 
            generateImage(
                scene, // The specific scene description becomes the prompt
                options.category,
                options.lineThickness,
                options.ageGroup,
                'classic', // Use classic prompts for the underlying engine to avoid text constraints
                options.subject,
                undefined,
                undefined
            )
         );

         const generatedImages = await Promise.all(imagePromises);
         setStoryPages(generatedImages);
         setHistory(prev => [...generatedImages.reverse(), ...prev].slice(0, 8)); // Store all in history
         setGenerationCount(prev => prev + 1); // Count as 1 generation for the user? Or 4? Let's be nice and count as 1 interaction

      } else {
          // CLASSIC & EDUCATIONAL LOGIC
          const imageUrl = await generateImage(
              promptToUse, 
              options.category, 
              options.lineThickness, 
              options.ageGroup, 
              options.appMode,
              options.subject,
              options.mathOperation,
              options.customVocabulary
          );

          setActiveImage(imageUrl);
          setHistory(prev => [imageUrl, ...prev].slice(0, 4));
          setGenerationCount(prev => prev + 1);
      }

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
        
        const imageUrl = await generateColoringPageFromImage(
            base64, 
            mimeType, 
            options.lineThickness, 
            options.ageGroup, 
            options.appMode,
            options.subject,
            options.mathOperation,
            options.customVocabulary
        );
        
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
    let promptsToUse: string[] = [];
    
    if (options.appMode === 'educational') {
        promptsToUse = SUBJECT_PROMPTS[options.subject] || [];
    } else {
        // Classic & Storybook (use classic prompts for story inspiration)
        const category = options.category;
        if (category === 'Wszystko') {
          promptsToUse = ALL_PROMPTS;
        } else {
          promptsToUse = CATEGORY_PROMPTS[category as Exclude<typeof options.category, 'Wszystko'>] || [];
        }
    }

    if (promptsToUse.length > 0) {
        const randomIndex = Math.floor(Math.random() * promptsToUse.length);
        const randomP = promptsToUse[randomIndex];
        setPrompt(randomP);
        // Clear vocab if randomizing to avoid confusion
        setOptions(prev => ({...prev, customVocabulary: ''}));
    }
  }, [options.category, options.appMode, options.subject, handleClearUpload]);
  
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
        setStoryPages([]); // Clear story mode if clicking history
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
      if (prev) setSelectedImages([]); 
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
  
  const handleDownloadStory = async () => {
      if (storyPages.length === 0) return;
      setIsLoading(true);
      try {
        await generateBookletPDF(storyPages, prompt || 'Moja Historyjka');
      } catch (e) {
        console.error("Error generating story pdf", e);
        setError("Nie udało się pobrać książeczki.");
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
              setStoryPages([]);
          };
          reader.readAsDataURL(file);
      }
  };

  return {
    prompt, setPrompt,
    options, setOptions,
    setAppMode, setSubject,
    activeImage, setActiveImage,
    storyPages, // Export story pages
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
    selectedImages,
    isSelectionMode,
    toggleSelectionMode,
    handleDownloadBooklet,
    handleDownloadStory
  };
};