"use client";

import { useSearchParams } from "next/navigation";

import { FilterData } from "@/types/catalog";
import { getOnFilters } from "@/utils/filters";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface OpenFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: FilterData | null;
}

const OpenFilters: React.FC<OpenFiltersProps> = ({ filters }) => {
  const params = useSearchParams();

  if (!filters) {
    return <div className=""></div>;
  }

  const filtersList = getOnFilters(params.toString());

  const dropFilter = (keyFilter: string) => {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.delete("page");
    searchParams.delete(keyFilter);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-1 pb-8">
      <h3 className="sr-only">Включенные фильтры</h3>
      {filtersList.map((i) => (
        <div
          key={i}
          onClick={() => dropFilter(i)}
          className="h-7 px-2 py-1 bg-gray-50 text-sm text-gray-500 flex items-center gap-2 rounded-sm"
        >
          {filters.simpleFilters[i]?.label}
          <XMarkIcon className="w-4 h-4 cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default OpenFilters;
