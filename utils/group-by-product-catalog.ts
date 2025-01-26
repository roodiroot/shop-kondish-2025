interface ProductCatalogItem {
  id: number;
  name: string;
  slug: string;
}

export interface GroupedCatalog {
  name: string;
  slug: string;
  category: ProductCatalogItem[];
}

/**
 * Groups an array of items by their product catalog name.
 * @param array - An array of items to group. Each item must have a `product_catalog` property with a `name`.
 * @returns An array of grouped catalog objects, each containing a name and a category list.
 */
export function groupByProductCatalog(
  array: {
    product_catalog: { name: string; slug: string };
    id: number;
    name: string;
    slug: string;
  }[]
): GroupedCatalog[] {
  const grouped: { [key: string]: GroupedCatalog } = {};

  array.forEach((item) => {
    if (item.product_catalog && typeof item.product_catalog === "object") {
      const catalogName = item.product_catalog.name;
      const slug = item.product_catalog.slug;

      if (!grouped[catalogName]) {
        grouped[catalogName] = { name: catalogName, slug, category: [] };
      }

      grouped[catalogName].category.push({
        name: item.name,
        id: item.id,
        slug: item.slug,
      });
    }
  });

  return Object.values(grouped);
}
