"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authcontext";
import { Button } from "@/components/ui/button";
import { formInfoProfileSchema } from "@/schema";
import { updateUser, UserAuth } from "@/data/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserData } from "@/utils/cookies.ts/cookies";

import InputPhone from "@/components/ui/input-phone";

interface ProfileInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  user: UserAuth;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};

  const [isPending, startTransition] = useTransition();
  const [isModified, setIsModified] = useState(false); // Состояние для отслеживания изменений

  const form = useForm<z.infer<typeof formInfoProfileSchema>>({
    resolver: zodResolver(formInfoProfileSchema),
    defaultValues: {
      delivery: {
        address: user.address, // Начальное значение для адреса
      },
      contact: {
        fullName: user?.fullName, // Начальное значение для ФИО
        phone: user?.phone || undefined, // Начальное значение для телефона
      },
    },
  });

  const { watch, handleSubmit } = form;
  const watchedValues = watch(); // Следим за всеми полями

  // Проверка изменений
  useEffect(() => {
    // Определение начальных значений
    const initialValues = {
      delivery: {
        address: user.address,
      },
      contact: {
        fullName: user?.fullName,
        phone: user?.phone,
      },
    };
    const hasChanged =
      JSON.stringify(initialValues) !== JSON.stringify(watchedValues);
    setIsModified(hasChanged);
  }, [watchedValues]);

  async function onSubmit(values: z.infer<typeof formInfoProfileSchema>) {
    if (isModified && auth?.token) {
      startTransition(async () => {
        await updateUser(user?.id, auth?.token || "", {
          fullName: values.contact.fullName,
          address: values.delivery.address,
          phone: values.contact.phone,
        }).then((i) => {
          updateUserData(i);
          toast("Данные обновлены");
          window.location.reload();
        });
      });
    }
  }

  return (
    <Form {...form}>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-semibold">Информация о доставке</h3>
        <div className="text-sm mt-2">
          <FormField
            control={form.control}
            name="delivery.address"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="font-medium">Адресная доставка</FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 text-gray-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="text-sm mt-2">
          <FormField
            control={form.control}
            name="contact.fullName"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="font-medium">Контактное лицо</FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 text-gray-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="text-sm mt-2">
          <FormField
            control={form.control}
            name="contact.phone"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="font-medium">Телефон</FormLabel>
                <FormControl>
                  <InputPhone
                    className="mt-2 text-gray-500"
                    setValue={field.onChange}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-sm mt-2">
          <p className="font-medium">Email для связи</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="mt-4">
          <Button disabled={!isModified || isPending}>
            Сохранить изменения
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileInfo;
