"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FolderOpen, 
  FileQuestion, 
  BarChart3, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Students", href: "/admin/students" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: FolderOpen, label: "Media Library", href: "/admin/media" },
  { icon: FileQuestion, label: "Quizzes", href: "/admin/quizzes" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-stone-900 flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("p-6 border-b border-stone-800", collapsed && "px-4")}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          {!collapsed && (
            <div>
              <span className="font-semibold text-white tracking-tight">Admin</span>
              <span className="block text-xs text-stone-400">Dashboard</span>
            </div>
          )}
        </Link>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-stone-400 hover:bg-stone-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-stone-800 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-stone-400 hover:bg-stone-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-stone-800">
          <div className="px-4 py-3 rounded-xl bg-stone-800">
            <p className="text-xs text-stone-400 mb-1">Storage Used</p>
            <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-violet-400"
              />
            </div>
            <p className="text-xs text-stone-400 mt-1">45 GB of 100 GB</p>
          </div>
        </div>
      )}
    </aside>
  );
}
