"use client";

import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoNewspaperSharp } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";
import Image from "next/image";

const NAVIGATION_DATA = [
  {
    title: "All curriculums",
    icon: IoNewspaperSharp,
    link: "dashboard",
  },
  {
    title: "Create new curriculum",
    icon: BiPlusCircle,
    link: "dashboard/new",
  },
];

export default function Sidebar() {
  
  const pathname = usePathname();
  
  return (
    <aside className="h-screen fixed top-0 hidden sm:block sm:w-[60px] lg:w-[250px]">
      <nav className="h-full flex flex-col justify-between bg-[#262626] text-white/80 border-r-2 border-gray-600 shadow-sm">
        <div>
          <div className="p-4 pb-2 flex gap-5 items-end border-b border-gray-700">
            <Image height={30} width={30} className="p-1 bg-white rounded" src="/logo.jpeg" alt="uptut-logo" />
            <div className="font-semibold text-xl hidden lg:block">Dashboard</div>
          </div>

         
          {NAVIGATION_DATA.map((item) => {
            let currentPathname = "/" + item.link

            const isActive = pathname === currentPathname;

            return (
              <Link
                key={item.title}
                href={`/${item.link}`}
                className={`flex items-center text-color-text font-medium cursor-pointer sm:text-sm hover:text-primary-700 px-2`}
              >
                <nav
                  className={`sm:flex w-full items-center space-x-3 px-2 py-2 mt-3 rounded sm:hover:shadow-sm transition hover:bg-gray-600 ${
                    isActive &&
                    "bg-gray-700"
                  }`}
                >
                  <item.icon size={25} />
                  <div className="hidden lg:block">{item.title}</div>
                </nav>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-700 flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Abhijay Rajvansh</h4>
              <span className="text-xs text-white/50">r.abhijay@uptut.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}