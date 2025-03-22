import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

import { Reviews } from "@/types/catalog";

const ReviewsItem = ({ review }: { review: Reviews }) => {
  const date = new Date(review.createdAt);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < review.grade);

  return (
    <Link
      href={"https://yandex.ru/maps/org/kondish/223415694122/reviews"}
      target="_blank"
      className="flex-1"
    >
      <div>
        <span className="font-semibold">{review.author}</span>
        <span className="text-xs text-gray-400 ml-2">{formattedDate}</span>
      </div>
      <div className="flex gap-0.5 mt-1">
        {stars.map((isFilled, index) => (
          <Icon.star
            key={index}
            className={cn(isFilled ? "fill-[#fc0]" : "fill-gray-200")}
          />
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-4 leading-6 line-clamp-4">
        {review.description}
      </p>
    </Link>
  );
};

export default ReviewsItem;
