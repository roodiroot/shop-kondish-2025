import Image from "next/image";
import type { Metadata } from "next";

import BlogContent from "@/components/pages/blog/blog-page/content-blog";
import BaseContainer from "@/components/general/containers/base-container";

import { getArticleBySlug } from "@/data/article-api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);
  return {
    title: article?.title,
    description: article?.subtitle,
    icons: "/kondish.svg",
    openGraph: {
      title: article?.title,
      description: article?.subtitle,
      siteName: "Kóndish",
      type: "website",
      locale: "ru_RU",
      url: "https://kondish.su",
      images: [
        {
          url: article?.image?.formats?.large?.url
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${article?.image?.formats?.large?.url}`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${article?.image?.formats?.medium?.url}`,
          width: 1200,
          height: 630,
          alt: "Kóndish установка и продажа кондиционеров в Москве.",
        },
      ],
    },
  };
}

export default async function AriclePage({ params }: Props) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <BaseContainer>
        <div className="pt-10 pb-8">Такой статьи не найдено!</div>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <div className="pt-10 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {article.title}
        </h1>
      </div>
      <div className="relative w-full overflow-hidden aspect-[1.5/2] sm:aspect-[2/1] lg:aspect-[2.4/1] bg-gray-100 rounded-lg">
        <Image
          width={1200}
          height={400}
          className="absolute w-full h-full object-cover"
          src={
            article.image?.formats?.large?.url
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${article?.image?.formats?.large?.url}`
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${article?.image?.formats?.medium?.url}`
          }
          alt=""
        />
      </div>
      <BlogContent className="mt-8" content={article?.text} />
    </BaseContainer>
  );
}
