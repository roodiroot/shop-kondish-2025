import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  slug: string;
  subtitle?: string;
  dateString?: string;
  label?: string;
  image?: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  slug,
  subtitle,
  dateString,
  label,
  image,
  className,
}) => {
  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden bg-white flex flex-col",
        className
      )}
    >
      <Link href={`/blog/${slug}`} className="absolute inset-0" />
      <div className="flex-1 bg-gray-50 aspect-[2/1.3] relative">
        <Image
          src={
            image
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`
              : "/fish.jpg"
          }
          alt={`${label}_image`}
          width={320}
          height={320}
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex gap-2 items-center">
          <div className="px-2 py-1 bg-primary/40 text-xs text-primary font-bold rounded-sm">
            {label}
          </div>
          <data className="text-xs text-primary" value="">
            {formattedDate}
          </data>
        </div>
        <div className="mt-6">
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
