"use client";

import SortSelect from "@/components/product-catalog/catalog/sort-and-filterls.tsx/sort";
import FiltersMobiButton from "./filters-mobil-button";

interface SortForCatalogProps extends React.HTMLAttributes<HTMLDivElement> {
  all_count?: number;
  isFiltersButton?: boolean;
}
const SortForCatalog: React.FC<SortForCatalogProps> = ({
  all_count,
  isFiltersButton,
}) => {
  return (
    <div className="flex justify-between pb-2">
      <div className="flex w-full flex-col lg:flex-row lg:items-center justify-between">
        {/* Счетчик колличества товаров */}
        <h2 className=" font-semibold text-gray-900 py-2">
          Найдено товаров: {all_count}
        </h2>

        {/* Кнопки сортировки и фильтрации */}
        <div className="flex justify-between items-center">
          <SortSelect />

          {isFiltersButton ? <FiltersMobiButton /> : null}
        </div>
      </div>
    </div>
  );
};

export default SortForCatalog;
