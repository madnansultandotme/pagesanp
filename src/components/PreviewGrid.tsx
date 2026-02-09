import { useState } from 'react';
import { PagePreview } from './PagePreview';
import { Button } from '@/components/ui/button';
import { Download, FileArchive, CheckSquare, XSquare } from 'lucide-react';
import type { PageImage, ConversionSettings } from '@/types/pdf';

interface PreviewGridProps {
  pages: PageImage[];
  settings: ConversionSettings;
  documentName: string;
  onDownloadPage: (page: PageImage) => void;
  onDownloadAll: (pages: PageImage[]) => void;
  onDownloadSelected: (pages: PageImage[]) => void;
}

export function PreviewGrid({
  pages,
  settings,
  documentName,
  onDownloadPage,
  onDownloadAll,
  onDownloadSelected,
}: PreviewGridProps) {
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

  const completedPages = pages.filter(p => p.status === 'complete');
  const hasCompleted = completedPages.length > 0;
  const hasSelection = selectedPages.size > 0;

  const togglePage = (pageNumber: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageNumber)) {
        next.delete(pageNumber);
      } else {
        next.add(pageNumber);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedPages(new Set(completedPages.map(p => p.pageNumber)));
  };

  const clearSelection = () => {
    setSelectedPages(new Set());
  };

  const handleDownloadSelected = () => {
    const selected = pages.filter(p => selectedPages.has(p.pageNumber));
    onDownloadSelected(selected);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            {documentName}
          </h2>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
            {pages.length} {pages.length === 1 ? 'page' : 'pages'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Selection controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={hasSelection ? clearSelection : selectAll}
            disabled={!hasCompleted}
          >
            {hasSelection ? (
              <>
                <XSquare className="w-4 h-4 mr-1" />
                Clear ({selectedPages.size})
              </>
            ) : (
              <>
                <CheckSquare className="w-4 h-4 mr-1" />
                Select All
              </>
            )}
          </Button>

          {/* Download selected */}
          {hasSelection && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadSelected}
            >
              <Download className="w-4 h-4 mr-1" />
              Download Selected
            </Button>
          )}

          {/* Download all as ZIP */}
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownloadAll(completedPages)}
            disabled={!hasCompleted}
          >
            <FileArchive className="w-4 h-4 mr-1" />
            Download ZIP
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pages.map((page) => (
          <PagePreview
            key={page.pageNumber}
            page={page}
            settings={settings}
            onDownload={onDownloadPage}
            isSelected={selectedPages.has(page.pageNumber)}
            onSelect={() => togglePage(page.pageNumber)}
          />
        ))}
      </div>
    </div>
  );
}
