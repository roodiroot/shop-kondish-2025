"use client";

import { useState } from "react";

import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FaTelegramPlane, FaWhatsapp, FaPhone } from "react-icons/fa";

export default function FloatingContacts() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Блок с кнопками мессенджеров */}
      <div
        className={`
          flex flex-col gap-3 mb-3
          transition-all duration-150 ease-out
          ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <a
          href="https://wa.me/79153294209"
          target="_blank"
          className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <FaWhatsapp size={20} />
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
          className="p-3 rounded-full bg-gray-900 text-white shadow-lg hover:scale-110 transition-transform"
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
