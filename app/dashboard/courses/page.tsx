"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Grid, List } from "lucide-react";
import { CourseCard } from "@/components/ui/CourseCard";
import { Tabs, Badge } from "@/components/ui/Elements";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructor_image?: string;
  thumbnail: string;
  duration: string;
  enrolled: number;
  rating: number;
  category: string;
  price: number;
  featured: boolean;
}

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  const categories = ["All", ...Array.from(new Set(courses.map((c: any) => c.category)))];
  const tabs = categories.map((cat: string) => ({ id: cat, label: cat }));

  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-white">My Courses</h1>
          <p className="text-stone-500 dark:text-stone-400">Continue learning where you left off</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-700 border-0 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-colors ${viewMode === "grid" ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600" : "bg-stone-100 dark:bg-stone-700 text-stone-500"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-colors ${viewMode === "list" ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600" : "bg-stone-100 dark:bg-stone-700 text-stone-500"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Tabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
      </AnimatedSection>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-stone-100 dark:bg-stone-800 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-stone-500">No courses found</p>
        </Card>
      ) : (
        <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {filteredCourses.map((course: any, index: number) => (
            <AnimatedSection key={course.id} delay={index * 0.1}>
              <CourseCard course={course} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
