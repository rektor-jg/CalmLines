
import { Category, LineThickness, AgeGroup, AppMode, Subject, MathOperation } from '../types';
import { CATEGORY_STYLES } from '../constants';

const getLineDescription = (thickness: LineThickness): string => 
  thickness === 'Grube' ? 'Thick, bold outlines.' : 'Thin, precise outlines.';

const getAgeDescription = (ageGroup: AgeGroup, prompt: string): string => {
  switch (ageGroup) {
    case '2-4 lata':
        return `A very simple single object: ${prompt}. Simple shapes, large empty areas.`;
    case '5-7 lat':
        return `A simple scene featuring: ${prompt}. Clear outlines, moderate detail.`;
    case '8+ lat':
    default:
        return `A detailed scene featuring: ${prompt}. Intricate details.`;
  }
};

const getSubjectInstruction = (
    subject: Subject, 
    mathOperation?: MathOperation, 
    customVocabulary?: string
): string => {
  switch (subject) {
    case 'angielski':
       if (customVocabulary && customVocabulary.trim().length > 0) {
         return `IMPORTANT: The main subject of the image MUST BE '${customVocabulary}'. Include the text label '${customVocabulary}' and its Polish/English translation below the drawing in outline font.`;
       }
       return `Include the Polish word and English translation for the subject below the drawing in outline font (e.g. "KOT / CAT").`;

    case 'matematyka':
      // General math instruction since selector is removed from UI
      return 'Include simple math problems (addition, subtraction, or simple multiplication like 2+2) on large empty areas suitable for children to solve.';

    case 'polski':
      return `Focus on Polish culture, legends, or alphabet. If a letter is mentioned (e.g. 'Literka A'), draw the letter large and clear next to the object.`;

    case 'przyroda':
      return `Focus on nature, biology, or geography accuracy suitable for a child. Depict plants, animals, or natural phenomena clearly.`;

    case 'muzyka':
      return `Focus on musical instruments, notes, or musical notation. Draw instruments accurately but simplified for coloring. Include music notes in the background.`;

    case 'plastyka':
      return `Focus on art, creativity, and patterns. Use outlines that encourage creative coloring (e.g. mandalas, paint brushes, mosaics).`;

    case 'fizyka':
      return `Focus on physical phenomena (gravity, magnetism, space, machines) in a fun, simplified way suitable for kids.`;

    default:
      return '';
  }
};

export const buildGenerateImagePrompt = (
    userPrompt: string,
    category: Category,
    lineThickness: LineThickness,
    ageGroup: AgeGroup,
    appMode: AppMode,
    subject: Subject,
    mathOperation?: MathOperation,
    customVocabulary?: string
): string => {
  // If Custom Vocabulary is present in English mode, it overrides userPrompt
  let effectivePrompt = userPrompt.trim();
  if (appMode === 'educational' && subject === 'angielski' && customVocabulary && customVocabulary.trim()) {
      effectivePrompt = customVocabulary.trim(); 
  }

  const categoryStyle = CATEGORY_STYLES[category];
  const sceneDescription = getAgeDescription(ageGroup, effectivePrompt);
  const lineStyle = getLineDescription(lineThickness);
  
  let educationModifier = 'Do not add any text, words, captions, or labels to the image unless explicitly requested in the subject description.';
  
  if (appMode === 'educational') {
    educationModifier = getSubjectInstruction(subject, mathOperation, customVocabulary);
  }

  return `
    Task: Generate a coloring book page for children.
    Subject: ${sceneDescription}
    Art Style: ${categoryStyle}
    Line Style: ${lineStyle}
    Special Instructions: ${educationModifier}
    Constraints: Black and white line art only. Pure white background. No gray scaling, no shading, no colors. High contrast. Do not include the prompt text as a title.
  `.trim();
};

export const buildImageToImagePrompt = (
    lineThickness: LineThickness,
    ageGroup: AgeGroup,
    appMode: AppMode,
    subject: Subject,
    mathOperation?: MathOperation,
    customVocabulary?: string
): string => {
  const ageModifier = ageGroup === '2-4 lata' 
    ? 'Simple shapes, low detail' 
    : (ageGroup === '5-7 lat' ? 'Moderate detail' : 'High detail');

  const lineModifier = lineThickness === 'Grube' ? 'Thick bold lines' : 'Thin precise lines';
  
  let educationModifier = 'Do not add any text.';
  if (appMode === 'educational') {
     educationModifier = getSubjectInstruction(subject, mathOperation, customVocabulary);
  }

  return `
    Task: Convert this image into a coloring book page.
    Style: ${ageModifier}.
    Lines: ${lineModifier}.
    Instructions: ${educationModifier}
    Constraints: Black and white line art only. Remove all original colors and shading. Pure white background.
  `.trim();
};
