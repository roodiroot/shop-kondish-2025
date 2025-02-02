"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { requestResetPasswordSchema } from "@/schema/auth-schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { requestResetPassword } from "@/data/api";

interface RequestResetPasswordFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}
const RequestResetPasswordForm: React.FC<RequestResetPasswordFormProps> = ({
  className,
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof requestResetPasswordSchema>>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof requestResetPasswordSchema>
  ) => {
    startTransition(() => {
      requestResetPassword(values)
        .then((data) => {
          if (data.ok) toast.success("Пароль отправлен на ваш email!");
          form.reset();
        })
        .catch((e) => toast.error("Что то пошло не так"));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Отправить
        </Button>
      </form>
    </Form>
  );
};

export default RequestResetPasswordForm;
