import BlockContainer from "@/components/general/containers/block-container";

import { Article } from "@/types/catalog";
import BlogCarousel from "./blog-carousel";

interface BlogSectionProps {
  articles?: Article[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ articles }) => {
  return (
    <BlockContainer className="mt-10">
      <h3 className="text-xl font-bold">Блог</h3>
      <div className="relative z-10 w-full mt-4">
        <BlogCarousel articles={articles} />
      </div>
    </BlockContainer>
  );
};

export default BlogSection;
