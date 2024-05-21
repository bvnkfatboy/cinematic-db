import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <>
      <div className="mx-auto h-[331px] w-[150px] overflow-hidden">
        <div className="relative">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>

        <div className="pt-[10px]">
          <h2 className="text-md mb-2 font-semibold">
            <Skeleton className="h-4 w-[250px]" />
          </h2>
          <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    </>
  );
}
