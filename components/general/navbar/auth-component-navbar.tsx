"use client";

import { useAuth } from "@/context/authcontext";
import ProfileForNavbar from "./profile";
import useModal from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/outline";

const AuthComponentNavbar = () => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};
  const { onOpen } = useModal();

  if (auth && auth?.token) {
    return <ProfileForNavbar />;
  }

  return (
    <div className={cn("flow-root")}>
      <div
        onClick={() => onOpen("REGISTER")}
        className="group -m-2 flex items-center p-2 cursor-pointer"
      >
        <UserIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
        <div className="hidden sm:inline-flex ml-1 text-sm font-bold text-gray-700 group-hover:text-gray-800">
          Войти
        </div>
        <span className="sr-only">items in favorites, view bag</span>
      </div>
    </div>
  );
};

export default AuthComponentNavbar;
