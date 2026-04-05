"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Save
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Avatar, Badge } from "@/components/ui/Elements";
import { adminUser } from "@/lib/data";

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

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  const menuItems = [
    { id: "general", icon: User, label: "General" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "appearance", icon: Palette, label: "Appearance" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "integrations", icon: Globe, label: "Integrations" },
    { id: "billing", icon: Database, label: "Billing" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <AnimatedSection className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Settings</h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? "bg-violet-50 text-violet-700"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </AnimatedSection>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "general" && (
            <>
              <AnimatedSection delay={0.1}>
                <Card>
                  <h3 className="text-lg font-semibold text-stone-900 mb-6">General Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar src={adminUser.avatar} name={adminUser.name} size="xl" />
                      <div>
                        <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                          Change Avatar
                        </button>
                        <p className="text-sm text-stone-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input label="Admin Name" defaultValue={adminUser.name} />
                      <Input label="Email Address" type="email" defaultValue={adminUser.email} />
                      <Input label="Phone Number" type="tel" defaultValue="+1 (234) 567-8900" />
                      <Input label="Timezone" defaultValue="America/New_York (EST)" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="Administrator of Intimacy Bible Institute."
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                      />
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <Card>
                  <h3 className="text-lg font-semibold text-stone-900 mb-6">Institution Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Institution Name" defaultValue="Intimacy Bible Institute" />
                    <Input label="Website URL" defaultValue="https://ibi.edu" />
                    <Input label="Contact Email" type="email" defaultValue="info@ibi.edu" />
                    <Input label="Support Phone" type="tel" defaultValue="+1 (234) 567-8900" />
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-stone-700 mb-2">Address</label>
                    <textarea
                      rows={2}
                      defaultValue="123 Faith Avenue, Grace City, GC 12345"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                    />
                  </div>
                </Card>
              </AnimatedSection>
            </>
          )}

          {activeSection === "notifications" && (
            <AnimatedSection delay={0.1}>
              <Card>
                <h3 className="text-lg font-semibold text-stone-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "New student enrollments", desc: "Get notified when a new student signs up", enabled: true },
                    { label: "Course completions", desc: "Get notified when a student completes a course", enabled: true },
                    { label: "Payment receipts", desc: "Receive email receipts for all payments", enabled: true },
                    { label: "Quiz submissions", desc: "Get notified when students submit quizzes", enabled: false },
                    { label: "Marketing updates", desc: "Receive updates about new features", enabled: false },
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
          )}

          {activeSection === "appearance" && (
            <AnimatedSection delay={0.1}>
              <Card>
                <h3 className="text-lg font-semibold text-stone-900 mb-6">Appearance Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">Theme</label>
                    <div className="flex gap-4">
                      {["Light", "Dark", "System"].map((theme) => (
                        <button
                          key={theme}
                          className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                            theme === "Dark"
                              ? "border-violet-600 bg-violet-50"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="w-12 h-8 bg-stone-200 rounded-lg mb-2" />
                          <p className="font-medium text-stone-900">{theme}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">Accent Color</label>
                    <div className="flex gap-3">
                      {["#7C3AED", "#2563EB", "#059669", "#D97706", "#DC2626"].map((color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full transition-transform ${
                            color === "#7C3AED" ? "ring-2 ring-offset-2 ring-violet-600 scale-110" : ""
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          )}

          {activeSection === "security" && (
            <AnimatedSection delay={0.1}>
              <Card>
                <h3 className="text-lg font-semibold text-stone-900 mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-stone-900 mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100">
                    <h4 className="font-medium text-stone-900 mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-stone-600">Add an extra layer of security to your account</p>
                        <Badge variant="warning" className="mt-2">Not Enabled</Badge>
                      </div>
                      <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          )}

          {/* Save Button */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-end gap-4">
              <Button variant="secondary">Cancel</Button>
              <Button icon={Save}>Save Changes</Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
