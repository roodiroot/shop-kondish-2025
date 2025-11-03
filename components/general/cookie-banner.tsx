"use client";

import { useEffect, useState } from "react";

const CookieBanner = () => {
  const COOKIE_NAME = "policyAccepted";
  const COOKIE_VALUE = "true";
  const COOKIE_DAYS = 365;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split("; ").map((c) => c.trim());
      const accepted = cookies.some((c) => c.startsWith(`${COOKIE_NAME}=`));
      setIsVisible(!accepted);
    }
  }, []);

  const acceptPolicy = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_DAYS);
    document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; expires=${expires.toUTCString()}; path=/`;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full  fixed bottom-4 left-4 z-20 bg-white rounded-[20px] shadow-2xl flex flex-col gap-3 p-3 max-w-[193px] sm:max-w-[482px] sm:flex-row md:flex-col md:max-w-[193px]">
      <p className="text-xs">
        Мы обрабатываем данные посетителей и используем куки согласно{" "}
        <a href="/policy" target="_blank" className="text-primary underline">
          политике
        </a>
      </p>
      <button
        onClick={acceptPolicy}
        className="text-sm py-2 px-4 rounded-md bg-primary font-bold text-white max-w-[81px] sm:ml-10 md:ml-0"
      >
        OK
      </button>
    </div>
  );
};

export default CookieBanner;
