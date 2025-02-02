import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import OrderForm from "@/components/pages/cart/placing-an-order/order-form";
import OrderSummarySection from "@/components/pages/cart/order-submit/order-submit-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корзина – Оформите заказ",
  description:
    "Проверьте свою корзину и завершите покупку за пару кликов. В Kondish вы найдёте всё необходимое с удобной доставкой!",
  icons: "/kondish.svg",
};

export default async function Cart() {
  // await fetchWithDelay();
  return (
    <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section className="">
        <div>
          <div className="flex justify-between items-end py-2">
            <h2 className="text-base font-semibold textgray-900">
              Оформление заказа
            </h2>
            <div className="">
              <Link
                href="/catalog"
                className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5"
              >
                <ArrowUturnLeftIcon className="w-4" />
                <span>В каталог</span>
              </Link>
            </div>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* Компонент суммы заказа */}
      <OrderSummarySection />
    </div>
  );
}
