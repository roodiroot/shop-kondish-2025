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
      <div className="flex h-full space-x-8">
        <CatalogNavigation
          category={navigation.category}
          brands={navigation.brands}
        />
        {navigation.staticPage.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="sr-only"></div>
  );
};

export default Menu;
