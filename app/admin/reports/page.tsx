"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Download,
  FileText,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  PieChart,
  TrendingUp
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Elements";
import { enrollmentData, revenueData, studentStats } from "@/lib/data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from "recharts";

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

const courseDistribution = [
  { name: "Spiritual Formation", value: 35, color: "#7C3AED" },
  { name: "Ministry Training", value: 25, color: "#8B5CF6" },
  { name: "Leadership", value: 20, color: "#A78BFA" },
  { name: "Worship", value: 20, color: "#C4B5FD" },
];

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Reports & Analytics</h1>
            <p className="text-stone-400">Comprehensive insights into your institute's performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-sm focus:outline-none">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
              <option>All time</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <StatCard
            icon={BarChart3}
            label="Total Enrollments"
            value="2,021"
            trend={{ value: 15.8, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <StatCard
            icon={TrendingUp}
            label="Avg Completion Rate"
            value="87%"
            trend={{ value: 3.2, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <StatCard
            icon={FileText}
            label="Course Engagement"
            value="4.5"
            trend={{ value: 12, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <StatCard
            icon={PieChart}
            label="Revenue Growth"
            value="18.2%"
            trend={{ value: 18.2, positive: true }}
          />
        </AnimatedSection>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.3}>
          <Card>
            <h3 className="text-lg font-semibold text-stone-900 mb-6">Revenue Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="month" stroke="#A8A29E" fontSize={12} />
                  <YAxis stroke="#A8A29E" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <Card>
            <h3 className="text-lg font-semibold text-stone-900 mb-6">Enrollment by Month</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="month" stroke="#A8A29E" fontSize={12} />
                  <YAxis stroke="#A8A29E" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      {/* Course Distribution */}
      <AnimatedSection delay={0.4}>
        <Card>
          <h3 className="text-lg font-semibold text-stone-900 mb-6">Course Category Distribution</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-3">
              {courseDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-stone-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-stone-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Top Performing */}
      <AnimatedSection delay={0.45}>
        <Card>
          <h3 className="text-lg font-semibold text-stone-900 mb-6">Top Performing Courses</h3>
          <div className="space-y-4">
            {[
              { title: "Foundations of Intimacy with God", enrollments: 1247, completion: 92, rating: 4.9 },
              { title: "Worship as Lifestyle", enrollments: 1089, completion: 88, rating: 4.9 },
              { title: "The Prophetic Anointing", enrollments: 892, completion: 85, rating: 4.8 },
              { title: "Kingdom Economics", enrollments: 654, completion: 90, rating: 4.7 },
            ].map((course, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-stone-50">
                <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 truncate">{course.title}</p>
                  <p className="text-sm text-stone-500">{course.enrollments.toLocaleString()} students</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-stone-900">{course.completion}%</p>
                    <p className="text-stone-400">Completion</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-stone-900">{course.rating}</p>
                    <p className="text-stone-400">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </AnimatedSection>
    </div>
  );
}
