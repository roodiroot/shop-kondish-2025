import Link from "next/link";

import { Button } from "@/components/ui/button";
import BaseContainer from "@/components/general/containers/base-container";

export default async function NotFound() {
  return (
    <BaseContainer className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Страница не найдена
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          К сожалению, страница, которую вы ищете, не найдена.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href={"/"}>На главную</Link>
          </Button>
          <Link href="/catalog" className="text-sm font-semibold text-gray-900">
            Каталог товаров
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </BaseContainer>
  );
}
