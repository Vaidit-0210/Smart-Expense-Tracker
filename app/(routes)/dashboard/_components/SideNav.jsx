// app/(routes)/dashboard/_components/SideNav.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  TvMinimal,
  IndianRupee,
  ReceiptText,
  ShieldCheck,
  User as UserIcon,
  X,
} from "lucide-react";

function SideNav({ onLinkClick, showClose = false }) {
  const menuList = [
    { id: 1, name: "Dashboard", icon: TvMinimal, path: "/dashboard" },
    { id: 2, name: "Income", icon: IndianRupee, path: "/dashboard/income" },
    { id: 3, name: "Budgets", icon: Landmark, path: "/dashboard/budgets" },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses/latest",
    },
    { id: 5, name: "Plans", icon: ShieldCheck, path: "/dashboard/plans" },
    { id: 6, name: "Profile", icon: UserIcon, path: "/dashboard/profile" },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm bg-gray-100 flex flex-col dark:bg-gray-800">
      {/* Logo + Close (close shown only when showClose=true) */}
      <div className="flex items-center justify-between">
        <Image src={"/logo3.png"} alt="Logo" width={200} height={100} className="block dark:hidden"/>
          <Image src={"/logo4.png"} alt="Logo" width={200} height={100} className="hidden dark:block"/>

        {/* Close button next to logo (mobile only) */}
        {showClose && (
          <button
            onClick={() => onLinkClick && onLinkClick()}
            className="md:hidden p-2 rounded-md hover:bg-gray-200"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-12 flex-1">
        {menuList.map((menu) => {
          const Active = path === menu.path;
          const itemClasses = `flex gap-3 items-center text-gray-600 dark:text-white font-medium mb-2 p-4 cursor-pointer rounded-md transition 
            hover:text-blue hover:bg-gray-400 dark:hover:text-black ${Active ? "bg-indigo-100 dark:bg-gray-400 text-gray-50 dark:text-black" : ""}`;

          const Icon = menu.icon;

          return (
            <Link
              href={menu.path}
              key={menu.id}
              className={itemClasses}
              onClick={() => onLinkClick && onLinkClick()}
            >
              <Icon className="h-5 w-5" />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SideNav;
