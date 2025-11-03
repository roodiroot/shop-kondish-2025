import { Skeleton } from "@/components/ui/skeleton";

import Spinner from "@/components/general/loading/spinner";
import BaseContainer from "@/components/general/containers/base-container";

export default function Loading() {
  return (
    <BaseContainer className="relative">
      <Spinner />
      <div className="py-4">
        <Skeleton className="relative shadow-sm  overflow-hidden w-full aspect-[2/2] sm:aspect-[2/1] lg:aspect-[3.3/1] bg-gray-100 rounded-lg"></Skeleton>
      </div>
      <Skeleton className="mt-10 h-7 w-[150px]"></Skeleton>
      <div className="relative z-10 w-full mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4">
          {new Array(5).fill("").map((_, i) => (
            <Skeleton key={i} className=" aspect-square" />
          ))}
        </div>
      </div>
    </BaseContainer>
  );
}
