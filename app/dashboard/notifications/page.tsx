"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Bell, 
  CheckCircle2, 
  Clock,
  FileText,
  BookOpen,
  Award,
  MessageCircle,
  Settings
} from "lucide-react";
import { Card } from "@/components/ui/Card";
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

const notifications = [
  {
    id: 1,
    type: "course",
    title: "New lesson available",
    message: "A new lesson 'Advanced Prophetic Activation' has been added to The Prophetic Anointing.",
    time: "2 hours ago",
    read: false,
    icon: BookOpen,
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: 2,
    type: "assignment",
    title: "Assignment due soon",
    message: "Your Reflection Journal - Week 4 is due in 2 days.",
    time: "5 hours ago",
    read: false,
    icon: FileText,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 3,
    type: "achievement",
    title: "Achievement unlocked!",
    message: "Congratulations! You've completed 5 lessons. Keep up the great work!",
    time: "Yesterday",
    read: true,
    icon: Award,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 4,
    type: "course",
    title: "Course recommendation",
    message: "Based on your progress, we think you'd love 'Worship as Lifestyle'.",
    time: "2 days ago",
    read: true,
    icon: MessageCircle,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    type: "system",
    title: "Weekly progress report",
    message: "You completed 3 lessons this week. That's 2 more than last week!",
    time: "1 week ago",
    read: true,
    icon: CheckCircle2,
    color: "bg-stone-100 text-stone-600",
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  const filteredNotifications = notifs.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    if (activeTab === "course") return n.type === "course";
    if (activeTab === "assignment") return n.type === "assignment";
    return true;
  });

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Notifications</h1>
            <p className="text-stone-500">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.1}>
        <Tabs
          tabs={[
            { id: "all", label: "All", count: notifs.length },
            { id: "unread", label: "Unread", count: unreadCount },
            { id: "course", label: "Courses", count: notifs.filter(n => n.type === "course").length },
            { id: "assignment", label: "Assignments", count: notifs.filter(n => n.type === "assignment").length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </AnimatedSection>

      {/* Notifications List */}
      <AnimatedSection delay={0.15}>
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                hover
                onClick={() => markAsRead(notification.id)}
                className={`cursor-pointer transition-all ${
                  !notification.read ? "bg-violet-50/50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-stone-900">{notification.title}</h3>
                        <p className="text-sm text-stone-600 mt-1">{notification.message}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-stone-400">{notification.time}</span>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-violet-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </AnimatedSection>

      {filteredNotifications.length === 0 && (
        <AnimatedSection delay={0.2}>
          <Card className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No notifications</h3>
            <p className="text-stone-500">You're all caught up!</p>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
