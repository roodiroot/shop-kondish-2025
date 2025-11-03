import { Suspense } from "react";

import {
  groupByProductCatalog,
  GroupedCatalog,
} from "@/utils/group-by-product-catalog";
import { navigation, Page } from "@/navigation";
import { getAllProducts } from "@/data/product-api";
import { getAllCategory } from "@/data/category-api";
import { Brand, getAllBrands } from "@/data/brand-api";

import MobilMenu from "./mobil-menu/mobil-menu";
import Favorites from "./favorites-icon/favorites";
import Menu from "@/components/general/navbar/menu";
import Logo from "@/components/general/navbar/logo";
import InputSearch from "@/components/ui/input-search";
import CartNavbar from "@/components/general/navbar/cart-icon/cart-navbar";
import AuthComponentNavbar from "@/components/general/navbar/auth-component-navbar";

export interface CatalogForNavbar {
  category?: GroupedCatalog[];
  brands?: Brand[];
  staticPage?: { name: string; pages?: Page[]; href?: string }[];
}

export default async function Navbar() {
  const paramsPopularProducts = new URLSearchParams({
    "filters[available]": "true",
    sort: "popularity:DESC",
    "pagination[pageSize]": "3",
    "populate[0]": "brand",
    "populate[1]": "images",
    "populate[2]": "category",
  });

  const category = await getAllCategory();
  const brands = await getAllBrands();
  const products = await getAllProducts(paramsPopularProducts.toString());

  // Group by product catalog
  const group = groupByProductCatalog(category?.data);
  const catalog: CatalogForNavbar = {
    category: group,
    brands: brands?.data,
    staticPage: navigation.pages,
  };

  return (
    <div className="bg-white relative z-20">
      {/* Mobile menu */}

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobilMenu navigation={catalog} />

              {/* Logo */}
              <div>
                <Logo className="ml-4 lg:ml-0" />
              </div>

              {/* Flyout menus */}
              <Menu navigation={catalog} />
              {/* Search section*/}
              <div className=" pl-4 lg:pl-8 flex-1">
                <Suspense fallback={null}>
                  <InputSearch navigation={catalog} products={products} />
                </Suspense>
              </div>
              {/* Right section */}
              <div className="ml-auto pl-4 lg:pl-8 flex items-center gap-x-2 md:gap-x-4">
                <div className="hidden sm:block ml-auto font-bold text-sm">
                  <a href="tel:74956752555">+7 (495) 675-25-55</a>
                </div>
                {/* Auth */}
                <AuthComponentNavbar />

                {/* Favorites */}
                <Favorites />

                {/* Cart */}
                <CartNavbar />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
