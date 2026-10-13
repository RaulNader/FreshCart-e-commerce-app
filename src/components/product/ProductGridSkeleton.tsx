import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder with the same layout as ProductGrid/ProductCard. */
export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-wrap">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="p-2">
            <Card className="py-1 border-2 h-full flex flex-col">
              <CardHeader className="space-y-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-2/3" />
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </CardFooter>
              <div className="grid grid-cols-2 gap-2 px-1 pb-1">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
