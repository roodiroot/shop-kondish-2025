import { navigation, Page } from "@/navigation";
import Logo from "@/components/general/navbar/logo";
import Menu from "@/components/general/navbar/menu";
import CartNavbar from "@/components/general/navbar/cart-icon/cart-navbar";
import BurgerMenu from "@/components/general/navbar/burger-menu";
import AuthComponentNavbar from "@/components/general/navbar/auth-component-navbar";
import { Brand, getAllBrands, getAllCategory } from "@/data/api";
import {
  groupByProductCatalog,
  GroupedCatalog,
} from "@/utils/group-by-product-catalog";

export interface CatalogForNavbar {
  category: GroupedCatalog[];
  brands: Brand[];
  staticPage: Page[];
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
              <BurgerMenu />

              {/* Logo */}
              <Logo className="ml-4 lg:ml-0" />
              {/* Flyout menus */}
              <Menu navigation={catalog} />
              <div className="ml-auto flex items-center">
                {/* Auth */}
                <AuthComponentNavbar />

                {/* Cart */}
                <CartNavbar className="ml-4 lg:ml-6" />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
