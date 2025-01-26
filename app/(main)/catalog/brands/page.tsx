import Link from "next/link";
import type { Metadata } from "next";

import { getAllBrands } from "@/data/api";
import BaseContainer from "@/components/general/containers/base-container";

export const metadata: Metadata = {
  title: "Бренды",
  description:
    "В наличии и под заказ. Только надежные и проверенные временем бренды в Kondish.",
  icons: "/kondish.svg",
};

export default async function Brands() {
  const brands = await getAllBrands();
  return (
    <BaseContainer>
      <div className="flex flex-row gap-4 py-6 w-full">
        {brands.data.map((i) => (
          <Link
            key={i.slug}
            href={`/catalog/brands/${i.slug}`}
            className="flex-1 h-40 rounded-md bg-gray-50 p-4"
          >
            {i.name}
          </Link>
        ))}
      </div>
    </BaseContainer>
  );
}
