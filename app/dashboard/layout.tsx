"use client";

import { useState } from "react";
import DashboardSidebar, { MobileBottomNav } from "@/components/layout/DashboardSidebar";
import { Bell, Search, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/Elements";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-100">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-stone-600" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search courses, lessons..."
                  className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-stone-100 transition-colors">
                <Bell className="w-5 h-5 text-stone-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-violet-600 rounded-full" />
              </button>
              <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
