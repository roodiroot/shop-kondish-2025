"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Brand } from "@/data/api";
import { GroupedCatalog } from "@/utils/group-by-product-catalog";

interface CatalogNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  category: GroupedCatalog[];
  brands: Brand[];
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({
  category,
  brands,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="p-0 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
          Каталог
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <ul className="flex gap-10 p-10">
          <li>
            <Link
              onClick={() => setOpen(false)}
              href="/catalog/brands"
              className="text-sm font-medium text-gray-900"
            >
              Бренды
            </Link>
            <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
              {brands.map((i) => (
                <li key={i.slug}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/catalog/brands/${i.slug}`}
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {category.map((i) => (
            <li key={i.name}>
              <Link
                href={`/catalog/${i.slug}`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-900 whitespace-nowrap"
              >
                {i.name}
              </Link>
              <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
                {i.category.map((j) => (
                  <li key={j.slug}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={`/catalog/${i.slug}/${j.slug}`}
                    >
                      {j.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger className="p-0 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
    //         Каталог
    //       </NavigationMenuTrigger>
    //       <NavigationMenuContent>

    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
};

export default CatalogNavigation;
