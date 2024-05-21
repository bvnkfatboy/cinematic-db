import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonDetail() {
  return (
    <>
      <div className=" rounded-lg  bg-gray-800 bg-cover bg-no-repeat p-2 md:p-8 lg:p-12">
        <div className="mx-auto max-h-[540px]  max-w-7xl ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 lg:gap-12">
            <div className="col-span-1 ">
              <Skeleton className="h-[500px] w-[400px] rounded-lg shadow-lg " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
