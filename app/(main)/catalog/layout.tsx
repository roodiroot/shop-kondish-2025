import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import { getAllBrands, getAllCategory, getAllProductCatalog } from "@/data/api";

type BreadcrumbMap = Record<string, string>;
const breadcrumbMap: BreadcrumbMap = {
  brands: "Бренды",
  catalog: "Каталог",
};

export default async function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [productCatalog, brands, categories] = await Promise.all([
    getAllProductCatalog(),
    getAllBrands(),
    getAllCategory(),
  ]);

  productCatalog.data.forEach((element) => {
    breadcrumbMap[element.slug] = element.name;
  });
  brands?.data.forEach((element) => {
    breadcrumbMap[element.slug] = element.name;
  });
  categories?.data.forEach((element) => {
    breadcrumbMap[element.slug] = element.name;
  });

  // console.log(breadcrumbMap);

  return (
    <div>
      <Breadcrumbs breadcrumbMap={breadcrumbMap} />
      {children}
    </div>
  );
}
