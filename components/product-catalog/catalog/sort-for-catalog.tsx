"use client";

import { useSearchParams } from "next/navigation";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import SortSelect from "@/components/ui/sort";

interface SortForCatalogProps extends React.HTMLAttributes<HTMLDivElement> {
  all_count?: number;
}
const SortForCatalog: React.FC<SortForCatalogProps> = ({ all_count }) => {
  const searchParams = useSearchParams();

  function updateSorting(sortOrder: "asc" | "desc") {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("sort", sortOrder);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  function removeSorting() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("sort");
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  // console.log("SORT");

  return (
    <div className="flex justify-between pb-2">
      <div className="flex w-full flex-col lg:flex-row lg:items-center justify-between">
        {/* Счетчик колличества товаров */}
        <h2 className=" font-semibold text-gray-900 py-2">
          Найдено товаров: {all_count}
        </h2>

        {/* Кнопки сортировки и фильтрации */}
        <div className="flex justify-between items-center">
          <SortSelect
            removeSorting={removeSorting}
            updateSorting={updateSorting}
          />
          <div className="flex gap-1 items-center md:hidden">
            <AdjustmentsHorizontalIcon className="w-6 h-6" />
            <div className="text-sm font-medium text-gray-900 py-2">
              Фильтры
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortForCatalog;
