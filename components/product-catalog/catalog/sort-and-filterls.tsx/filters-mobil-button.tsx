"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import useModalFilters from "@/hooks/use-modal-filters";
import { getOnFilters } from "@/utils/filters";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

const FiltersMobiButton = () => {
  const params = useSearchParams();
  const { onOpen } = useModalFilters();
  const isDesctop = useMediaQuery("(min-width: 768px)");

  const filtersList = getOnFilters(params.toString());

  return (
    <div
      onClick={() => {
        if (!isDesctop) {
          onOpen();
        }
      }}
      className="flex gap-1 items-center cursor-pointer md:hidden"
    >
      <AdjustmentsHorizontalIcon className="w-6 h-6" />
      <div className="text-sm font-medium text-gray-900 py-2 items-center flex gap-2">
        Фильтры{" "}
        {filtersList.length ? (
          <div className="size-5 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
            {filtersList.length}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FiltersMobiButton;
