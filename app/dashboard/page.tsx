"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Calendar,
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { Card, StatCard, ProgressBar } from "@/components/ui/Card";
import { CourseCard } from "@/components/ui/CourseCard";
import { Badge } from "@/components/ui/Elements";
import { currentUser, courses } from "@/lib/data";
import { formatDate } from "@/lib/utils";

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

export default function DashboardPage() {
  const enrolledCourses = courses.filter(c => 
    currentUser.enrolledCourses.includes(c.id)
  );
  const continueLearning = enrolledCourses[0];
  const progress = 68;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <AnimatedSection>
        <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                Welcome back, {currentUser.name.split(" ")[0]}!
              </h1>
              <p className="text-violet-200">
                Continue your journey of spiritual growth. You're doing amazing!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{progress}%</div>
                <p className="text-sm text-violet-200">Overall Progress</p>
              </div>
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <Trophy className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <StatCard
            icon={BookOpen}
            label="Enrolled Courses"
            value={currentUser.enrolledCourses.length}
            trend={{ value: 12, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={currentUser.completedCourses.length}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <StatCard
            icon={Clock}
            label="Learning Hours"
            value="48"
            trend={{ value: 8, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <StatCard
            icon={Trophy}
            label="Certificates"
            value="2"
          />
        </AnimatedSection>
      </div>

      {/* Continue Learning */}
      {continueLearning && (
        <AnimatedSection delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-stone-900">Continue Learning</h2>
            <Link href="/dashboard/courses" className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-72 h-48 md:h-auto flex-shrink-0">
                <Image
                  src={continueLearning.thumbnail}
                  alt={continueLearning.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <Play className="w-6 h-6 text-stone-900 ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6">
                <Badge className="mb-3">{continueLearning.level}</Badge>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {continueLearning.title}
                </h3>
                <p className="text-sm text-stone-500 mb-4">
                  {continueLearning.instructor}
                </p>
                <div className="mb-4">
                  <ProgressBar value={progress} showLabel />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {continueLearning.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {continueLearning.modules.length} modules
                    </span>
                  </div>
                  <Link href={`/dashboard/courses/${continueLearning.id}`}>
                    <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      )}

      {/* My Courses */}
      <AnimatedSection delay={0.4}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-stone-900">My Courses</h2>
          <Link href="/dashboard/courses" className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              progress={course.id === continueLearning?.id ? progress : 35}
            />
          ))}
        </div>
      </AnimatedSection>

      {/* Upcoming & Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.5}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Upcoming Deadlines</h3>
              <Calendar className="w-5 h-5 text-stone-400" />
            </div>
            <div className="space-y-4">
              {[
                { title: "Foundations Quiz - Module 2", due: "Tomorrow", type: "quiz" },
                { title: "Reflection Journal - Week 4", due: "In 3 days", type: "assignment" },
                { title: "Final Assessment", due: "Next week", type: "exam" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === "quiz" ? "bg-violet-100 text-violet-600" :
                    item.type === "assignment" ? "bg-amber-100 text-amber-600" :
                    "bg-emerald-100 text-emerald-600"
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-900 truncate">{item.title}</p>
                    <p className="text-sm text-stone-500">{item.due}</p>
                  </div>
                  <Badge variant={item.type === "quiz" ? "default" : item.type === "assignment" ? "warning" : "success"}>
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.55}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Recent Activity</h3>
              <TrendingUp className="w-5 h-5 text-stone-400" />
            </div>
            <div className="space-y-4">
              {[
                { action: "Completed lesson", item: "The Heart of the Father", time: "2 hours ago" },
                { action: "Started course", item: "The Prophetic Anointing", time: "Yesterday" },
                { action: "Earned certificate", item: "Foundations Certificate", time: "3 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                  <div className="flex-1">
                    <p className="text-sm text-stone-600">
                      <span className="font-medium text-stone-900">{activity.action}</span>{" "}
                      {activity.item}
                    </p>
                    <p className="text-xs text-stone-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
