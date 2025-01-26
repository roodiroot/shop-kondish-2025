"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { findMinMax } from "@/utils/filters";
import { Slider } from "@/components/ui/slider";

const PriceFilter = ({ values }: { values: (string | null)[] }) => {
  const defaultValue = findMinMax(values);
  const params = useSearchParams();
  const [price, setPrice] = useState<number[] | null>(defaultValue);

  if (!defaultValue || defaultValue[0] === defaultValue[1]) {
    return null;
  }

  useEffect(() => {
    const selectValuesArray = params.get("price")?.split(",");
    if (selectValuesArray) {
      if (
        !isNaN(Number(selectValuesArray[0])) &&
        !isNaN(Number(selectValuesArray[1]))
      ) {
        setPrice([Number(selectValuesArray[0]), Number(selectValuesArray[1])]);
      } else {
        setPrice(defaultValue);
      }
    } else {
      setPrice(defaultValue);
    }
  }, [params.toString()]);

  const updatePriceRange = (newRange: number[]) => {
    const updatedParams = new URLSearchParams(params.toString());

    const [minPrice, maxPrice] = defaultValue;
    const [newMinPrice, newMaxPrice] = newRange;

    if (newMinPrice === minPrice && newMaxPrice === maxPrice) {
      updatedParams.delete("price");
    } else {
      updatedParams.set("price", newRange.join(","));
    }
    updatedParams.delete("page");

    window.history.pushState(null, "", `?${updatedParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 py-4 border-b">
      {price && (
        <div className="w-full flex justify-between px-1">
          <div className="px-2 py-1 border rounded-sm text-sm text-gray-700">
            {new Intl.NumberFormat("ru-RU").format(Number(price[0]))} руб.
          </div>
          <div className="px-2 py-1 border rounded-sm text-sm  text-gray-700">
            {new Intl.NumberFormat("ru-RU").format(Number(price[1]))} руб.
          </div>
        </div>
      )}
      <Slider
        onValueCommit={(e) => updatePriceRange(e)}
        onValueChange={(e) => setPrice(e)}
        value={price ? price : undefined}
        min={defaultValue[0]}
        max={defaultValue[1]}
        step={1000}
      />
    </div>
  );
};

export default PriceFilter;
