"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Sparkles,
  MessageCircle,
  Calendar
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/Elements";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@ibi.edu",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (234) 567-8900",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Faith Avenue",
    description: "Grace City, GC 12345",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "24/7 Online Support",
    description: "We're always here for you",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-50 via-violet-50/30 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              We'd Love to{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Have questions about our programs? Want to partner with us? 
              We're here to help on your spiritual journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-stone-50 rounded-2xl p-6 text-center hover:bg-violet-50 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1">{item.label}</h3>
                  <p className="text-lg text-stone-700 font-medium">{item.value}</p>
                  <p className="text-sm text-stone-500 mt-1">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="bg-white rounded-3xl p-8 shadow-soft h-full">
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">Send Us a Message</h2>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">Message Sent!</h3>
                    <p className="text-stone-500">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" icon={Send} iconPosition="right">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-soft">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">Schedule a Call</h3>
                  </div>
                  <p className="text-stone-600 mb-6">
                    Prefer to speak face-to-face? Schedule a free consultation with our admissions team.
                  </p>
                  <Button variant="secondary" icon={Calendar} className="w-full">
                    Book a Call
                  </Button>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-soft">
                  <h3 className="text-xl font-semibold text-stone-900 mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Admissions FAQ", href: "/admissions#faq" },
                      { label: "Course Catalog", href: "/programs" },
                      { label: "Student Portal", href: "/dashboard" },
                      { label: "Media Resources", href: "/media" },
                    ].map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 text-stone-600 hover:text-violet-600 transition-colors"
                      >
                        <span>{link.label}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <p className="text-violet-100 mb-6">
                    Stay connected with our community and get updates on new courses and events.
                  </p>
                  <div className="flex gap-4">
                    {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-5 h-5 bg-white rounded-full opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
