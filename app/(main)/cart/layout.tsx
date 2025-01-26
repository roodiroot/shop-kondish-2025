import Link from "next/link";
import { cookies } from "next/headers";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import OrderFormProvider from "@/providers/order-form-propvider";
import BaseContainer from "@/components/general/containers/base-container";
import { safeParseJson } from "@/utils/safe-parse-json";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const user = cookieStore.get("userData")?.value;
  const parseUser = safeParseJson(user);

  return (
    <OrderFormProvider>
      <BaseContainer>
        <div className="pt-16 pb-24 max-w-2xl mx-auto lg:max-w-7xl">
          <div className="flex items-center gap-4 md:gap-10">
            <h1 className="text-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
              Корзина
            </h1>
            <Link
              href={parseUser ? "/protected/profile" : "/"}
              className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5 hover:bg-gray-50 rounded-full cursor-pointer"
            >
              <ExclamationCircleIcon className="min-w-4 w-4" />
              <span>
                {parseUser
                  ? "Перейти в профиль, чтобы просмотреть заказы."
                  : "Войдите в профиль, чтобы просмотреть ваши заказы."}
              </span>
            </Link>
          </div>
          {children}
        </div>
      </BaseContainer>
    </OrderFormProvider>
  );
}
