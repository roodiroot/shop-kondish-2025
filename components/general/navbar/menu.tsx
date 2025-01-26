import Link from "next/link";

import { CatalogForNavbar } from "./navbar";
import CatalogNavigation from "./catalog-navigation";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation: CatalogForNavbar;
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  return (
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
  );
};

export default Menu;
