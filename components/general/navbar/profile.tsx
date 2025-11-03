"use client";

import Link from "next/link";

import { useAuth } from "@/context/authcontext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { use } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const ProfileForNavbar = () => {
  const authContext = useAuth();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const { logout, auth } = authContext ?? {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flow-roo cursor-pointer">
          <div className="group -m-2 flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="size-6 text-gray-400 group-hover:text-gray-500" />
            {isDesktop ? (
              <span className="ml-2 text-sm font-semibold text-gray-700 group-hover:text-gray-800">
                {auth?.user?.username}
              </span>
            ) : null}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {!isDesktop ? (
          <DropdownMenuLabel>{auth?.user?.username}</DropdownMenuLabel>
        ) : null}
        <DropdownMenuItem asChild>
          <Link
            href="/protected/profile"
            className="block text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (logout) {
              logout();
            }
            window.location.reload();
          }}
        >
          <div className="block text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
            Выйти
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileForNavbar;
