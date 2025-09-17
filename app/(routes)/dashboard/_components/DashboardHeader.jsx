"use client";
import React, { useState, useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { Sun, Moon, Menu } from "lucide-react"; 
import { Button } from "@/components/ui/button";

function DashboardHeader({ onMenuClick }) {
  const { signOut } = useClerk();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <header className="p-4 shadow-sm border-b flex justify-between items-center bg-white dark:bg-gray-800 z-40 sticky top-0">
      {/* Left side: Menu button (only on mobile) */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-gray-700" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>

        <Button onClick={() => signOut({ redirectUrl: "/" })}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
