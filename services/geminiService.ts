
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { Category, LineThickness, AgeGroup, AppMode, Subject, MathOperation } from '../types';
import { buildGenerateImagePrompt, buildImageToImagePrompt } from './promptBuilder';

// Helper to initialize AI
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateStoryScenes(userPrompt: string, ageGroup: AgeGroup): Promise<string[]> {
  const ai = getAI();
  
  const prompt = `
    You are a children's book illustrator. 
    Create 4 distinct scene descriptions for a coloring book based on this theme: "${userPrompt}".
    Target audience age: ${ageGroup}.
    
    The scenes must form a short logical story:
    1. Introduction
    2. Action/Journey
    3. Climax/Fun moment
    4. Conclusion/Rest
    
    Important: Describe the visual elements for a coloring page. Keep the main character consistent in description.
    Return ONLY a JSON array of 4 strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned for story scenes");
    
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error generating story scenes:", error);
    // Fallback if JSON parsing fails
    return [
      `${userPrompt} - Scene 1: The beginning`,
      `${userPrompt} - Scene 2: The adventure`,
      `${userPrompt} - Scene 3: The fun part`,
      `${userPrompt} - Scene 4: The happy ending`
    ];
  }
}

export async function generateImage(
    userPrompt: string,
    category: Category,
    lineThickness: LineThickness,
    ageGroup: AgeGroup,
    appMode: AppMode,
    subject: Subject,
    mathOperation?: MathOperation,
    customVocabulary?: string
): Promise<string> {
  const ai = getAI();
  
  const finalPrompt = buildGenerateImagePrompt(
      userPrompt, 
      category, 
      lineThickness, 
      ageGroup, 
      appMode, 
      subject,
      mathOperation, 
      customVocabulary
  );

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
    ageGroup: AgeGroup,
    appMode: AppMode,
    subject: Subject,
    mathOperation?: MathOperation,
    customVocabulary?: string
): Promise<string> {
  const ai = getAI();

  const finalPrompt = buildImageToImagePrompt(
      lineThickness, 
      ageGroup, 
      appMode, 
      subject,
      mathOperation, 
      customVocabulary
  );

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