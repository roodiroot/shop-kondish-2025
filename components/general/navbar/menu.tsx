"use client";

import Link from "next/link";

import { CatalogForNavbar } from "./navbar";
import CatalogNavigation from "./catalog-navigation";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation: CatalogForNavbar;
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const isDesctop = useMediaQuery("(min-width: 1024px)");

  return isDesctop ? (
    <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-4 items-center">
        <CatalogNavigation
          category={navigation.category}
          brands={navigation.brands}
        />
        {navigation.staticPage.map((page) => {
          if (page.href) {
            return (
              <Link
                key={page.name}
                href={page.href}
                className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800"
              >
                {page.name}
              </Link>
            );
          } else if (page.pages?.length) {
            return (
              <div key={page.name} className="relative group">
                <button className="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800">
                  {page.name}
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg py-4 rounded-lg z-10">
                  {page.pages.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-500 hover:text-primary whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <div className="sr-only"></div>
  );
};

export default Menu;
