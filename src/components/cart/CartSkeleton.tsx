import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 4;

function QuantitySkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-4 w-6" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
}

export function CartRowsSkeleton() {
  return Array.from({ length: SKELETON_COUNT }).map((_, index) => (
    <tr key={index} className="border-b border-default">
      <td className="p-4">
        <Skeleton className="h-16 w-16 rounded-md" />
      </td>
      <td className="px-4 lg:px-6 py-4">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="px-4 lg:px-6 py-4">
        <QuantitySkeleton />
      </td>
      <td className="px-4 lg:px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-4 lg:px-6 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-4 lg:px-6 py-4">
        <Skeleton className="h-8 w-16 rounded-xl" />
      </td>
    </tr>
  ));
}

export function CartCardsSkeleton() {
  return Array.from({ length: SKELETON_COUNT }).map((_, index) => (
    <div key={index} className="border border-default rounded-lg p-3 bg-white">
      <div className="flex gap-3">
        <Skeleton className="h-16 w-16 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <QuantitySkeleton />
        <Skeleton className="h-8 w-16 rounded-xl" />
      </div>
    </div>
  ));
}
