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
    <div className="py-16">
      <div className="flex gap-6 items-center">
        <div className="">
          <div className="flex items-center gap-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>
            <Link
              href={linkArticle ? linkArticle : "/blog"}
              className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5 hover:bg-gray-50 rounded-full cursor-pointer"
            >
              <ExclamationCircleIcon className="w-4" />
              <span>Узнать подробнее</span>
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm text-gray-700">
            {description ||
              "Energolux — швейцарский бренд, основанный в 2010 году в Базеле, сочетает интеллект, энергосбережение и удаленное управление, создавая технику для комфортной и идеальной среды."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeadCatalog;
