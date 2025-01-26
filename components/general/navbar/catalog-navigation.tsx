import { Brand } from "@/data/api";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { GroupedCatalog } from "@/utils/group-by-product-catalog";

interface CatalogNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  category: GroupedCatalog[];
  brands: Brand[];
}

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({
  category,
  brands,
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-0 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
            Каталог
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-10 p-10">
              <li>
                <NavigationMenuLink
                  href="/catalog/brands"
                  className="text-sm font-medium text-gray-900"
                >
                  Бренды
                </NavigationMenuLink>
                <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
                  {brands.map((i) => (
                    <li key={i.slug}>
                      <NavigationMenuLink href={`/catalog/brands/${i.slug}`}>
                        {i.name}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </li>
              {category.map((i) => (
                <li key={i.name}>
                  <NavigationMenuLink
                    href={`/catalog/${i.slug}`}
                    className="text-sm font-medium text-gray-900 whitespace-nowrap"
                  >
                    {i.name}
                  </NavigationMenuLink>
                  <ul className="mt-4 space-y-4 text-sm text-gray-500 whitespace-nowrap">
                    {i.category.map((j) => (
                      <li key={j.slug}>
                        <NavigationMenuLink
                          href={`/catalog/${i.slug}/${j.slug}`}
                        >
                          {j.name}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CatalogNavigation;
