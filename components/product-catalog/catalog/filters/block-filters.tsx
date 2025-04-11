"use client";

import { FilterData } from "@/types/catalog";

import OpenFilters from "./open-filters";
import AllFiltersList from "./all-filters-list";
import { useMediaQuery } from "@/hooks/use-media-query";
import FiltersSheetWrapper from "@/components/general/sort-and-filters.tsx/filters-sheet-wrapper";

interface BlockFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: FilterData | null;
}

const BlockFilters: React.FC<BlockFiltersProps> = ({ filters }) => {
  const isDesctop = useMediaQuery("(min-width: 768px)");

  if (!isDesctop) {
    return (
      <FiltersSheetWrapper>
        <aside>
          <h2 className="sr-only">Фильтры</h2>
          <div className="block md:hidden">
            {/* Открытые блоки фильтров */}
            <OpenFilters filters={filters} />

            {/* Все фильтры */}
            <AllFiltersList filters={filters} />
          </div>
        </aside>
      </FiltersSheetWrapper>
    );
  }

  return (
    <aside>
      <h2 className="sr-only">Фильтры</h2>
      <div className="hidden md:block">
        {/* Открытые блоки фильтров */}
        <OpenFilters filters={filters} />

        {/* Все фильтры */}
        <AllFiltersList filters={filters} />
      </div>
    </aside>
  );
};

export default BlockFilters;
