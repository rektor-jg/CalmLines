import { GoogleGenAI, Modality } from "@google/genai";

export type Category = 'Zwierzęta' | 'Pojazdy' | 'Fantazja' | 'Natura' | 'Jedzenie';
export type LineThickness = 'Grube' | 'Cienkie';
export type AgeGroup = '2-4 lata' | '5-7 lat' | '8+ lat';

const CATEGORY_STYLES: Record<Category, string> = {
  'Zwierzęta': 'uroczy, kreskówkowy styl',
  'Pojazdy': 'prosty, dynamiczny styl',
  'Fantazja': 'magiczny, baśniowy, whimsical',
  'Natura': 'spokojny, organiczny styl',
  'Jedzenie': 'apetyczny, zabawny styl',
};

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
    Urocza strona z kolorowanki dla dziecka.
    Styl: ${categoryStyle}.
    Głównym tematem jest ${sceneDescription}
    ${lineStyle}
    Całość musi być izolowana na idealnie białym tle. Bez żadnych cieni, dodatkowych detali w tle, tekstur czy tekstu. Tylko czyste linie. Styl wektorowy.
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
