"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Search,
  Download,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Filter
} from "lucide-react";
import { Card, StatCard } from "@/components/ui/Card";
import { Table, TableRow, Badge, Avatar } from "@/components/ui/Elements";
import { students } from "@/lib/data";
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

const payments = [
  { id: "PAY-001", student: students[0], amount: 99, plan: "Diploma Program", status: "completed", date: "2024-04-01" },
  { id: "PAY-002", student: students[1], amount: 199, plan: "Degree Program", status: "completed", date: "2024-04-02" },
  { id: "PAY-003", student: students[2], amount: 99, plan: "Diploma Program", status: "pending", date: "2024-04-03" },
  { id: "PAY-004", student: students[3], amount: 49, plan: "Certificate", status: "completed", date: "2024-04-04" },
  { id: "PAY-005", student: students[0], amount: 199, plan: "Degree Program", status: "failed", date: "2024-04-05" },
  { id: "PAY-006", student: students[1], amount: 99, plan: "Diploma Program", status: "completed", date: "2024-03-01" },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments.filter(p => p.status === "completed").reduce((acc, p) => acc + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === "pending").length;
  const failedPayments = payments.filter(p => p.status === "failed").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</Badge>;
      case "pending":
        return <Badge variant="warning" className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</Badge>;
      case "failed":
        return <Badge variant="error" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Failed</Badge>;
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
            <h1 className="text-2xl font-semibold text-white">Payments</h1>
            <p className="text-stone-400">Manage subscriptions and transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            trend={{ value: 18.2, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <StatCard
            icon={CreditCard}
            label="This Month"
            value="$2,890"
            trend={{ value: 12, positive: true }}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <StatCard
            icon={Clock}
            label="Pending"
            value={pendingPayments}
          />
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <StatCard
            icon={XCircle}
            label="Failed"
            value={failedPayments}
          />
        </AnimatedSection>
      </div>

      {/* Filters */}
      <AnimatedSection delay={0.3}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2">
              {["all", "completed", "pending", "failed"].map((status) => (
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
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Payments List */}
      <AnimatedSection delay={0.35}>
        <Card className="!p-0 overflow-hidden">
          <Table headers={["Transaction", "Student", "Plan", "Amount", "Status", "Date"]}>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-stone-900">{payment.id}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={payment.student.avatar} name={payment.student.name} size="sm" />
                    <span className="text-sm text-stone-600">{payment.student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">{payment.plan}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-stone-900">${payment.amount}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(payment.status)}
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{formatDate(payment.date)}</td>
              </TableRow>
            ))}
          </Table>
        </Card>
      </AnimatedSection>
    </div>
  );
}
