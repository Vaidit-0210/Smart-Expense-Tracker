"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "./../../../utils/dbConfig";
import { Budgets } from "utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import ChatBot from "../../_components/ChatBot";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    if (isMobileMenuOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
    return () => root.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result?.length == 0) router.replace("/dashboard/budgets");
  };

  return (
    <div>
      {/* Sidebar (Desktop) */}
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Drawer on LEFT */}
          <div className="relative h-full w-72 bg-white shadow-lg">
            <SideNav
              onLinkClick={() => setIsMobileMenuOpen(false)}
              showClose={true}
            />
          </div>

          {/* Overlay */}
          <button
            aria-label="Close menu"
            className="flex-1 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        {children}
        <ChatBot />
      </div>
    </div>
  );
}

export default DashboardLayout;
