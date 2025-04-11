import { getArticles } from "@/data/article-api";
import { getAllProducts } from "@/data/product-api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "blog",
    "cart",
    "catalog",
    "catalog/brands",
    "favorites",
    "about-kondish",
    "contacts",
    "delivery",
    "faq",
    "installation",
    "installation-climber",
    "installation-pik",
    "offer",
    "policy",
    "quality-guarantee",
    "returns",
    "terms",
  ].map((page) => ({
    url: process.env.NEXT_PUBLIC_URL + page,
    lastModified: new Date().toISOString(),
    changefreq: "monthly",
    priority: 1,
  }));

  // Получаем статьи
  const articles = await getArticles({ limit: 1000 });
  const articlesPage =
    articles?.data.map((art) => ({
      url: process.env.NEXT_PUBLIC_URL + "blog/" + art.slug,
      lastModified: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    })) || [];

  // Получаем товары
  const paramsProduct = new URLSearchParams({
    "pagination[pageSize]": "10000",
  });
  const products = await getAllProducts(paramsProduct.toString());
  const productsPage =
    products?.data.map((product) => ({
      url: process.env.NEXT_PUBLIC_URL + "product/" + product.slug,
      lastModified: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    })) || [];

  return [...staticPages, ...articlesPage, ...productsPage];
}
