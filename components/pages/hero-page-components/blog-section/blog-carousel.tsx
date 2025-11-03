import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogPreview from "./blog-preview";
import { Article } from "@/types/catalog";

interface BlogCarouselProps {
  articles?: Article[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ articles }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <div className="overflow-hidden">
        <CarouselContent>
          {articles
            ? articles?.map((article, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <BlogPreview
                      slug={article.slug}
                      title={article.title}
                      subtitle={article.subtitle}
                      dateString={article.createdAt}
                      label={article.label}
                      image={article.image?.formats.small.url}
                    />
                  </div>
                </CarouselItem>
              ))
            : null}
        </CarouselContent>
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BlogCarousel;
