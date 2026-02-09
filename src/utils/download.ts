import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { PageImage, ConversionSettings } from '@/types/pdf';

export function downloadSinglePage(
  page: PageImage,
  documentName: string,
  settings: ConversionSettings
) {
  const extension = settings.format === 'png' ? 'png' : 'jpg';
  const baseName = documentName.replace(/\.pdf$/i, '');
  const fileName = `${baseName}_page${page.pageNumber}.${extension}`;

  // Convert data URL to blob and download
  fetch(page.dataUrl)
    .then(res => res.blob())
    .then(blob => saveAs(blob, fileName));
}

export async function downloadAsZip(
  pages: PageImage[],
  documentName: string,
  settings: ConversionSettings
) {
  const zip = new JSZip();
  const extension = settings.format === 'png' ? 'png' : 'jpg';
  const baseName = documentName.replace(/\.pdf$/i, '');

  // Add each page to the ZIP
  for (const page of pages) {
    if (page.status === 'complete' && page.dataUrl) {
      const fileName = `${baseName}_page${page.pageNumber}.${extension}`;
      
      // Extract base64 data from data URL
      const base64Data = page.dataUrl.split(',')[1];
      zip.file(fileName, base64Data, { base64: true });
    }
  }

  // Generate and download the ZIP
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${baseName}_images.zip`);
}
