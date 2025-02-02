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
import { loginUser } from "@/data/api";
import { loginFormSchema } from "@/schema/auth-schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authcontext";
import { toast } from "sonner";
import Link from "next/link";
import InputPassword from "@/components/ui/input-password";

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {
  switchForm: (value: "LOGIN" | "REGISTER") => void;
  onCloseSheet?: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ switchForm, onCloseSheet }) => {
  const authContext = useAuth();
  const { login } = authContext ?? {};

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await loginUser({
      identifier: values.identifier,
      password: values.password,
    })
      .then((data) => {
        if (login) {
          login(data.jwt, data.user);
        }
        if (onCloseSheet) {
          onCloseSheet();
        }
        toast.success("Вы успешно вошли в систему!");
      })
      .catch(() => {
        toast.error(
          "Неверный логин или пароль. Пожалуйста, проверьте введённые данные."
        );
        form.reset();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта / Логин</FormLabel>
              <FormControl>
                <Input {...field} placeholder="m@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Пароль</FormLabel>
                <Link
                  onClick={() => onCloseSheet && onCloseSheet()}
                  href="request-password-reset"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Войти
        </Button>
        <div className="text-center text-sm">
          Нет аккаунта?{" "}
          <span
            onClick={() => switchForm("REGISTER")}
            className="underline underline-offset-4 cursor-pointer"
          >
            Создайте его!
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
