"use client";

import { useCallback, useEffect, useState } from "react";
import ItemValue from "./item";
import { FilterOption } from "@/types/catalog";
import { useRouter, useSearchParams } from "next/navigation";

interface ItemBaseFilterProps extends FilterOption {
  keyFilter: string;
}

const ItemBaseFilter: React.FC<ItemBaseFilterProps> = ({
  label,
  values,
  keyFilter,
}) => {
  const params = useSearchParams();
  const [select, setSelect] = useState<string[]>([]);
  const selectValuesArray = params.get(keyFilter)?.split(",");

  useEffect(() => {
    setSelect(selectValuesArray || []);
  }, [params.toString()]);

  function handleCheckedChange(isChecked: boolean, value: string | null) {
    if (value === null) value = "null";
    setSelect((prevValues) => {
      let updatedValues;
      if (isChecked) {
        if (value === "null") {
          // If null is selected, remove all other values and only add null
          updatedValues = ["null"];
        } else {
          // Add the value if it's not null
          updatedValues = [...prevValues.filter((v) => v !== "null"), value];
        }
      } else {
        // If checkbox is unchecked, remove the value
        updatedValues = prevValues.filter((item) => item !== value);
      }

      const searchParams = new URLSearchParams(params.toString());
      if (updatedValues.includes("null")) {
        // If null is in the array, set only null in the URL
        searchParams.set(keyFilter, "null");
      } else if (updatedValues.length > 0) {
        // Otherwise, set all values joined by a comma
        searchParams.set(keyFilter, updatedValues.join(","));
      } else {
        // If the array is empty, remove the parameter
        searchParams.delete(keyFilter);
      }
      searchParams.delete("page");

      window.history.pushState(null, "", `?${searchParams.toString()}`);

      return updatedValues;
    });
  }

  return (
    <div className="last:border-b-0 border-b">
      <fieldset>
        <legend className="text-sm font-medium text-gray-900 block">
          {label}:
        </legend>
        <div className="py-4 grid grid-cols-2 gap-x-6 gap-y-3 max-h-[160px] overflow-y-auto ">
          {values
            .sort((a, b) => {
              if (!a) a = "";
              if (!b) b = "";
              return a.localeCompare(b);
            })
            .map((i) => (
              <ItemValue
                key={i}
                value={i}
                label={keyFilter}
                handleCheckedChange={handleCheckedChange}
                checked={
                  (select?.length &&
                    ((i && select?.includes(i)) ||
                      (select?.includes("null") && i === null))) ||
                  false
                }
              />
            ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ItemBaseFilter;
