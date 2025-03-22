import {
  groupByProductCatalog,
  GroupedCatalog,
} from "@/utils/group-by-product-catalog";
import { navigation, Page } from "@/navigation";
import { Brand, getAllBrands, getAllCategory } from "@/data/api";

import MobilMenu from "./mobil-menu/mobil-menu";
import Favorites from "./favorites-icon/favorites";
import Menu from "@/components/general/navbar/menu";
import Logo from "@/components/general/navbar/logo";
import CartNavbar from "@/components/general/navbar/cart-icon/cart-navbar";
import AuthComponentNavbar from "@/components/general/navbar/auth-component-navbar";

export interface CatalogForNavbar {
  category: GroupedCatalog[];
  brands: Brand[];
  staticPage: { name: string; pages?: Page[]; href?: string }[];
}

export default async function Navbar() {
  const category = await getAllCategory();
  const brands = await getAllBrands();

  const group = groupByProductCatalog(category.data);

  const catalog: CatalogForNavbar = {
    category: group,
    brands: brands.data,
    staticPage: navigation.pages,
  };
  // console.log(group);
  return (
    <div className="bg-white">
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
              <div className="">
                <Logo className="ml-4 lg:ml-0" />
              </div>

              {/* Flyout menus */}
              <Menu navigation={catalog} />

              <div className="ml-auto flex items-center gap-x-2 md:gap-x-4">
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
