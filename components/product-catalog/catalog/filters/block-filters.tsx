"use client";

import { Filters } from "@/types/catalog";

import OpenFilters from "./open-filters";
import AllFiltersList from "./all-filters-list";
import { useMediaQuery } from "@/hooks/use-media-query";
import FiltersSheetWrapper from "@/components/general/sort-and-filters.tsx/filters-sheet-wrapper";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface TypeItem {
  slug: string;
  name: string;
}

interface BlockFiltersProps<T extends TypeItem>
  extends React.HTMLAttributes<HTMLDivElement> {
  filters?: Filters;
  dataList?: T[];
  href?: string;
}

const BlockFilters: React.FC<BlockFiltersProps<TypeItem>> = ({
  filters,
  dataList,
  href,
}) => {
  const isDesctop = useMediaQuery("(min-width: 768px)");

  if (!isDesctop) {
    return (
      <FiltersSheetWrapper>
        <aside>
          <h2 className="sr-only">Фильтры</h2>
          <div className="block md:hidden">
            {/* Открытые блоки фильтров */}
            <OpenFilters filters={filters} />

            {/* Категории в котоых могут быть товары */}
            {dataList?.length ? (
              <div className="flex flex-col gap-2 mb-8">
                {dataList?.map((i) => (
                  <Link
                    href={href ? `${href}/${i.slug}` : ""}
                    key={i.name}
                    className=""
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            ) : null}

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

        {/* Категории в котоых могут быть товары */}
        {dataList?.length ? (
          <div className="flex flex-col gap-2 mb-8">
            {dataList?.map((i) => (
              <Link
                href={href ? `${href}/${i.slug}` : ""}
                key={i.name}
                className="flex gap-2 items-center"
              >
                {i.name}
                <ChevronRightIcon className="size-3" />
              </Link>
            ))}
          </div>
        ) : null}

        {/* Все фильтры */}
        <AllFiltersList filters={filters} />
      </div>
    </aside>
  );
};

export default BlockFilters;
