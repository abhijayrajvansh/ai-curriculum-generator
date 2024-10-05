"use client";

import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoNewspaperSharp } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { SlOptionsVertical } from "react-icons/sl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const NAVIGATION_DATA = [
  {
    title: "All curriculums",
    icon: IoNewspaperSharp,
    link: "dashboard",
  },
  {
    title: "Add new",
    icon: BiPlusCircle,
    link: "dashboard/new",
  },
];

export default function Sidebar({
  username,
  email,
}: {
  username: string | null;
  email: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="h-screen fixed top-0 hidden sm:block sm:w-[60px] lg:w-[250px] print:hidden">
      <nav className="h-full flex flex-col justify-between bg-[#262626] text-white/80 border-r-2 border-gray-600 shadow-sm">
        <div>
          <div className="p-4 pb-2 flex gap-5 items-end border-b border-gray-700">
            <div className="font-semibold text-xl hidden lg:block">
              Dashboard
            </div>
          </div>

          {NAVIGATION_DATA.map((item) => {
            const currentPathname = "/" + item.link;

            const isActive = pathname === currentPathname;

            return (
              <Link
                key={item.title}
                href={`/${item.link}`}
                className={`flex items-center text-color-text font-medium cursor-pointer sm:text-sm hover:text-primary-700 px-2`}
              >
                <nav
                  className={`sm:flex w-full items-center space-x-3 px-2 py-2 mt-3 rounded sm:hover:shadow-sm transition hover:bg-gray-600 ${
                    isActive && "bg-gray-700"
                  }`}
                >
                  <item.icon size={25} />
                  <div className="hidden lg:block">{item.title}</div>
                </nav>
              </Link>
            );
          })}
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-evenly gap-3 border-t w-[58px] lg:w-[250px] border-gray-700 hover:bg-[#3f3e3e] p-2">
                <FaRegUser size={25} />
                <div className="lg:flex flex-col items-start hidden">
                  <div className="font-semibold">{username}</div>
                  <div className="text-xs text-white/50">{email}</div>
                </div>
                <div>
                  <SlOptionsVertical />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-2 bg-red-500 rounded-md">
                <LogoutLink className="font-semibold text-white">
                  Log Out!
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </aside>
  );
}
