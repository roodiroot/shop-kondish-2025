import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { registerUser } from "@/data/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registrationFormSchema } from "@/schema/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import InputPassword from "@/components/ui/input-password";
import RequiredField from "@/components/ui/required-field";

interface RegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  switchForm: (value: "LOGIN" | "REGISTER") => void;
  onCloseSheet?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  switchForm,
  onCloseSheet,
}) => {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    await registerUser({
      username: values.username,
      email: values.email,
      password: values.password,
    })
      .then(() => {
        if (onCloseSheet) {
          onCloseSheet();
        }
        toast.success("Письмо с подтверждением отправлено на ваш email.");
      })
      .catch(() => {
        toast.error("Ошибка регестрации.");
        form.reset();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Логин
                <RequiredField />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Придумайте уникальное имя пользователя (не менее 2 символов).
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Электронная почта
                <RequiredField />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Введите действующий адрес электронной почты.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Пароль
                <RequiredField />
              </FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription>
                Придумайте пароль (минимум 8 символов, буквы, цифры, символы).
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Подтверждение пароля
                <RequiredField />
              </FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                Введите пароль ещё раз.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold">
          Войти
        </Button>
        <div className="text-xs">
          Уже есть аккаунт?{" "}
          <span
            onClick={() => switchForm("LOGIN")}
            className="underline underline-offset-4 font-bols text-primary cursor-pointer"
          >
            Войти
          </span>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
