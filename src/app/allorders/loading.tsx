import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <Skeleton className="h-9 w-52 mb-6" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, orderIndex) => (
          <div
            key={`order-skeleton-${orderIndex}`}
            className="bg-white rounded-xl border border-default shadow-xs p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-default pb-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
              <div className="space-y-2 sm:items-end">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {Array.from({ length: 2 }).map((_, itemIndex) => (
                <div
                  key={`order-item-skeleton-${orderIndex}-${itemIndex}`}
                  className="flex items-center gap-3 border border-default rounded-lg p-3"
                >
                  <Skeleton className="w-16 h-16 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
