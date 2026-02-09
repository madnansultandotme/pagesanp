import { useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PDFUploader } from '@/components/PDFUploader';
import { ConversionProgress } from '@/components/ConversionProgress';
import { PreviewGrid } from '@/components/PreviewGrid';
import { SettingsPanel } from '@/components/SettingsPanel';
import { PageSkeleton } from '@/components/PageSkeleton';
import { Button } from '@/components/ui/button';
import { usePDFConverter } from '@/hooks/usePDFConverter';
import { downloadSinglePage, downloadAsZip } from '@/utils/download';
import { RefreshCw, AlertCircle, FileImage } from 'lucide-react';
import type { PageImage } from '@/types/pdf';

export default function Convert() {
  const {
    document,
    status,
    progress,
    error,
    settings,
    loadPDF,
    resetState,
    updateSettings,
  } = usePDFConverter();

  const currentPage = document?.pages.findIndex(p => p.status === 'rendering');
  const isProcessing = status === 'loading' || status === 'converting';
  const hasCompletedPages = document?.pages.some(p => p.status === 'complete');

  const handleDownloadPage = useCallback((page: PageImage) => {
    if (document) {
      downloadSinglePage(page, document.name, settings);
    }
  }, [document, settings]);

  const handleDownloadAll = useCallback((pages: PageImage[]) => {
    if (document) {
      downloadAsZip(pages, document.name, settings);
    }
  }, [document, settings]);

  const handleDownloadSelected = useCallback((pages: PageImage[]) => {
    if (document && pages.length > 0) {
      if (pages.length === 1) {
        downloadSinglePage(pages[0], document.name, settings);
      } else {
        downloadAsZip(pages, document.name, settings);
      }
    }
  }, [document, settings]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            PDF to Image Converter
          </h1>
          <p className="text-muted-foreground">
            Upload your PDF and convert pages to high-quality images
          </p>
        </div>

        {/* Settings and controls - show when document is loaded */}
        {document && (
          <section className="flex items-center justify-between gap-4 flex-wrap p-4 rounded-xl bg-card border animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileImage className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{document.name}</p>
                <p className="text-sm text-muted-foreground">
                  {document.pageCount} {document.pageCount === 1 ? 'page' : 'pages'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetState}
                disabled={isProcessing}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New PDF
              </Button>

              <SettingsPanel
                settings={settings}
                onSettingsChange={updateSettings}
                disabled={isProcessing}
              />
            </div>
          </section>
        )}

        {/* Upload zone - show when idle */}
        {status === 'idle' && (
          <section className="py-8 animate-fade-in">
            <PDFUploader
              onFileSelect={loadPDF}
              isLoading={isProcessing}
            />
          </section>
        )}

        {/* Progress indicator with skeleton */}
        {isProcessing && (
          <section className="space-y-8 animate-fade-in">
            <ConversionProgress
              status={status}
              progress={progress}
              currentPage={currentPage !== undefined && currentPage >= 0 ? currentPage + 1 : undefined}
              totalPages={document?.pageCount}
            />

            {/* Show skeleton while converting */}
            {status === 'converting' && document && !hasCompletedPages && (
              <PageSkeleton count={Math.min(document.pageCount, 6)} />
            )}
          </section>
        )}

        {/* Error state */}
        {status === 'error' && (
          <section className="py-8 animate-fade-in">
            <div className="max-w-md mx-auto p-6 rounded-xl bg-destructive/10 border border-destructive/20 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Conversion Failed</h3>
                <p className="text-sm text-muted-foreground">
                  {error || 'An error occurred while processing your PDF.'}
                </p>
              </div>
              <Button onClick={resetState} variant="outline">
                Try Again
              </Button>
            </div>
          </section>
        )}

        {/* Preview grid - show when we have pages */}
        {document && document.pages.length > 0 && status !== 'idle' && hasCompletedPages && (
          <section className="animate-fade-in">
            <PreviewGrid
              pages={document.pages}
              settings={settings}
              documentName={document.name}
              onDownloadPage={handleDownloadPage}
              onDownloadAll={handleDownloadAll}
              onDownloadSelected={handleDownloadSelected}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
