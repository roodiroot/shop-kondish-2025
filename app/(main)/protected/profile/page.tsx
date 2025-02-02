import Link from "next/link";
import { cookies } from "next/headers";

import { getMy } from "@/data/api";
import { safeParseJson } from "@/utils/safe-parse-json";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import ProfileInfo from "@/components/pages/profile/profil-info";
import ProfileFeatures from "@/components/pages/profile/profile-features";
import OrderHistort from "@/components/pages/profile/order-history/order-history";

export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("userData")?.value;
  const token = cookieStore.get("authToken")?.value;

  const parseUser = safeParseJson(user);
  const { ordersArray } = await getMy(token || "");

  // console.log(parseUser);

  return (
    <div className="pt-10 pb-24 max-w-2xl mx-auto lg:max-w-7xl">
      <div className="flex items-center gap-4 md:gap-10">
        <h1 className="text-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
          {parseUser?.username}
        </h1>
        <Link
          href={"/catalog"}
          className="flex gap-2 items-center text-sm text-sky-700 px-3 py-0.5 hover:bg-gray-50 rounded-full cursor-pointer"
        >
          <ExclamationCircleIcon className="min-w-4 w-4" />
          <span>Перейти в каталог</span>
        </Link>
      </div>
      <div className="flex mt-8 flex-col lg:flex-row gap-10 items-start">
        <section className="flex-1">
          <ProfileFeatures />
          {parseUser && <ProfileInfo user={parseUser} />}
        </section>
        <div className="w-full max-w-2xl">
          <OrderHistort orders={ordersArray} />
        </div>
      </div>
    </div>
  );
}
