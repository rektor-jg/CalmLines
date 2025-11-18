
import { Category, LineThickness, AgeGroup, EducationalMode } from '../types';
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

const getEducationModifier = (educationalMode: EducationalMode): string => {
  if (educationalMode === 'Języki') {
    return `Include the Polish word and English translation for the subject below the drawing in outline font (e.g. "KOT / CAT").`;
  } else if (educationalMode === 'Matematyka') {
    return `Include simple math problems (e.g. 2+2) on large empty areas of the drawing.`;
  }
  // Default for Classic mode: Explicitly forbid text unless it's part of the scene description
  return 'Do not add any text, words, captions, or labels to the image unless explicitly requested in the subject description.';
};

export const buildGenerateImagePrompt = (
    userPrompt: string,
    category: Category,
    lineThickness: LineThickness,
    ageGroup: AgeGroup,
    educationalMode: EducationalMode
): string => {
  const sanitizedPrompt = userPrompt.trim();
  const categoryStyle = CATEGORY_STYLES[category];
  const sceneDescription = getAgeDescription(ageGroup, sanitizedPrompt);
  const lineStyle = getLineDescription(lineThickness);
  const educationModifier = getEducationModifier(educationalMode);

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
    educationalMode: EducationalMode
): string => {
  const ageModifier = ageGroup === '2-4 lata' 
    ? 'Simple shapes, low detail' 
    : (ageGroup === '5-7 lat' ? 'Moderate detail' : 'High detail');

  const lineModifier = lineThickness === 'Grube' ? 'Thick bold lines' : 'Thin precise lines';
  
  let educationModifier = '';
  if (educationalMode === 'Języki') {
    educationModifier = `Include text labels in Polish and English.`;
  } else if (educationalMode === 'Matematyka') {
    educationModifier = `Include simple math problems on empty areas.`;
  } else {
    educationModifier = `Do not include any text, words, or labels.`;
  }

  return `
    Task: Convert this image into a coloring book page.
    Style: ${ageModifier}.
    Lines: ${lineModifier}.
    Instructions: ${educationModifier}
    Constraints: Black and white line art only. Remove all original colors and shading. Pure white background.
  `.trim();
};
