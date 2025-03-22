"use client";

import Link from "next/link";

import { Brand } from "@/data/api";
import { GroupedCatalog } from "@/utils/group-by-product-catalog";
import { AlignJustify } from "lucide-react";

interface CatalogNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  category: GroupedCatalog[];
  brands: Brand[];
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({
  category,
  brands,
}) => {
  return (
    <div className="relative group">
      <button className="px-3 py-1 bg-primary/20 h-8 rounded-sm p-0 flex items-center text-sm text-primary font-bold">
        Каталог
        <AlignJustify className="w-5 h-5 ml-2" />
      </button>
      <ul className="absolute hidden group-hover:flex bg-white shadow-lg py-4 rounded-lg z-10 gap-10 p-10">
        <li>
          <Link
            href="/catalog/brands"
            className="text-sm font-bold text-gray-900 hover:text-primary"
          >
            Бренды
          </Link>
          <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
            {brands.map((i) => (
              <li key={i.slug}>
                <Link
                  className="hover:text-primary"
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
              className="text-sm font-bold hover:text-primary text-gray-900 whitespace-nowrap"
            >
              {i.name}
            </Link>
            <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
              {i.category.map((j) => (
                <li key={j.slug}>
                  <Link
                    className="hover:text-primary"
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
    </div>
  );
};

export default CatalogNavigation;
