"use client";

import { useAuth } from "@/context/authcontext";
import { formOrderSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const OrderFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};
  const form = useForm<z.infer<typeof formOrderSchema>>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      delivery: {
        address: auth?.user?.address || "", // Начальное значение для адреса
      },
      contact: {
        fullName: auth?.user?.fullName || "", // Начальное значение для ФИО
        phone: auth?.user?.phone || "", // Начальное значение для телефона
        email: auth?.user?.email || "", // Начальное значение для email, можно удалить, если необязательное поле
      },
      payment: "onDelivery", // Значение по умолчанию для способа оплаты
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export default OrderFormProvider;
