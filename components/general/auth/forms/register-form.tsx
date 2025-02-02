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
import { useAuth } from "@/context/authcontext";
import { registrationFormSchema } from "@/schema/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import InputPassword from "@/components/ui/input-password";

interface RegisterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  switchForm: (value: "LOGIN" | "REGISTER") => void;
  onCloseSheet?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  switchForm,
  onCloseSheet,
}) => {
  const authContext = useAuth();
  const { login } = authContext ?? {};

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
      .then((data) => {
        if (login) {
          login(data.jwt, data.user);
        }
        if (onCloseSheet) {
          onCloseSheet();
        }

        toast.success("Вы успешно зарегестрировались!");
      })
      .catch(() => {
        form.reset();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Придумайте уникальное имя пользователя (не менее 2 символов).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Введите действующий адрес электронной почты.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription>
                Придумайте пароль (минимум 8 символов, буквы, цифры, символы).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormDescription>Введите пароль ещё раз.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Войти
        </Button>
        <div className="text-center text-sm">
          Уже есть аккаунт?{" "}
          <span
            onClick={() => switchForm("LOGIN")}
            className="underline underline-offset-4 cursor-pointer"
          >
            Войти
          </span>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
