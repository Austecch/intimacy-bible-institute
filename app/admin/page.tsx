"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  GraduationCap,
  Clock
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Badge, Avatar } from "@/components/ui/Elements";
import { studentStats, revenueData, enrollmentData, students, courses } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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

const recentActivity = [
  { type: "enrollment", user: "Emily Watson", action: "enrolled in", item: "Foundations of Intimacy", time: "5 min ago" },
  { type: "completion", user: "Michael Okonkwo", action: "completed", item: "Kingdom Economics", time: "1 hour ago" },
  { type: "enrollment", user: "David Kim", action: "enrolled in", item: "The Prophetic Anointing", time: "2 hours ago" },
  { type: "payment", user: "Sarah Mitchell", action: "upgraded to", item: "Diploma Program", time: "3 hours ago" },
  { type: "certificate", user: "Grace Nakamura", action: "earned certificate in", item: "Worship as Lifestyle", time: "5 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
            <p className="text-stone-400">Welcome back! Here's what's happening with IBI.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <StatCard
            icon={Users}
            label="Total Students"
            value={studentStats.totalStudents.toLocaleString()}
            trend={{ value: 12, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <StatCard
            icon={GraduationCap}
            label="Active Students"
            value={studentStats.activeStudents.toLocaleString()}
            trend={{ value: 8, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <StatCard
            icon={BookOpen}
            label="Total Courses"
            value={courses.length}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <StatCard
            icon={DollarSign}
            label="Revenue (MTD)"
            value="$22,100"
            trend={{ value: 18, positive: true }}
          />
        </AnimatedSection>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.3}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Revenue Overview</h3>
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +18.2%
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="month" stroke="#A8A29E" fontSize={12} />
                  <YAxis stroke="#A8A29E" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Enrollment Trends</h3>
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15.8%
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="month" stroke="#A8A29E" fontSize={12} />
                  <YAxis stroke="#A8A29E" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)' 
                    }}
                  />
                  <Bar dataKey="enrollments" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.4}>
          <Card className="text-center">
            <p className="text-4xl font-bold text-emerald-600">87%</p>
            <p className="text-sm text-stone-500">Completion Rate</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.45}>
          <Card className="text-center">
            <p className="text-4xl font-bold text-violet-600">4.8</p>
            <p className="text-sm text-stone-500">Avg Course Rating</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <Card className="text-center">
            <p className="text-4xl font-bold text-amber-600">156</p>
            <p className="text-sm text-stone-500">New This Month</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.55}>
          <Card className="text-center">
            <p className="text-4xl font-bold text-stone-900">45GB</p>
            <p className="text-sm text-stone-500">Storage Used</p>
          </Card>
        </AnimatedSection>
      </div>

      {/* Recent Activity & Top Courses */}
      <div className="grid lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.6}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Recent Activity</h3>
              <Link href="/admin/students" className="text-sm text-violet-600 hover:text-violet-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-600">
                      <span className="font-medium text-stone-900">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium text-stone-900">{activity.item}</span>
                    </p>
                    <p className="text-xs text-stone-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.65}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-900">Top Courses</h3>
              <Link href="/admin/courses" className="text-sm text-violet-600 hover:text-violet-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-900 truncate">{course.title}</p>
                    <p className="text-sm text-stone-500">{course.enrolled.toLocaleString()} students</p>
                  </div>
                  <Badge variant={course.level === "Beginner" ? "success" : course.level === "Intermediate" ? "warning" : "error"}>
                    {course.level}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
