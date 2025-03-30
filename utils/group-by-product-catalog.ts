interface ProductCatalogItem {
  id: number;
  name: string;
  slug: string;
  available: boolean | null;
}

export interface GroupedCatalog {
  name: string;
  slug: string;
  available: boolean | null;
  category: ProductCatalogItem[];
}

/**
 * Groups an array of items by their product catalog name.
 * @param array - An array of items to group. Each item must have a `product_catalog` property with a `name`.
 * @returns An array of grouped catalog objects, each containing a name and a category list.
 */
export function groupByProductCatalog(
  array?: {
    product_catalog: { name: string; slug: string; available: boolean | null };
    id: number;
    name: string;
    slug: string;
    available: boolean | null;
  }[]
): GroupedCatalog[] {
  const grouped: { [key: string]: GroupedCatalog } = {};

  if (array)
    array.forEach((item) => {
      if (item.product_catalog && typeof item.product_catalog === "object") {
        const catalogName = item.product_catalog.name;
        const slug = item.product_catalog.slug;
        const availableProductCatalog = item.product_catalog.available;
        const availableCategory = item.available;

        if (!grouped[catalogName]) {
          grouped[catalogName] = {
            name: catalogName,
            available: availableProductCatalog,
            slug,
            category: [],
          };
        }

        grouped[catalogName].category.push({
          name: item.name,
          id: item.id,
          slug: item.slug,
          available: availableCategory,
        });
      }
    });

  return Object.values(grouped);
}
