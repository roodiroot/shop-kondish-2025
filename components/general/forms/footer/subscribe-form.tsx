"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribe } from "@/data/forms/forms-api";
import { formSubscribeSchema } from "@/schema/feed-back-schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const SubscribeForm = () => {
  const form = useForm<z.infer<typeof formSubscribeSchema>>({
    resolver: zodResolver(formSubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSubscribeSchema>) => {
    await subscribe({
      email: values.email,
    }).then((data) => {
      if (data.ok) {
        console.log(data);
        toast("Спасибо за подписку");
        form.reset({ email: "" });
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex gap-1 mt-2"}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="ont-semibold text-xs">
          Подписаться
        </Button>
      </form>
      {form.getFieldState("email").error ? (
        <span className="text-xs text-destructive">
          {form.getFieldState("email").error?.message}
        </span>
      ) : null}
    </Form>
  );
};

export default SubscribeForm;
