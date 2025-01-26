"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BanknotesIcon, UsersIcon } from "@heroicons/react/24/outline";

import ChoicePayRadio from "./choice-pay-radio";
import { useCartStore } from "@/hooks/cart-store";
import EmptyCart from "../empty-cart";

const OrderForm = () => {
  const { cart } = useCartStore();
  const { control } = useFormContext(); // Получаем form.control из контекста

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <form className="mt-6 space-y-7" id="order-form">
      <section>
        <h3 className="text-lg font-medium text-gray-900">1. Доставка</h3>
        <FormField
          control={control}
          name="delivery.address"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                Адрес
              </FormLabel>
              <FormControl>
                <Input className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
      <section className="pt-6 border-t">
        <h3 className="text-lg font-medium text-gray-900">
          2. Контактные данные
        </h3>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="mt-2 col-span-2">
            <FormField
              control={control}
              name="contact.fullName"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    ФИО
                  </FormLabel>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 col-span-2 sm:col-span-1">
            <FormField
              control={control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Телефон
                  </FormLabel>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 col-span-2 sm:col-span-1">
            <FormField
              control={control}
              name="contact.email"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </section>
      <section className="pt-6 border-t">
        <h3 className="text-lg font-medium text-gray-900">3. Оплата</h3>
        <FormField
          control={control}
          name="payment" // Связано с полем "payment" в вашей схеме
          render={({ field }) => (
            <FormItem>
              <FormControl className="mt-2 grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <ChoicePayRadio
                    title="При получении"
                    description="Оплата картой или наличными при получении"
                    Icon={BanknotesIcon}
                    checked={field.value === "onDelivery"} // Проверка выбранного значения
                    onChange={() => field.onChange("onDelivery")} // Установка значения
                  />
                  <ChoicePayRadio
                    title="Уточнить у менеджера"
                    description="Если нужна помощь с выбором способа и оплатой"
                    Icon={UsersIcon}
                    checked={field.value === "consultWithManager"} // Проверка выбранного значения
                    onChange={() => field.onChange("consultWithManager")} // Установка значения
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
      <button type="submit">Батон</button>
    </form>
  );
};

export default OrderForm;
