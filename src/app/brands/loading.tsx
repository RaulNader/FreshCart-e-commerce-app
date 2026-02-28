import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <Skeleton className="h-9 w-48 mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`brand-skeleton-${index}`}
            className="bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col items-center gap-3"
          >
            <Skeleton className="w-24 h-24 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
