
import { GoogleGenAI, Modality } from "@google/genai";
import { Category, LineThickness, AgeGroup } from '../types';
import { CATEGORY_STYLES } from '../constants';

export async function generateImage(
    userPrompt: string,
    category: Category,
    lineThickness: LineThickness,
    ageGroup: AgeGroup
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const sanitizedPrompt = userPrompt.trim().toLowerCase();
  
  let subjectPrompt: string;
  if (sanitizedPrompt === 'kot') {
      subjectPrompt = 'prosty, uroczy kot';
  } else {
      subjectPrompt = userPrompt.trim();
  }
  
  const categoryStyle = CATEGORY_STYLES[category];

  let sceneDescription: string;
  switch (ageGroup) {
    case '2-4 lata':
        sceneDescription = `pojedynczy, bardzo prosty rysunek obiektu: ${subjectPrompt}. Scena powinna mieć ekstremalnie proste kształty i bardzo duże, łatwe do pokolorowania obszary.`;
        break;
    case '5-7 lat':
        sceneDescription = `urocza, prosta scena przedstawiająca: ${subjectPrompt}. Powinna mieć wyraźne kontury i umiarkowaną ilość detali.`;
        break;
    case '8+ lat':
    default:
        sceneDescription = `szczegółowa i wciągająca scena z: ${subjectPrompt}. Może zawierać drobniejsze detale i bardziej złożone tło.`;
        break;
  }

  const lineStyle = lineThickness === 'Grube' 
    ? 'Rysunek musi mieć bardzo grube, wyraźne, czarne kontury.' 
    : 'Rysunek musi mieć cienkie, czyste, czarne kontury.';

  const finalPrompt = `
    Strona z kolorowanki dla dziecka. ${categoryStyle} Głównym tematem jest ${sceneDescription}. ${lineStyle} Całość musi być izolowana na idealnie białym tle. Bez żadnych cieni, dodatkowych detali w tle, tekstur czy tekstu. Tylko czyste, czarne linie. Styl wektorowy.
  `.trim().replace(/\s+/g, ' ');


  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
          // Removed seed parameter to ensure stability
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("API did not return any images.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Failed to generate image.");
  }
}

export async function generateColoringPageFromImage(
    base64Image: string,
    mimeType: string,
    lineThickness: LineThickness,
    ageGroup: AgeGroup
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const ageModifier = ageGroup === '2-4 lata' 
    ? 'bardzo prosty z dużymi, łatwymi do pokolorowania obszarami' 
    : (ageGroup === '5-7 lat' ? 'prosty z wyraźnymi detalami' : 'ze szczegółami i drobniejszymi elementami');

  const lineModifier = lineThickness === 'Grube' ? 'grube, wyraźne czarne kontury' : 'cienkie, czyste czarne kontury';

  const finalPrompt = `
    Przekształć ten obrazek w stronę z kolorowanki dla dziecka. Styl rysunku: ${ageModifier}. Stwórz ${lineModifier}. Usuń wszystkie kolory, cienie i złożone tekstury. Wynik musi zawierać wyłącznie czarne kontury na idealnie białym tle. Czysty, wektorowy styl.
  `.trim().replace(/\s+/g, ' ');

  const imagePart = {
    inlineData: {
      mimeType: mimeType,
      data: base64Image,
    },
  };
  const textPart = {
    text: finalPrompt
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
      config: {
          responseModalities: [Modality.IMAGE],
          // Removed seed parameter to ensure stability
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("API did not return any images from the uploaded file.");

  } catch (error) {
    console.error("Error processing image with Gemini:", error);
    throw new Error("Failed to process image.");
  }
}
