"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Ban,
  CheckCircle,
  UserX,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Table, TableRow, Badge, Avatar, Tabs } from "@/components/ui/Elements";
import { students, courses } from "@/lib/data";
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

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && student.completedCourses.length > 0) ||
      (activeTab === "new" && new Date(student.joinDate) > new Date("2024-02-01"));
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: "all", label: "All Students", count: students.length },
    { id: "active", label: "Active", count: students.filter(s => s.completedCourses.length > 0).length },
    { id: "new", label: "New", count: students.filter(s => new Date(s.joinDate) > new Date("2024-02-01")).length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Students</h1>
            <p className="text-stone-400">Manage and view all enrolled students</p>
          </div>
          <button className="px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
            Add Student
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
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Student List */}
      <AnimatedSection delay={0.15}>
        <Card className="!p-0 overflow-hidden">
          <Table headers={["Student", "Email", "Courses", "Status", "Joined", "Actions"]}>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={student.avatar} name={student.name} size="md" />
                    <div>
                      <p className="font-medium text-stone-900">{student.name}</p>
                      <p className="text-sm text-stone-500">ID: {student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{student.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-900">{student.enrolledCourses.length}</span>
                    <span className="text-stone-400">enrolled</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={student.completedCourses.length > 0 ? "success" : "warning"}>
                    {student.completedCourses.length > 0 ? "Active" : "New"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{formatDate(student.joinDate)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition-colors">
                      <Ban className="w-4 h-4" />
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
