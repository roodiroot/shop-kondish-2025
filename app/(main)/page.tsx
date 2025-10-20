import { Metadata } from "next";

import { getQA } from "@/data/qa-api";
import { getArticles } from "@/data/article-api";
import { getReviews } from "@/data/reviews-api";
import { getAllProducts } from "@/data/product-api";
import { getHeroScreens } from "@/data/hero-screen-api";
import { getHeroPage } from "@/data/pages/hero-page-api";

import QASection from "@/components/pages/hero-page-components/qa-section/qa-section";
import BlogSection from "@/components/pages/hero-page-components/blog-section/blog-section";
import HeroSection from "@/components/pages/hero-page-components/hero-section/hero-section";
import ReviewsSection from "@/components/pages/hero-page-components/reviews-section/reviews-section";
import SaleProductsSection from "@/components/pages/hero-page-components/sale-products-section/sale-products-section";
import AboutSection from "@/components/pages/hero-page-components/about-section/about-section";

export const metadata: Metadata = {
  title: "Kondish — работаем честно",
  description:
    "Kondish — более 10 лет на рынке климатической техники. Честные цены, профессиональный подбор, установка и обслуживание кондиционеров.",
  icons: "/kondish.svg",
};

export default async function Home() {
  const paramsSale = new URLSearchParams({
    "filters[available]": "true",
    "filters[sale][$gt]": "0",
    populate: "*",
  });
  const paramsHit = new URLSearchParams({
    "filters[available]": "true",
    "filters[hit]": "true",
    populate: "*",
  });

  // получаем блок героя
  const heroScreens = await getHeroScreens();
  // получаем блок о компании
  const content = await getHeroPage();
  // получаем товары
  const productsSale = await getAllProducts(paramsSale.toString());
  const productsHit = await getAllProducts(paramsHit.toString());

  // получаем отзывы
  const reviews = (await getReviews()) || [];
  // получаем статьи
  const articles = await getArticles({ limit: 10 });
  // получаем вопросы, важно не более 5 - 6
  const qaes = (await getQA({ limit: 5 })) || [];
  return (
    <>
      <HeroSection heroScreens={heroScreens} />
      <SaleProductsSection
        title="Сегодня со скидкой"
        products={productsSale?.data}
      />
      <SaleProductsSection title="Хиты продаж" products={productsHit?.data} />
      <AboutSection content={content?.aboutContent} />
      <ReviewsSection reviews={reviews} />
      <BlogSection articles={articles?.data} />
      <QASection qaes={qaes} />
    </>
  );
}
