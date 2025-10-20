"use client";

import { HistoryIcon } from "lucide-react";
import { memo } from "react";
import { CatalogForNavbar } from "../general/navbar/navbar";

interface AutocompleteSearchProps {
  navigation: CatalogForNavbar;
  historySearch: string[];
  handleSubmit: (value: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  navigation,
  historySearch,
  handleSubmit,
}) => {
  if (!historySearch.length) return null;

  return (
    <ul className="absolute left-0 right-0 mt-1 bg-white border py-4 px-1 border-gray-200 rounded-md shadow-lg overflow-auto z-10 space-y-2">
      <li className="px-3">
        <ul className="flex flex-wrap gap-1">
          {navigation?.brands?.map((brand) => (
            <li
              key={brand.slug}
              onClick={() => handleSubmit(brand.name)}
              className="px-1 py-0.5 bg-primary/15 border-primary border-2 text-primary text-sm rounded-sm cursor-pointer"
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </li>
      <li>
        <ul className=" flex flex-col-reverse">
          {historySearch.map((i) => (
            <li
              key={i}
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 py-1.5 px-3 rounded-sm"
              onClick={() => handleSubmit(i)}
            >
              <HistoryIcon className="size-4 text-gray-300" />
              {i}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default memo(AutocompleteSearch);
