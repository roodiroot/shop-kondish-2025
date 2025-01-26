"use client";

import { useAuth } from "@/context/authcontext";
import ProfileForNavbar from "./profile";
import useModal from "@/hooks/use-modal";

const AuthComponentNavbar = () => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};
  const { onOpen } = useModal();

  if (auth && auth?.token) {
    return <ProfileForNavbar />;
  }

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <a
        onClick={(e) => {
          e.preventDefault();
          onOpen("REGISTER");
        }}
        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800 p-0"
      >
        Войти
      </a>
    </div>
  );
};

export default AuthComponentNavbar;
