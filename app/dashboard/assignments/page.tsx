"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock,
  Upload,
  Eye,
  Download
} from "lucide-react";
import { Card, ProgressBar } from "@/components/ui/Card";
import { Tabs, Badge } from "@/components/ui/Elements";
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

const assignments = [
  {
    id: 1,
    title: "Reflection Journal - Week 4",
    course: "Foundations of Intimacy with God",
    description: "Write a 500-word reflection on your prayer journey this week.",
    dueDate: "2024-04-10",
    status: "pending",
    grade: null,
  },
  {
    id: 2,
    title: "Scripture Memory Test",
    course: "Foundations of Intimacy with God",
    description: "Recite Romans 8:28-30 from memory.",
    dueDate: "2024-04-08",
    status: "submitted",
    grade: 92,
    feedback: "Excellent work! Your understanding is evident.",
  },
  {
    id: 3,
    title: "Community Service Report",
    course: "The Prophetic Anointing",
    description: "Document your outreach experience and lessons learned.",
    dueDate: "2024-04-15",
    status: "pending",
    grade: null,
  },
  {
    id: 4,
    title: "Mid-Term Essay",
    course: "Kingdom Economics",
    description: "Essay on biblical principles of financial stewardship.",
    dueDate: "2024-03-28",
    status: "graded",
    grade: 88,
    feedback: "Good analysis. Consider more practical application examples.",
  },
];

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

  const filteredAssignments = assignments.filter(a => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return a.status === "pending";
    if (activeTab === "submitted") return a.status === "submitted";
    if (activeTab === "graded") return a.grade !== null;
    return true;
  });

  const getStatusBadge = (status: string, grade: number | null) => {
    if (grade !== null) {
      return <Badge variant="success">{grade}%</Badge>;
    }
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "submitted":
        return <Badge variant="default">Submitted</Badge>;
      default:
        return <Badge>Draft</Badge>;
    }
  };

  const isOverdue = (date: string) => {
    return new Date(date) < new Date() && assignments.find(a => a.dueDate === date)?.status === "pending";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Assignments</h1>
          <p className="text-stone-500">Complete and track your coursework</p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-stone-900">{assignments.length}</p>
            <p className="text-sm text-stone-500">Total</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-amber-600">
              {assignments.filter(a => a.status === "pending").length}
            </p>
            <p className="text-sm text-stone-500">Pending</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-violet-600">
              {assignments.filter(a => a.status === "submitted").length}
            </p>
            <p className="text-sm text-stone-500">Submitted</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-emerald-600">90%</p>
            <p className="text-sm text-stone-500">Avg Score</p>
          </Card>
        </AnimatedSection>
      </div>

      {/* Tabs */}
      <AnimatedSection delay={0.3}>
        <Tabs
          tabs={[
            { id: "all", label: "All", count: assignments.length },
            { id: "pending", label: "Pending", count: assignments.filter(a => a.status === "pending").length },
            { id: "submitted", label: "Submitted", count: assignments.filter(a => a.status === "submitted").length },
            { id: "graded", label: "Graded", count: assignments.filter(a => a.grade !== null).length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </AnimatedSection>

      {/* Assignment List */}
      <AnimatedSection delay={0.35}>
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              hover
              onClick={() => setSelectedAssignment(assignment.id)}
              className="cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  assignment.grade !== null ? "bg-emerald-100 text-emerald-600" :
                  assignment.status === "pending" ? "bg-amber-100 text-amber-600" :
                  "bg-violet-100 text-violet-600"
                }`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-900">{assignment.title}</h3>
                      <p className="text-sm text-stone-500">{assignment.course}</p>
                    </div>
                    {getStatusBadge(assignment.status, assignment.grade)}
                  </div>
                  <p className="text-sm text-stone-600 mb-3">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${isOverdue(assignment.dueDate) ? "text-red-500" : "text-stone-500"}`}>
                      <Calendar className="w-4 h-4" />
                      Due {formatDate(assignment.dueDate)}
                      {isOverdue(assignment.dueDate) && " (Overdue)"}
                    </span>
                  </div>
                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl">
                      <p className="text-sm text-stone-600">
                        <span className="font-medium">Feedback: </span>
                        {assignment.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {assignment.status === "pending" && (
                <div className="mt-4 flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    Submit Assignment
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-stone-600 text-sm font-medium rounded-xl hover:bg-stone-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {filteredAssignments.length === 0 && (
        <AnimatedSection delay={0.4}>
          <Card className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No assignments found</h3>
            <p className="text-stone-500">You're all caught up!</p>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
