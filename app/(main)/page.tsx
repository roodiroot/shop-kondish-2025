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
import FeedbackButtonSection from "@/components/pages/hero-page-components/feedback-button-section/feedback-button-section";

export const metadata: Metadata = {
  title: "Kondish — работаем честно",
  description:
    "Kondish — более 15 лет работаем для вас. Честные цены, профессиональный подбор, установка и обслуживание кондиционеров.",
  icons: "/kondish.svg",
  openGraph: {
    title: "Kóndish установка и продажа кондиционеров в Москве.",
    description:
      "Установка и подбор кондиционеров и сплит-систем. | Более 15 лет устанавливаем климатическую технику в ваших домах.",
    siteName: "Kóndish",
    type: "website",
    locale: "ru_RU",
    url: "https://kondish.su",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/Frame_23_81477b6c9e.jpg`,
        width: 1200,
        height: 630,
        alt: "Kóndish установка и продажа кондиционеров в Москве.",
      },
    ],
  },
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

  const heroScreens = await getHeroScreens();
  const content = await getHeroPage();
  const productsSale = await getAllProducts(paramsSale.toString());
  const productsHit = await getAllProducts(paramsHit.toString());
  const reviews = (await getReviews()) || [];
  const articles = await getArticles({ limit: 10 });
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
      <BlogSection articles={articles?.data?.data} />
      <QASection qaes={qaes} />
      <FeedbackButtonSection />
    </>
  );
}
