"use client";

import { useState } from "react";

import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FaTelegramPlane, FaPhone } from "react-icons/fa";
import { Icon } from "@/components/ui/icon";

export default function FloatingContacts() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Блок с кнопками мессенджеров */}
      <div
        className={`
          flex flex-col gap-3 mb-3
          transition-all duration-150 ease-out
          ${open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <a
          href="https://max.ru/u/f9LHodD0cOKf9sApV7xwO5GunbeY-pF2x_3FIWrzVQ20fPh2vGUgJUXaJ2Q"
          target="_blank"
          className="p-3 rounded-full bg-indigo-500 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <Icon.max width={20} />
        </a>

        <a
          href="https://t.me/mickkey_dee"
          target="_blank"
          className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <FaTelegramPlane size={20} />
        </a>

        <a
          href="tel:+79153294209"
          className="p-3 rounded-full bg-sky-900 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <FaPhone size={20} />
        </a>
      </div>

      {/* Главная кнопка */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-red-500 text-white shadow-xl hover:scale-110 transition-transform"
      >
        {open ? (
          <XMarkIcon className="size-5" />
        ) : (
          <ChatBubbleBottomCenterTextIcon className="size-5" />
        )}
      </button>
    </div>
  );
}
