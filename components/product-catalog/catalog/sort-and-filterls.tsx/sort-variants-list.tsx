import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const sortTypes = [
  { name: "По популярности" },
  { name: "Сначало дешевле", value: "asc" },
  { name: "Сначало дороже", value: "desc" },
];

interface SortVariantsListProps extends React.HTMLAttributes<HTMLDivElement> {
  onCloseModal?: () => void;
}

const SortVariantsList: React.FC<SortVariantsListProps> = ({
  onCloseModal,
}) => {
  const searchParams = useSearchParams();
  const searchParamsToStr = searchParams.toString();

  const [select, setSelect] = useState<"asc" | "desc" | undefined>();

  function updateSorting(sortOrder: "asc" | "desc") {
    const params = new URLSearchParams(searchParamsToStr);
    params.delete("page");
    params.set("sort", sortOrder);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  function removeSorting() {
    const params = new URLSearchParams(searchParamsToStr);
    params.delete("page");
    params.delete("sort");
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  useEffect(() => {
    setSelect(searchParams.get("sort") as "asc" | "desc" | undefined);
  }, [searchParamsToStr]);
  return (
    <div className="flex flex-col text-base items-start md:flex-row md:items-center gap-4 ">
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
            if (onCloseModal) {
              onCloseModal();
            }
          }}
          value={i.value}
          className={cn(
            "text-sm text-gray-500 cursor-pointer",
            select === i.value || (!select && !i.value)
              ? "underline font-semibold text-gray-900"
              : null
          )}
        >
          {i.name}
        </button>
      ))}
    </div>
  );
};

export default SortVariantsList;
