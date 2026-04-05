"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, CheckCircle2, Play, FileText, Headphones, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description?: string;
  instructor: string;
  instructor_image?: string;
  instructorImage?: string;
  thumbnail: string;
  duration: string;
  enrolled: number;
  rating: number;
  category?: string;
  price?: number;
  featured?: boolean;
  level?: string;
}

interface CourseCardProps {
  course: Course;
  progress?: number;
}

const typeIcons = {
  video: Play,
  audio: Headphones,
  pdf: FileText,
  text: BookOpen,
};

export function CourseCard({ course, progress }: CourseCardProps) {
  return (
    <Link href={`/dashboard/courses/${course.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-stone-100 hover:border-stone-200 transition-colors">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-stone-900 line-clamp-2 text-sm leading-snug">
            {course.title}
          </h3>

          <p className="text-xs text-stone-500 mt-1">{course.instructor}</p>

          <div className="flex items-center gap-3 mt-3 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.enrolled.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {course.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    type: "video" | "audio" | "pdf" | "text";
    duration: number;
    completed?: boolean;
  };
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function LessonItem({ lesson, index, isActive, onClick }: LessonItemProps) {
  const Icon = typeIcons[lesson.type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
        isActive
          ? "bg-stone-100 text-stone-900"
          : "hover:bg-stone-50 text-stone-700"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          isActive ? "bg-stone-200" : "bg-stone-100"
        )}
      >
        {lesson.completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <Icon className={cn("w-4 h-4", isActive ? "text-stone-600" : "text-stone-500")} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate text-sm", lesson.completed && "line-through opacity-60")}>
          {lesson.title}
        </p>
        <p className="text-xs text-stone-400 mt-0.5">{lesson.duration} min</p>
      </div>
      <div className="text-xs text-stone-400 uppercase">{lesson.type}</div>
    </button>
  );
}
