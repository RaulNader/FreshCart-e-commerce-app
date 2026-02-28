import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonItems = Array.from({ length: 40 });

  return (
    <div className="container w-[80%] items-center mx-auto py-8">
      <div className="flex flex-wrap">
        {skeletonItems.map((_, index) => (
          <div
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"
            key={index}
          >
            <div className="p-3">
              <Card className="p-1.5">
                <CardHeader className="space-y-2">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </CardFooter>
                <div className="px-6 pb-6">
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
