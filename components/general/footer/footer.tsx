import Link from "next/link";

import Logo from "../navbar/logo";
import FButton from "../fbutton";
import FooterLink from "./footer-link";
import BaseContainer from "../containers/base-container";
import BlockContainer from "../containers/block-container";
import SubscribeForm from "../forms/footer/subscribe-form";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { aboutCompany, forCastomers } from "@/navigation";
import { Suspense } from "react";

const Footer = () => {
  return (
    <footer className="py-6">
      {/* <img
        id="specialButton"
        style={{ cursor: "pointer" }}
        src="https://lidrekon.ru/images/special.png"
        alt="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ"
        title="ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ"
      /> */}
      <BlockContainer>
        <div className="grid grid-cols-4 gap-y-5 gap-x-4">
          {/* Контакты */}
          <div className="flex flex-col gap-3 col-span-4 sm:col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="">
              <Logo />
            </div>
            <div className="flex flex-col mt-auto">
              <span className="text-sm font-bold">
                <a href="tel:79153294209">+7 (915) 329-42-09</a>
              </span>
              <span className="text-sm font-bold mt-1">
                <a href="tel:74956752555">+7 (495) 675-25-55</a>
              </span>
              <span className="text-xs max-w-[150px]">
                Принимаем звонки: Пн-Пт с 09:00 до 18:00 (МСК). Сб-Вс – выходные
              </span>
              <a
                href="mailto:info@kondish.su"
                className="text-xs text-primary mt-4 font-semibold"
              >
                info@kondish.su
              </a>
            </div>
          </div>

          {/* Покупателям */}
          <div className="flex flex-col col-span-2 sm:col-span-1">
            {/* Покупателям title */}
            <div className="text-sm font-bold ">Покупателям</div>
            <div className="flex flex-col space-y-3 mt-3">
              {forCastomers.map((item) => (
                <FooterLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* О компании */}
          <div className="flex flex-col col-span-2 sm:col-span-1">
            {/* О компании title */}
            <div className="text-sm font-bold ">О компании</div>
            <div className="flex flex-col space-y-3 mt-3">
              {aboutCompany.map((item) => (
                <FooterLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Подписка */}
          <div className="flex flex-col max-w-sm  col-span-4 sm:col-span-2 md:col-span-1">
            {/* Обратная связь title */}
            <div className="text-sm font-bold">Обратная связь</div>
            <div className="mt-3">
              <div className="text-xs">
                Подпишитесь на нашу рассылку и получите купон со скидкой 350₽ на
                покупку
              </div>
              <SubscribeForm />
              <div className="text-xs mt-2">
                Нажимая «Подписаться», я даю согласие на получение рекламной
                информации
              </div>
            </div>
          </div>

          {/* Обратная связь кнопка */}
          <div className="col-span-2 sm:col-span-1">
            <Suspense>
              <Button size={"sm"} asChild className="font-semibold">
                <FButton>Обратная связь</FButton>
              </Button>
            </Suspense>
          </div>

          {/* Соцсети */}
          <div className="flex items-center gap-4 col-span-2 sm:col-span-1 ">
            <a target="_blank" href="https://vk.me/kondish">
              <Icon.vk width={24} height={24} />
            </a>
            <a target="_blank" href="https://t.me/mickkey_dee">
              <Icon.telegram width={24} height={24} />
            </a>
            <a target="_blank" href="https://wa.me/+79153294209">
              <Icon.wa width={32} height={32} />
            </a>
          </div>

          <div className="hidden md:block"></div>

          {/* Оценка */}
          <div className="flex flex-col col-span-4 sm:col-span-2 md:col-span-1">
            <Icon.ya />
            <div className="flex items-center gap-2">
              <div className="text-base font-semibold text-gray-900">5,0</div>
              <div className="">
                <div className="flex gap-0.5">
                  {new Array(5).fill(false).map((_, index) => (
                    <Icon.star key={index} className="fill-[#fc0]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs mt-1">
              На основе 160 отзывов 98% покупателей купили бы здесь снова
            </div>
          </div>
        </div>
      </BlockContainer>
      <BaseContainer className="mt-4">
        <div className="flex flex-col items-start md:flex-row justify-between">
          <div className="text-center text-xs text-gray-400">
            © 2021-2025 Kondish.
          </div>
          <Link href={"/terms"} className="text-center text-xs text-gray-400">
            Согласие на обработку данных
          </Link>
          <Link href={"/policy"} className="text-center text-xs text-gray-400">
            Политика конфиденциальности
          </Link>
          <div className="text-center text-xs text-gray-400">
            Разработка сайта —{" "}
            <a href="https://matryoshka-studio.ru" className="text-primary">
              Матрешка
            </a>
          </div>
        </div>
      </BaseContainer>
    </footer>
  );
};

export default Footer;
