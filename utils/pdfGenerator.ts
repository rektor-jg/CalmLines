
import { jsPDF } from 'jspdf';

// Helper to load image and get dimensions
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

// Helper to calculate dimensions to fit A4
const calculateFitDimensions = (
  imgWidth: number, 
  imgHeight: number, 
  pageWidth: number, 
  pageHeight: number, 
  margin: number
) => {
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;
  const imgRatio = imgWidth / imgHeight;
  
  let finalWidth = availableWidth;
  let finalHeight = availableWidth / imgRatio;
  
  if (finalHeight > availableHeight) {
    finalHeight = availableHeight;
    finalWidth = availableHeight * imgRatio;
  }

  const x = (pageWidth - finalWidth) / 2;
  const y = (pageHeight - finalHeight) / 2;

  return { x, y, width: finalWidth, height: finalHeight };
};

export const downloadImage = (imageUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPDF = (imageUrl: string, filename: string) => {
  const doc = new jsPDF();
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    const { width, height } = doc.internal.pageSize;
    const dims = calculateFitDimensions(img.width, img.height, width, height, 10);
    doc.addImage(img, 'PNG', dims.x, dims.y, dims.width, dims.height);
    doc.save(filename);
  };
};

export const generateBookletPDF = async (images: string[], title: string = "Moja Kolorowanka") => {
  if (images.length === 0) return;

  const doc = new jsPDF();
  const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;

  // Title Page
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(title, pageWidth / 2, pageHeight / 3, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Data utworzenia: ${new Date().toLocaleDateString()}`, pageWidth / 2, (pageHeight / 3) + 15, { align: "center" });
  
  doc.text("Wygenerowano za pomocą AI Coloring Page Generator", pageWidth / 2, pageHeight - 20, { align: "center" });

  // Add images
  for (const imageUrl of images) {
    try {
      const img = await loadImage(imageUrl);
      doc.addPage();
      const dims = calculateFitDimensions(img.width, img.height, pageWidth, pageHeight, 15);
      doc.addImage(img, 'PNG', dims.x, dims.y, dims.width, dims.height);
    } catch (error) {
      console.error("Could not add image to booklet", error);
    }
  }

  doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};
