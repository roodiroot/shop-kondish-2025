import Link from "next/link";
import { Suspense } from "react";

import Logo from "../logo";
import FButton from "../../fbutton";

import { CatalogForNavbar } from "../navbar";
import { Button } from "@/components/ui/button";

import StaticPageLink from "./static-page-link";
import BrandPageLink from "./brand-page-link";

interface MobilMenuBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  closeDrawer: (value: boolean) => void;
  navigation: CatalogForNavbar;
}

const BodyMobilMenu: React.FC<MobilMenuBodyProps> = ({
  closeDrawer,
  navigation,
  ...props
}) => {
  return (
    <div {...props} className="h-full">
      <div className="px-4 py-2 border-b border-white/60 flex items-center gap-4">
        <div onClick={() => closeDrawer(false)}>
          <Logo className="h-11" />
        </div>
        <a className="text-white font-bold text-sm" href="tel:79153294209">
          +7 (915) 329-42-09
        </a>
      </div>
      <div className="h-full  overflow-auto flex flex-col justify-between">
        <div className="relative px-4 py-8 border-b border-white/60">
          <ul className="flex flex-col gap-5">
            {navigation?.category?.map((page) => {
              if (page.available === false) return null;
              return (
                <li
                  key={page.name}
                  className="text-sm font-semibold text-white"
                >
                  <Link
                    onClick={() => closeDrawer(false)}
                    href={`/catalog/${page.slug}`}
                  >
                    {page.name}
                  </Link>
                </li>
              );
            })}
            {navigation.brands?.length && (
              <BrandPageLink
                brands={navigation.brands}
                closeDrawer={closeDrawer}
              />
            )}
            {navigation.staticPage?.map((page) => (
              <StaticPageLink
                key={page.name}
                closeDrawer={closeDrawer}
                page={page}
              />
            ))}
          </ul>
          <Suspense>
            <Button
              asChild
              className="w-full mt-5 shadow-none border-white border font-semibold text-xs"
            >
              <FButton>Консультация</FButton>
            </Button>
          </Suspense>
        </div>
        <div className="px-4 pt-8 pb-20 max-w-xs space-y-4">
          <div className="text-xs text-white">
            <div className="font-semibold">Москва</div>
            <div className="">1-й Кожуховский пр-д, 11, офис 127</div>
            <div className="font-semibold">info@kondish.su</div>
          </div>
          <div className="text-xs text-white">
            <div className="font-semibold text-xl">
              <a href="tel:79153294209">+7 (915) 329-42-09</a>
            </div>
            <div className="">
              Принимаем звонки: Пн-Пт с 09:00 до 20:00 (МСК). Сб-Вс – выходные
            </div>
          </div>
          {/* <div className="text-xs text-white">
            < className="font-bold underline">Перезвоните мне</>
          </div>
          <div className="text-xs text-white pb-8">
            <div className="font-bold underline">Social</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BodyMobilMenu;
