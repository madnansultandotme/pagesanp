export interface PageImage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
  status: 'pending' | 'rendering' | 'complete' | 'error';
  error?: string;
}

export interface ConversionSettings {
  format: 'png' | 'jpeg';
  quality: number; // 0.1 to 1.0 for JPEG
  scale: number; // 1.0 to 3.0 for DPI scaling
}

export interface PDFDocument {
  file: File;
  name: string;
  pageCount: number;
  pages: PageImage[];
}

export type ConversionStatus = 
  | 'idle' 
  | 'loading' 
  | 'converting' 
  | 'complete' 
  | 'error';
