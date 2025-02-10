import { Metadata } from "next";

import Breadcrumbs from "@/components/general/breadcrumbs/breadcrumbs";
import BaseContainer from "@/components/general/containers/base-container";
import FavoritesList from "@/components/pages/favorites/favorites-list";
import HeadCatalog from "@/components/product-catalog/catalog/head-catalog";

export const metadata: Metadata = {
  title: "Избранное",
  description:
    "Сохраняйте понравившиеся товары, статьи или элементы в 'Избранное'. Удобный способ быстро вернуться к тому, что важно именно вам.",
  icons: "/kondish.svg",
};

export default function FavoritesPage() {
  return (
    <div className="">
      <Breadcrumbs
        breadcrumbMap={{
          favorites: "Избранное",
        }}
      />
      <BaseContainer>
        {/* Блок оглавление страницы */}
        <HeadCatalog
          name="Избранное"
          description="Здесь вы можете легко найти и вернуться к тому, что вам понравилось, а также управлять своим списком избранного. Удобно, быстро и всегда под рукой!"
        />

        {/* Фильтры и товары */}
        <FavoritesList />
      </BaseContainer>
    </div>
  );
}
