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
import { resetPasswordSchema } from "@/schema/auth-schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { resetPassword } from "@/data/api";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import InputPassword from "@/components/ui/input-password";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLFormElement> {
  code?: string;
}
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  code,
  className,
}) => {
  const authContext = useAuth();
  const { login } = authContext ?? {};

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: code,
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          if (login) {
            login(data.jwt, data.user);
            router.push("/protected/profile");
          }
          toast.success("Вы успешно вошли в систему!");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
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

export default ResetPasswordForm;
