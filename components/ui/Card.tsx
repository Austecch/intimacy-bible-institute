"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ComponentType } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-soft",
        hover && "cursor-pointer hover:shadow-lifted transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatCard({ icon: Icon, label, value, trend, className }: StatCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div className="p-2 bg-violet-50 rounded-xl">
          <Icon className="w-5 h-5 text-violet-600" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-sm font-medium",
              trend.positive ? "text-emerald-600" : "text-red-500"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-stone-900">{value}</p>
        <p className="text-sm text-stone-500 mt-1">{label}</p>
      </div>
    </Card>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel,
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-sm text-stone-600">Progress</span>
          <span className="text-sm font-medium text-stone-900">{percentage}%</span>
        </div>
      )}
      <div className={cn("w-full bg-stone-100 rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-600"
          )}
        />
      </div>
    </div>
  );
}
