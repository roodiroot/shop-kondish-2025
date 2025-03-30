"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import RequiredField from "@/components/ui/required-field";
import InputPhoneMask from "@/components/ui/input-phone-mask";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackCastomer } from "@/data/forms/forms-api";
import { feedbackFormSchema } from "@/schema/feed-back-schemas";

interface FeedbackFormBlockProps extends React.HTMLAttributes<HTMLFormElement> {
  onCloseSheet?: () => void;
}

const FeedbackFormBlock: React.FC<FeedbackFormBlockProps> = ({
  onCloseSheet,
  className,
}) => {
  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof feedbackFormSchema>) => {
    await feedbackCastomer({
      username: values.username,
      email: values.email,
      phone: values.phone,
      message: values.message,
    }).then((data) => {
      if (data.ok) {
        console.log(data);
        if (onCloseSheet) onCloseSheet();
        toast("Форма успешно отправлена");
        form.reset({
          username: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3",
          className
        )}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Ваше имя
                <RequiredField />
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Телефон
                <RequiredField />
              </FormLabel>
              <FormControl>
                <InputPhoneMask
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  setValue={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-3">
              <FormLabel className="font-bold">Комментарий</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold">
          Отправить
        </Button>
        <div className="text-xs">
          Нажимая кнопку «Отправить», я даю согласие на{" "}
          <Link className="text-primary font-bold" href="/terms">
            обработку своих данных
          </Link>
          .
        </div>
      </form>
    </Form>
  );
};

export default FeedbackFormBlock;
