"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Clock,
  Users,
  FileText,
  MessageCircle
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

const requirements = [
  "Born-again Christian with a personal relationship with Jesus",
  "Active in a local church community",
  "Completion of our Foundations course or equivalent",
  "Commitment to the program's time requirements",
  "Agree with our statement of faith",
];

const faqs = [
  {
    question: "What are the admission requirements?",
    answer: "Applicants must be born-again Christians with a personal relationship with Jesus, active in a local church, and committed to the program's time requirements. Completion of our Foundations course or an equivalent is recommended.",
  },
  {
    question: "How long does the program take?",
    answer: "Most certificate programs take 6-12 months to complete, depending on your pace. Diploma programs typically take 18-24 months, while degree programs span 3-4 years.",
  },
  {
    question: "Are the courses available online?",
    answer: "Yes! All courses are available online through our learning platform. You can access lessons, resources, and assignments 24/7 from anywhere in the world.",
  },
  {
    question: "What payment options are available?",
    answer: "We offer monthly subscription plans and annual payment options. Need-based scholarships are also available for those who qualify.",
  },
  {
    question: "Can I transfer credits from other institutions?",
    answer: "Yes, we accept transfer credits from accredited theological institutions. Our admissions team will evaluate your previous coursework during the application process.",
  },
];

export default function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    church: "",
    program: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
              Join Us
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              Begin Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Take the first step toward deeper intimacy with God and transformative biblical education.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-violet-50 text-violet-600 text-sm font-medium rounded-full mb-4">
                Requirements
              </span>
              <h2 className="text-4xl font-semibold tracking-tight text-stone-900 mb-6">
                Admission Requirements
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Our programs are designed for committed believers who are ready to invest in their 
                spiritual growth and ministry development.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-600">{req}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-stone-50 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-stone-900 mb-6">What You'll Need</h3>
                <div className="space-y-4">
                  {[
                    { icon: FileText, label: "Valid ID", desc: "Government-issued photo ID" },
                    { icon: BookOpen, label: "Church Reference", desc: "Letter from pastor or leader" },
                    { icon: MessageCircle, label: "Personal Statement", desc: "Why you want to join IBI" },
                    { icon: Clock, label: "Time Commitment", desc: "At least 5 hours per week" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900">{item.label}</h4>
                        <p className="text-sm text-stone-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-stone-50" id="apply">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionHeader
              badge="Apply Now"
              title="Start Your Application"
              description="Complete the form below and our admissions team will contact you within 48 hours"
              centered
            />
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-soft">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-6 mb-6">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (234) 567-8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    label="Church/Organization"
                    placeholder="Grace Community Church"
                    value={formData.church}
                    onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Program of Interest
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                      required
                    >
                      <option value="">Select a program</option>
                      <option value="certificate">Certificate Program</option>
                      <option value="diploma">Diploma Program</option>
                      <option value="degree">Degree Program</option>
                      <option value="single">Single Course Enrollment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Tell us about yourself
                    </label>
                    <textarea
                      placeholder="Share your spiritual journey and why you'd like to join IBI..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" icon={ArrowRight} iconPosition="right">
                  Submit Application
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked Questions"
              centered
            />
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-stone-50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-stone-900 pr-4">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="px-6 pb-6"
                    >
                      <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-16 text-center text-white">
              <h2 className="text-4xl font-semibold mb-6">Still Have Questions?</h2>
              <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                Our admissions team is here to help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50">
                  Contact Admissions
                </Button>
                <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
