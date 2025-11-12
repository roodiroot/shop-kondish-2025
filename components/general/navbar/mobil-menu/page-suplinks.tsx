"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Page } from "@/navigation";
import { Button } from "@/components/ui/button";
import FButton from "../../fbutton";

const PageSuplink = ({
  page,
  closeDrawer,
}: {
  page: { name: string; pages?: Page[] };
  closeDrawer: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li key={page.name} className="text-sm font-semibold text-white">
      <div onClick={() => setIsOpen(true)} className="flex gap-1 items-center">
        {page.name} <ChevronRight className="size-4" />
      </div>
      {isOpen && (
        <div className="absolute top-0 inset-x-0 bg-primary  px-4 py-8 border-b border-white/60">
          <div
            onClick={() => setIsOpen(false)}
            className="flex gap-1 items-center mb-6  uppercase"
          >
            <ChevronLeft className="size-4" /> Назад
          </div>
          <ul className="flex flex-col gap-5">
            {page?.pages?.map((subPage: { name: string; href: string }) => (
              <li
                key={subPage.name}
                className="text-sm font-semibold text-white"
              >
                <Link onClick={() => closeDrawer(false)} href={subPage.href}>
                  {subPage.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
export default PageSuplink;
