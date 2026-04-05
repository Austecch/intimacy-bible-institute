"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  FileText, 
  Award, 
  Download, 
  User, 
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Elements";
import { currentUser } from "@/lib/data";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
  { icon: GraduationCap, label: "Assignments", href: "/dashboard/assignments" },
  { icon: FileText, label: "Quizzes", href: "/dashboard/quizzes" },
  { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
  { icon: Download, label: "Downloads", href: "/dashboard/downloads" },
];

const bottomNavItems = [
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", href: "/dashboard/profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-stone-100 flex flex-col z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <div>
            <span className="font-semibold text-stone-900 tracking-tight">Intimacy Bible</span>
            <span className="block text-xs text-stone-500">Institute</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-violet-600 rounded-r-full"
                />
              )}
              <item.icon className={cn("w-5 h-5", isActive && "text-violet-600")} />
              <span className={cn("font-medium", isActive && "text-violet-600")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-2 space-y-1 border-t border-stone-100">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-stone-100">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-stone-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-stone-500 truncate">{currentUser.email}</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 mt-2 text-stone-500 hover:text-stone-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const mobileNavItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: BookOpen, label: "Courses", href: "/dashboard/courses" },
    { icon: GraduationCap, label: "Tasks", href: "/dashboard/assignments" },
    { icon: Award, label: "Certs", href: "/dashboard/certificates" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-4 py-2 z-50 lg:hidden">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive ? "text-violet-600" : "text-stone-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
