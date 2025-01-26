"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

const sortTypes = [
  { name: "По популярности" },
  { name: "Сначало дешевле", value: "asc" },
  { name: "Сначало дороже", value: "desc" },
];

interface SortSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  removeSorting: () => void;
  updateSorting: (sortOrder: "asc" | "desc") => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  removeSorting,
  updateSorting,
}) => {
  const searchParams = useSearchParams();
  const [select, setSelect] = useState<"asc" | "desc" | undefined>();

  useEffect(() => {
    setSelect(searchParams.get("sort") as "asc" | "desc" | undefined);
  }, [searchParams.toString()]);

  return (
    <div className="md:flex items-center gap-4">
      <div className="hidden md:flex items-center gap-4 ">
        {sortTypes.map((i) => (
          <button
            key={i.name}
            onClick={() => {
              if (i.value) {
                updateSorting(i.value as "asc" | "desc");
                setSelect(i.value as "asc" | "desc" | undefined);
              } else {
                removeSorting();
              }
            }}
            value={i.value}
            className={cn(
              "text-sm text-gray-500 cursor-pointer",
              (select === i.value || (!select && !i.value)) && "underline"
            )}
          >
            {i.name}
          </button>
        ))}
      </div>
      <div className="flex gap-1 items-center">
        <div className="text-sm font-medium text-gray-900 py-2">
          Сортировка:
        </div>
        <Bars3BottomRightIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SortSelect;
