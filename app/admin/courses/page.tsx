"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Clock,
  Star,
  Play
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Table, TableRow, Badge, Tabs } from "@/components/ui/Elements";
import { courses } from "@/lib/data";

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

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === "all" || 
      course.category.toLowerCase().includes(activeTab);
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: "all", label: "All Courses", count: courses.length },
    { id: "spiritual", label: "Spiritual", count: courses.filter(c => c.category === "Spiritual Formation").length },
    { id: "ministry", label: "Ministry", count: courses.filter(c => c.category === "Ministry Training").length },
    { id: "leadership", label: "Leadership", count: courses.filter(c => c.category === "Leadership").length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Courses</h1>
            <p className="text-stone-400">Manage your course catalog</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={0.1}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Course List */}
      <AnimatedSection delay={0.15}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} hover className="!p-0 overflow-hidden">
              <div className="relative h-40">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-sm">{course.level}</Badge>
                </div>
                {course.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-400 text-amber-900">Featured</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-stone-400 mb-1">{course.category}</p>
                <h3 className="font-semibold text-stone-900 mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-stone-500 mb-4">{course.instructor}</p>
                
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrolled.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-stone-100 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
