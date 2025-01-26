"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbMap = Record<string, string>;

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  breadcrumbMap: BreadcrumbMap;
  path?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  path,
  breadcrumbMap,
  className,
}) => {
  const pathname = usePathname();

  // Разделяем путь на части
  const pathSegments = path
    ? path.split("/").filter(Boolean)
    : pathname.split("/").filter(Boolean);

  // console.log(pathSegments);
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav
        aria-label="breadcrumb"
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 md:max-w-7xl"
      >
        <ol className="flex items-center py-2 space-x-4">
          {pathSegments.map((segment, index) => {
            // Формируем путь до текущего сегмента
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            // Преобразуем сегмент в читаемое имя
            const displayName =
              breadcrumbMap[segment] || decodeURIComponent(segment);

            return (
              <li key={path} className="text-sm">
                {!isLast ? (
                  <div className="flex items-center ">
                    <Link
                      href={path}
                      className="mr-4 font-medium text-gray-900"
                    >
                      {displayName}
                    </Link>
                    <svg
                      viewBox="0 0 6 20"
                      aria-hidden="true"
                      className="w-auto h-5 text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <span
                    aria-current="page"
                    className="text-gray-500 font-medium"
                  >
                    {displayName}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
