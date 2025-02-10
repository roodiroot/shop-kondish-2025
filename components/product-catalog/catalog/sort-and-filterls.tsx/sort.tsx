"use client";

import useModalSort from "@/hooks/use-modal-sort";
import SortVariantsList from "./sort-variants-list";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

interface SortSelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const SortSelect: React.FC<SortSelectProps> = () => {
  const isDesctop = useMediaQuery("(min-width: 768px)");
  const { onOpen } = useModalSort();

  return (
    <div className="md:flex items-center gap-4">
      {isDesctop ? <SortVariantsList /> : null}
      <div
        onClick={() => {
          if (!isDesctop) {
            onOpen();
          }
        }}
        className="flex gap-1 items-center cursor-pointer md:cursor-auto"
      >
        <div className="text-sm font-medium text-gray-900 py-2">
          Сортировка:
        </div>
        <Bars3BottomRightIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SortSelect;
