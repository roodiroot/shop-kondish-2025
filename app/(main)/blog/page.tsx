import Link from "next/link";
import type { Metadata } from "next";

import BaseContainer from "@/components/general/containers/base-container";

export const metadata: Metadata = {
  title: "Полезные статьи",
  description:
    "В наличии и под заказ. Только надежные и проверенные временем бренды в Kondish.",
  icons: "/kondish.svg",
};

export default async function Blog() {
  return (
    <BaseContainer>
      <div className="flex flex-row gap-4 py-6 w-full">Blog</div>
    </BaseContainer>
  );
}
