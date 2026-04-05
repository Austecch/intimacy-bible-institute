"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Clock,
  FileQuestion,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
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

const quizzes = [
  { id: 1, title: "Foundations Quiz - Module 1", course: courses[0], questions: 15, attempts: 245, avgScore: 78, status: "active" },
  { id: 2, title: "Prophetic Foundations Assessment", course: courses[1], questions: 20, attempts: 189, avgScore: 72, status: "active" },
  { id: 3, title: "Kingdom Economics Mid-Term", course: courses[2], questions: 25, attempts: 156, avgScore: 82, status: "active" },
  { id: 4, title: "Worship Principles Quiz", course: courses[3], questions: 12, attempts: 0, avgScore: 0, status: "draft" },
  { id: 5, title: "Healing Ministry Assessment", course: courses[4], questions: 30, attempts: 0, avgScore: 0, status: "draft" },
];

export default function AdminQuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || quiz.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</Badge>;
      case "draft":
        return <Badge variant="warning" className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Draft</Badge>;
      case "archived":
        return <Badge className="flex items-center gap-1">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Quizzes & Assessments</h1>
            <p className="text-stone-400">Create and manage quizzes for your courses</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
            <Plus className="w-5 h-5" />
            Create Quiz
          </button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <StatCard
            icon={FileQuestion}
            label="Total Quizzes"
            value={quizzes.length}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <StatCard
            icon={CheckCircle}
            label="Active"
            value={quizzes.filter(q => q.status === "active").length}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <StatCard
            icon={FileQuestion}
            label="Total Questions"
            value={quizzes.reduce((acc, q) => acc + q.questions, 0)}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <StatCard
            icon={Clock}
            label="Avg Score"
            value="77%"
          />
        </AnimatedSection>
      </div>

      {/* Filters */}
      <AnimatedSection delay={0.3}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2">
              {["all", "active", "draft"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    statusFilter === status
                      ? "bg-violet-600 text-white"
                      : "bg-stone-700 text-stone-400 hover:bg-stone-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Quiz List */}
      <AnimatedSection delay={0.35}>
        <Card className="!p-0 overflow-hidden">
          <Table headers={["Quiz", "Course", "Questions", "Attempts", "Avg Score", "Status", "Actions"]}>
            {filteredQuizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-stone-900">{quiz.title}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-stone-600">{quiz.course.title}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-stone-900">{quiz.questions}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-stone-900">{quiz.attempts}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-medium ${quiz.avgScore >= 70 ? "text-emerald-600" : "text-amber-600"}`}>
                    {quiz.avgScore > 0 ? `${quiz.avgScore}%` : "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(quiz.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </TableRow>
            ))}
          </Table>
        </Card>
      </AnimatedSection>
    </div>
  );
}
