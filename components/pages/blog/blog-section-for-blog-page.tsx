import { ArticleData } from "@/types/catalog";

import BlogPreview from "../hero-page-components/blog-section/blog-preview";
import PaginationBlockServer from "@/components/product-catalog/catalog/pagination/pagination-block-server";

interface BlogSectionProps {
  articlesData?: ArticleData;
}

const BlogSectionForBlogPage: React.FC<BlogSectionProps> = ({
  articlesData,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-4">
        {articlesData?.data?.map((article) => (
          <BlogPreview
            key={article.slug}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle}
            dateString={article.createdAt}
            label={article.label}
            image={article.image?.formats.small.url}
          />
        ))}
      </div>
      <PaginationBlockServer pagination={articlesData?.meta?.pagination} />
    </div>
  );
};

export default BlogSectionForBlogPage;
