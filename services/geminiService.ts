import { GoogleGenAI, Modality } from "@google/genai";

export type Category = 'Zwierzęta' | 'Pojazdy' | 'Fantazja' | 'Natura' | 'Jedzenie';
export type LineThickness = 'Grube' | 'Cienkie';
export type AgeGroup = '2-4 lata' | '5-7 lat' | '8+ lat';

export async function generateImage(
    userPrompt: string,
    category: Category,
    lineThickness: LineThickness,
    ageGroup: AgeGroup
): Promise<string> {
  // API key is automatically sourced from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const sanitizedPrompt = userPrompt.trim().toLowerCase();
  
  let subjectPrompt: string;
  // Special case for "kot" to ensure it's a simple cat
  if (sanitizedPrompt === 'kot') {
      subjectPrompt = 'a simple, cute cat';
  } else {
      subjectPrompt = userPrompt.trim();
  }
  
  // Build a specialized prompt based on all inputs
  const promptModifiers: string[] = [
    'coloring book page for a child',
    'fun and cute style',
  ];
  
  // Add category context
  promptModifiers.push(`in the theme of ${category.toLowerCase()}`);
  
  // Add line thickness context
  if (lineThickness === 'Grube') {
    promptModifiers.push('extra thick bold black outlines', 'chunky lines');
  } else {
    promptModifiers.push('thin clean black outlines', 'delicate lines');
  }

  // Add age group context for complexity
  switch (ageGroup) {
    case '2-4 lata':
        promptModifiers.push('extremely simple shapes', 'very large areas to color', 'minimal details', 'perfect for a toddler');
        break;
    case '5-7 lat':
        promptModifiers.push('clear outlines', 'moderate details', 'charming and simple scene', 'suitable for a young child');
        break;
    case '8+ lat':
        promptModifiers.push('more complex scene', 'finer details', 'intricate patterns', 'challenging for an older child');
        break;
  }
  
  // A robust prompt designed to create clean, isolated coloring pages.
  const finalPrompt = `${promptModifiers.join(', ')}, subject: ${subjectPrompt}, isolated on a solid white background, no background details, no shadows, no text, vector style`;

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
          responseModalities: [Modality.IMAGE], // Must be an array with a single `Modality.IMAGE` element.
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
