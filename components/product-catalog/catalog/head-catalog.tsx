import Link from "next/link";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface HeadCatalogProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  linkArticle?: string;
}
const HeadCatalog: React.FC<HeadCatalogProps> = ({
  name,
  description,
  linkArticle,
}) => {
  return (
    <div className="pt-10 pb-8">
      <div className="flex gap-6 items-center">
        <div className="">
          <div className="flex items-center gap-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>
            {linkArticle ? (
              <Link
                href={linkArticle}
                className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5 hover:bg-gray-50 rounded-full cursor-pointer"
              >
                <ExclamationCircleIcon className="w-4" />
                <span>Узнать подробнее</span>
              </Link>
            ) : null}
          </div>
          {description ? (
            <p className="mt-4 max-w-xl text-sm text-gray-700">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeadCatalog;
