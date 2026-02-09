import { useState, useCallback, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { PageImage, ConversionSettings, PDFDocument, ConversionStatus } from '@/types/pdf';

// Set up PDF.js worker using unpkg CDN which has all versions
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
const DEFAULT_SETTINGS: ConversionSettings = {
  format: 'png',
  quality: 0.92,
  scale: 2.0,
};

export function usePDFConverter() {
  const [document, setDocument] = useState<PDFDocument | null>(null);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ConversionSettings>(DEFAULT_SETTINGS);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);

  const resetState = useCallback(() => {
    setDocument(null);
    setStatus('idle');
    setProgress(0);
    setError(null);
    if (pdfDocRef.current) {
      pdfDocRef.current.destroy();
      pdfDocRef.current = null;
    }
  }, []);

  const loadPDF = useCallback(async (file: File) => {
    resetState();
    setStatus('loading');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      pdfDocRef.current = pdfDoc;

      const pageCount = pdfDoc.numPages;
      const pages: PageImage[] = Array.from({ length: pageCount }, (_, i) => ({
        pageNumber: i + 1,
        dataUrl: '',
        width: 0,
        height: 0,
        status: 'pending',
      }));

      setDocument({
        file,
        name: file.name,
        pageCount,
        pages,
      });

      setStatus('converting');
      await convertPages(pdfDoc, pages, settings);
      setStatus('complete');
    } catch (err) {
      console.error('PDF loading error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load PDF');
      setStatus('error');
    }
  }, [resetState, settings]);

  const convertPages = async (
    pdfDoc: PDFDocumentProxy,
    pages: PageImage[],
    conversionSettings: ConversionSettings
  ) => {
    const totalPages = pdfDoc.numPages;

    for (let i = 0; i < totalPages; i++) {
      try {
        const pageNum = i + 1;
        
        // Update status to rendering
        setDocument(prev => {
          if (!prev) return null;
          const newPages = [...prev.pages];
          newPages[i] = { ...newPages[i], status: 'rendering' };
          return { ...prev, pages: newPages };
        });

        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: conversionSettings.scale });

        const canvas = window.document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not get canvas context');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const mimeType = conversionSettings.format === 'png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, conversionSettings.quality);

        // Update with completed page
        setDocument(prev => {
          if (!prev) return null;
          const newPages = [...prev.pages];
          newPages[i] = {
            pageNumber: pageNum,
            dataUrl,
            width: viewport.width,
            height: viewport.height,
            status: 'complete',
          };
          return { ...prev, pages: newPages };
        });

        setProgress(Math.round(((i + 1) / totalPages) * 100));

        // Clean up
        canvas.remove();
      } catch (err) {
        console.error(`Error converting page ${i + 1}:`, err);
        setDocument(prev => {
          if (!prev) return null;
          const newPages = [...prev.pages];
          newPages[i] = {
            ...newPages[i],
            status: 'error',
            error: err instanceof Error ? err.message : 'Conversion failed',
          };
          return { ...prev, pages: newPages };
        });
      }
    }
  };

  const updateSettings = useCallback((newSettings: Partial<ConversionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    document,
    status,
    progress,
    error,
    settings,
    loadPDF,
    resetState,
    updateSettings,
  };
}
