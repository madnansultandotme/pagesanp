import { Download, Loader2, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PageImage, ConversionSettings } from '@/types/pdf';

interface PagePreviewProps {
  page: PageImage;
  settings: ConversionSettings;
  onDownload: (page: PageImage) => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function PagePreview({
  page,
  settings,
  onDownload,
  isSelected,
  onSelect,
}: PagePreviewProps) {
  const { pageNumber, dataUrl, status, error } = page;

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl border overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:border-primary/30",
        isSelected && "ring-2 ring-primary border-primary",
        status === 'error' && "border-destructive/50"
      )}
    >
      {/* Thumbnail */}
      <div 
        className="relative aspect-[3/4] bg-secondary/50 cursor-pointer"
        onClick={onSelect}
      >
        {status === 'pending' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          </div>
        )}

        {status === 'rendering' && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
            <p className="text-xs text-center text-destructive">{error || 'Failed'}</p>
          </div>
        )}

        {status === 'complete' && dataUrl && (
          <img
            src={dataUrl}
            alt={`Page ${pageNumber}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}

        {/* Selection indicator */}
        {isSelected && status === 'complete' && (
          <div className="absolute top-2 right-2 p-1 rounded-full bg-primary text-primary-foreground">
            <Check className="w-4 h-4" />
          </div>
        )}

        {/* Hover overlay */}
        {status === 'complete' && (
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200" />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t bg-card">
        <span className="text-sm font-medium text-foreground">
          Page {pageNumber}
        </span>

        {status === 'complete' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(page);
            }}
            className="h-8 px-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
