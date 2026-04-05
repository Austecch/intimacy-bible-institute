"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Grid, List } from "lucide-react";
import { CourseCard } from "@/components/ui/CourseCard";
import { Tabs, Badge } from "@/components/ui/Elements";
import { Card } from "@/components/ui/Card";
import { currentUser, courses } from "@/lib/data";

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

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const enrolledCourses = courses.filter(c => 
    currentUser.enrolledCourses.includes(c.id)
  );
  const completedCourses = courses.filter(c => 
    currentUser.completedCourses.includes(c.id)
  );

  const filteredCourses = courses.filter(course => {
    const isEnrolled = currentUser.enrolledCourses.includes(course.id);
    const isCompleted = currentUser.completedCourses.includes(course.id);
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "enrolled" && isEnrolled) ||
      (activeTab === "completed" && isCompleted);
    
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: "all", label: "All Courses", count: courses.length },
    { id: "enrolled", label: "In Progress", count: enrolledCourses.length },
    { id: "completed", label: "Completed", count: completedCourses.length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">My Courses</h1>
            <p className="text-stone-500">Manage and track your learning journey</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={0.1}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Tabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={setActiveTab}
            />
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                />
              </div>
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-stone-200"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-stone-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Course Grid/List */}
      <AnimatedSection delay={0.2}>
        {filteredCourses.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredCourses.map((course) => {
              const isEnrolled = currentUser.enrolledCourses.includes(course.id);
              const isCompleted = currentUser.completedCourses.includes(course.id);
              
              if (viewMode === "list") {
                return (
                  <CourseCard 
                    key={course.id} 
                    course={course}
                    progress={isCompleted ? 100 : isEnrolled ? 35 : undefined}
                    variant="compact"
                    onClick={() => window.location.href = `/dashboard/courses/${course.id}`}
                  />
                );
              }
              
              return (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  progress={isCompleted ? 100 : isEnrolled ? 35 : undefined}
                  onClick={() => window.location.href = `/dashboard/courses/${course.id}`}
                />
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No courses found</h3>
            <p className="text-stone-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Clear filters
            </button>
          </Card>
        )}
      </AnimatedSection>

      {/* Browse More */}
      {activeTab === "all" && (
        <AnimatedSection delay={0.3}>
          <Card className="text-center py-12 bg-gradient-to-r from-violet-50 to-violet-50/50">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Ready for more?</h3>
            <p className="text-stone-500 mb-6">Explore our catalog and discover new courses</p>
            <Link 
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors"
            >
              Browse All Courses
            </Link>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
