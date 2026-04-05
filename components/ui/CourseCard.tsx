"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Clock, Users, Star, CheckCircle2, FileText, Headphones, BookOpen } from "lucide-react";
import { ProgressBar } from "./Card";

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
  onClick?: () => void;
  variant?: "default" | "compact";
}

const typeIcons = {
  video: Play,
  audio: Headphones,
  pdf: FileText,
  text: BookOpen,
};

export function CourseCard({ course, progress, onClick, variant = "default" }: CourseCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        onClick={onClick}
        className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-stone-900 truncate">{course.title}</h4>
          <p className="text-sm text-stone-500 truncate">{course.instructor}</p>
        </div>
        {progress !== undefined && (
          <div className="w-12 text-right">
            <span className="text-sm font-medium text-violet-600">{progress}%</span>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted cursor-pointer transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-violet-600 rounded-full">
            {course.level || course.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs text-white/80">{course.category}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-stone-900 line-clamp-2 group-hover:text-violet-600 transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 mt-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative bg-stone-200">
            <Image
              src={course.instructorImage || course.instructor_image || "/placeholder-avatar.jpg"}
              alt={course.instructor}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-stone-600">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-stone-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolled.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        {progress !== undefined && (
          <div className="mt-4">
            <ProgressBar value={progress} size="sm" />
          </div>
        )}
      </div>
    </motion.div>
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
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left",
        isActive
          ? "bg-violet-50 text-violet-700"
          : "hover:bg-stone-50 text-stone-700"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          isActive ? "bg-violet-100" : "bg-stone-100"
        )}
      >
        {lesson.completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <Icon className={cn("w-4 h-4", isActive ? "text-violet-600" : "text-stone-500")} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", lesson.completed && "line-through opacity-60")}>
          {lesson.title}
        </p>
        <p className="text-xs text-stone-400 mt-0.5">{lesson.duration} min</p>
      </div>
      <div className="text-xs text-stone-400 uppercase">{lesson.type}</div>
    </motion.button>
  );
}
