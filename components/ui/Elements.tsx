"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ src, alt, name, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-violet-100 text-violet-700 font-medium flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-stone-100 text-stone-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    error: "bg-red-50 text-red-700",
    outline: "border border-stone-200 text-stone-600 bg-transparent",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TabProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabProps) {
  return (
    <div className={cn("flex gap-1 p-1 bg-stone-100 rounded-xl", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id ? "bg-violet-100 text-violet-600" : "bg-stone-200 text-stone-600"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-stone-200", className)}>
      <table className="w-full">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-100">{children}</tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "hover:bg-stone-50 transition-colors cursor-pointer",
        onClick && "cursor-pointer"
      )}
    >
      {children}
    </tr>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <Skeleton className="h-48 w-full rounded-xl mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  centered,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-violet-50 text-violet-600 text-sm font-medium rounded-full mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-lg text-stone-500 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
