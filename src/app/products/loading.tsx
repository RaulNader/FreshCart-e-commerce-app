import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container w-full max-w-6xl px-3 sm:px-5 items-center mx-auto py-8">
      {/* filter form */}
      <Skeleton className="h-36 w-full rounded-xl mb-6" />
      <ProductGridSkeleton count={12} />
    </div>
  );
}
