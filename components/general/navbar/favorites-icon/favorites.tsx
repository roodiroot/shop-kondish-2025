import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import FavoritesCounter from "./favorites-counter";

const Favorites: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn("flow-root", className)}>
      <Link href="/favorites" className="group -m-2 flex items-center p-2">
        <HeartIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
        <div className="ml-1 text-sm font-bold text-gray-700 group-hover:text-gray-800">
          <FavoritesCounter />
        </div>
        <span className="sr-only">items in favorites, view bag</span>
      </Link>
    </div>
  );
};

export default Favorites;
