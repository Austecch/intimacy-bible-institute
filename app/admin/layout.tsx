"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/Elements";
import { adminUser } from "@/lib/data";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-stone-900/80 backdrop-blur-xl border-b border-stone-800">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search students, courses..."
                  className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-sm text-stone-300 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-stone-800 transition-colors">
                <Bell className="w-5 h-5 text-stone-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-800 transition-colors"
                >
                  <Avatar src={adminUser.avatar} name={adminUser.name} size="sm" />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{adminUser.name}</p>
                    <p className="text-xs text-stone-400">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-stone-800 rounded-xl shadow-lifted border border-stone-700 py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-white">
                      Profile Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-700 hover:text-white">
                      Help & Support
                    </a>
                    <div className="border-t border-stone-700 my-2" />
                    <a href="/" className="block px-4 py-2 text-sm text-red-400 hover:bg-stone-700">
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
