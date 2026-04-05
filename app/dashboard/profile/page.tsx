"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Check
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar, Badge } from "@/components/ui/Elements";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { currentUser } from "@/lib/data";
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

const menuItems = [
  { icon: User, label: "Personal Information", href: "#personal" },
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: Shield, label: "Privacy & Security", href: "#privacy" },
  { icon: Calendar, label: "Learning Preferences", href: "#preferences" },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: currentUser.name.split(" ")[0],
    lastName: currentUser.name.split(" ")[1],
    email: currentUser.email,
    phone: "+1 (234) 567-8900",
    location: "New York, USA",
    bio: "Passionate about growing in intimacy with God and helping others do the same.",
    church: "Grace Community Church",
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <AnimatedSection className="lg:col-span-1">
          <Card>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-stone-900 mt-4">{currentUser.name}</h2>
              <p className="text-sm text-stone-500">{currentUser.email}</p>
              <Badge variant="success" className="mt-2">
                <Check className="w-3 h-3 mr-1" />
                Active Student
              </Badge>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-violet-50 text-violet-700"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-stone-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </Card>
        </AnimatedSection>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <AnimatedSection delay={0.1}>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-stone-900">Personal Information</h3>
                <Button variant="secondary" size="sm">Edit Profile</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  icon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  icon={<Phone className="w-5 h-5" />}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label="Location"
                  icon={<MapPin className="w-5 h-5" />}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <Input
                  label="Church/Organization"
                  value={formData.church}
                  onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                />
              </div>
            </Card>
          </AnimatedSection>

          {/* Account Details */}
          <AnimatedSection delay={0.15}>
            <Card>
              <h3 className="text-lg font-semibold text-stone-900 mb-6">Account Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-stone-100">
                  <div>
                    <p className="font-medium text-stone-900">Membership Type</p>
                    <p className="text-sm text-stone-500">Your current subscription plan</p>
                  </div>
                  <Badge variant="success">Diploma Program</Badge>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-stone-100">
                  <div>
                    <p className="font-medium text-stone-900">Member Since</p>
                    <p className="text-sm text-stone-500">Your account creation date</p>
                  </div>
                  <span className="text-stone-700">{formatDate(currentUser.joinDate)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-stone-900">Last Login</p>
                    <p className="text-sm text-stone-500">Your most recent login</p>
                  </div>
                  <span className="text-stone-700">Today at 9:45 AM</span>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Notification Settings */}
          <AnimatedSection delay={0.2}>
            <Card>
              <h3 className="text-lg font-semibold text-stone-900 mb-6">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Course announcements", desc: "Get notified about new course content", enabled: true },
                  { label: "Assignment reminders", desc: "Receive reminders for upcoming deadlines", enabled: true },
                  { label: "Weekly progress summary", desc: "Weekly email about your learning progress", enabled: false },
                  { label: "Marketing emails", desc: "Updates about new programs and events", enabled: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                    <div>
                      <p className="font-medium text-stone-900">{setting.label}</p>
                      <p className="text-sm text-stone-500">{setting.desc}</p>
                    </div>
                    <button
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        setting.enabled ? "bg-violet-600" : "bg-stone-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          setting.enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
