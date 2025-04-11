import Link from "next/link";
import { Metadata } from "next";
import { cookies } from "next/headers";

import { Product } from "@/types/catalog";
import { getMy, updateUser } from "@/data/api";
import { getOrderById } from "@/data/order-api";
import { getDeliveryTypeLabel } from "@/utils/mappings";
import { getAllProductsBySlug } from "@/data/product-api";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import NotFoundNotification from "@/components/general/notification/not-found-notification";
import OrderSummarySectionComplate from "@/components/pages/cart/order-submit/order-submit-section-complate";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export interface ProductWithCount {
  product: Product;
  count: number;
}

export const metadata: Metadata = {
  title: "Заказ принят",
  description:
    "Спасибо за ваш выбор! Мы с радостью обработаем ваш заказ. Информация о заказе отправлена вам на почту.",
  icons: "/kondish.svg",
};

export default async function OrderSuccess({ searchParams }: Props) {
  const cookieStore = await cookies();
  const orderId = (await searchParams).orderId;

  //Проверяем есть ли такой заказ
  let order;
  try {
    order = await getOrderById(orderId || "");
  } catch {
    return <NotFoundNotification />;
  }

  //Если пользователь залогинен записываем ID ордера к User
  const token = cookieStore.get("authToken")?.value;
  if (token && order) {
    const user = await getMy(token);
    if (user) {
      const currentOrderIds = user?.ordersArray || [];
      // Проверяем что ордера с таким Ids нет в массиве
      const oldOrder = currentOrderIds?.find((id) => id === orderId);
      if (!oldOrder)
        await updateUser(user.id, token, {
          ordersArray: [...currentOrderIds, orderId],
        });
    }
  }

  //Получаем товары по Ids из ордера
  const products = await getAllProductsBySlug(
    order.order.products.map((product) => product.slug)
  );

  //Соединяем 2 массива
  const productsWithCounts = products?.data.map((product) => {
    const cartItem = order.order.products.find(
      (item) => item.slug === product.slug
    );
    return {
      product,
      count: cartItem ? Number(cartItem.count) : 0,
    };
  });

  //Считаем общее кол-во товаров
  const totalProducts = order.order.products.reduce(
    (total, item) => total + Number(item.count),
    0
  );

  return (
    <div className="pt-10 pb-24 max-w-2xl mx-auto lg:max-w-7xl">
      <div className="flex items-center gap-4 md:gap-10">
        <h1 className="text-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
          Заказ №{order.order.id}
        </h1>
        <Link
          href={"/protected/profile"}
          className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5 hover:bg-gray-50 rounded-full cursor-pointer"
        >
          <ExclamationCircleIcon className="min-w-4 w-4" />
          <span>Вернуться ко всем заказам</span>
        </Link>
      </div>
      <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section>
          <div className="flex justify-between items-end py-2">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Заказ №{order.order.id} успешно создан
              </h2>
              <p className="mt-2 max-w-xl text-sm text-gray-700">
                Благодарим Вас за заказ, и уже начали его собирать. Уведомления
                о статусе заказа вам сообщит менеджер по телефону.
              </p>
            </div>
          </div>
          <section className="mt-4">
            <h3 className="text-lg font-semibold">Информация о доставке</h3>
            <div className="text-sm mt-2">
              <p className="font-medium">Адресная доставка</p>
              <p className="text-gray-500">{order.order.delivery.address}</p>
            </div>
            <div className="text-sm mt-2">
              <p className="font-medium">Контактное лицо</p>
              <p className="text-gray-500">{order.order.contact.fullName}</p>
            </div>
            <div className="text-sm mt-2">
              <p className="font-medium">Email для связи</p>
              <p className="text-gray-500">{order.order.contact.email}</p>
            </div>
          </section>
          <section className="mt-4">
            <h3 className="text-lg font-semibold">Информация об оплате</h3>
            <div className="text-sm mt-2">
              <p className="font-medium">Способ оплаты</p>
              <p className="text-gray-500">
                {getDeliveryTypeLabel(order.order.payment)}
              </p>
            </div>
          </section>
        </section>

        {/* Компонент суммы заказа */}
        <OrderSummarySectionComplate
          productList={productsWithCounts}
          totalOrderPrice={order.order.totalPrice}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}
