import Link from "next/link";
import Logo from "../logo";
import { CatalogForNavbar } from "../navbar";
import { Button } from "@/components/ui/button";
import FButton from "../../fbutton";

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
        <a className="text-white font-bold text-sm" href="tel:84956752555">
          8 (495) 675-2555
        </a>
      </div>
      <div className="h-full overflow-auto">
        <div className="px-4 py-8 border-b border-white/60">
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
            {navigation.brands?.map((page) => (
              <li key={page.name} className="text-sm font-semibold text-white">
                <Link
                  onClick={() => closeDrawer(false)}
                  href={`/catalog/brands/${page.slug}`}
                >
                  {page.name}
                </Link>
              </li>
            ))}
            {navigation.staticPage?.map((page) => {
              if (page.href) {
                return (
                  <li
                    key={page.name}
                    className="text-sm font-semibold text-white"
                  >
                    <Link onClick={() => closeDrawer(false)} href={page.href}>
                      {page.name}
                    </Link>
                  </li>
                );
              } else if (page.pages?.length) {
                return (
                  <li
                    key={page.name}
                    className="text-sm font-semibold text-white"
                  >
                    {page.name}
                    <ul className="flex flex-col gap-2 pl-4">
                      {page.pages.map((subPage) => (
                        <li
                          key={subPage.name}
                          className="text-sm font-semibold text-white"
                        >
                          <Link
                            onClick={() => closeDrawer(false)}
                            href={subPage.href}
                          >
                            {subPage.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
            })}
          </ul>
          <Button
            asChild
            className="w-full mt-5 shadow-none border-white border font-semibold text-xs"
          >
            <FButton>Консультация</FButton>
          </Button>
        </div>
        <div className="px-4 py-8 max-w-xs space-y-4">
          <div className="text-xs text-white">
            <div className="font-semibold">Москва</div>
            <div className="">1-й Кожуховский пр-д, 11, офис 127</div>
            <div className="font-semibold">info@kondish.su</div>
          </div>
          <div className="text-xs text-white">
            <div className="font-semibold text-xl">8 (495) 675-2555</div>
            <div className="">
              Принимаем звонки: Пн-Пт с 09:00 до 20:00 (МСК). Сб-Вс – выходные
            </div>
          </div>
          <div className="text-xs text-white">
            <div className="font-bold underline">Перезвоните мне</div>
          </div>
          <div className="text-xs text-white pb-8">
            <div className="font-bold underline">Social</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMobilMenu;
