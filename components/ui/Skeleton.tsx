"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("skeleton", className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-soft">
      <Skeleton className="h-48 w-full" />
      <div className="p-5">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
      <div className="divide-y divide-stone-200 dark:divide-stone-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function VideoPlayerSkeleton() {
  return (
    <div className="bg-stone-900 rounded-2xl overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-2/3 mb-3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 shadow-soft space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}
