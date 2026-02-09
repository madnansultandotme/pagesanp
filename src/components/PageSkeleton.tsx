import { cn } from '@/lib/utils';

interface PageSkeletonProps {
  count?: number;
}

export function PageSkeleton({ count = 6 }: PageSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative bg-card rounded-xl border overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {/* Thumbnail skeleton */}
          <div className="relative aspect-[3/4] bg-secondary/50 overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-secondary/80 to-transparent" />
            
            {/* Pulse circle in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-secondary animate-pulse" />
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between p-3 border-t bg-card">
            <div className="h-4 w-16 bg-secondary rounded animate-pulse" />
            <div className="h-8 w-8 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UploadingSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl bg-card border-primary/30 animate-pulse">
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="p-4 rounded-full bg-primary/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 animate-pulse" />
          </div>
          <div className="space-y-2 text-center">
            <div className="h-5 w-48 bg-secondary rounded mx-auto" />
            <div className="h-4 w-32 bg-secondary/70 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
