import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { ConversionStatus } from '@/types/pdf';

interface ConversionProgressProps {
  status: ConversionStatus;
  progress: number;
  currentPage?: number;
  totalPages?: number;
}

export function ConversionProgress({
  status,
  progress,
  currentPage,
  totalPages,
}: ConversionProgressProps) {
  if (status === 'idle' || status === 'complete') return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-center gap-3">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <span className="text-sm font-medium text-foreground">
          {status === 'loading' && 'Loading PDF...'}
          {status === 'converting' && (
            currentPage && totalPages
              ? `Converting page ${currentPage} of ${totalPages}`
              : 'Converting pages...'
          )}
        </span>
      </div>

      {status === 'converting' && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {progress}% complete
          </p>
        </div>
      )}
    </div>
  );
}
