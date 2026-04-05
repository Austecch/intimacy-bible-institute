"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Filter,
  Search,
  Clock,
  Users,
  Star,
  Sparkles,
  BookOpen,
  Heart,
  Crown,
  Mic
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionHeader, Tabs, Badge } from "@/components/ui/Elements";
import { courses } from "@/lib/data";

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

const categories = [
  { id: "all", label: "All Courses", icon: BookOpen },
  { id: "spiritual", label: "Spiritual Formation", icon: Heart },
  { id: "ministry", label: "Ministry Training", icon: Crown },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "worship", label: "Worship", icon: Mic },
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "all" || 
      course.category.toLowerCase().includes(activeCategory) ||
      (activeCategory === "spiritual" && course.category === "Spiritual Formation") ||
      (activeCategory === "ministry" && course.category === "Ministry Training");
    const matchesLevel = activeLevel === "All Levels" || course.level === activeLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-50 via-violet-50/30 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Our Programs
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Biblical Education
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Explore our diverse range of programs designed to deepen your understanding of Scripture 
              and transform your spiritual life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-stone-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-violet-600 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                />
              </div>
              <select
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value)}
                className="px-4 py-2 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-stone-500">
              Showing <span className="font-medium text-stone-900">{filteredCourses.length}</span> courses
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, i) => (
                <AnimatedSection key={course.id} delay={i * 0.05}>
                  <CourseCard course={course} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">No courses found</h3>
              <p className="text-stone-500 mb-6">Try adjusting your filters or search terms</p>
              <Button variant="secondary" onClick={() => {
                setActiveCategory("all");
                setActiveLevel("All Levels");
                setSearchQuery("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Program Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionHeader
              badge="Comparison"
              title="Program Options"
              description="Choose the learning path that fits your schedule and goals"
              centered
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Certificate",
                price: "Free",
                description: "Perfect for exploring our teachings",
                features: [
                  "Access to selected courses",
                  "Community forum access",
                  "Certificate of completion",
                  "Mobile app access",
                ],
                cta: "Start Learning",
                featured: false,
              },
              {
                name: "Diploma",
                price: "$99/mo",
                description: "Comprehensive biblical training",
                features: [
                  "All certificate features",
                  "Full course library access",
                  "Weekly live sessions",
                  "One-on-one mentoring",
                  "Downloadable resources",
                ],
                cta: "Get Started",
                featured: true,
              },
              {
                name: "Degree",
                price: "$199/mo",
                description: "Full theological education",
                features: [
                  "All diploma features",
                  "Academic credit hours",
                  "Personalized learning path",
                  "Ministry internship",
                  "Career services",
                ],
                cta: "Apply Now",
                featured: false,
              },
            ].map((plan, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative rounded-2xl p-8 h-full ${
                    plan.featured
                      ? "bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-lifted"
                      : "bg-stone-50 shadow-soft"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className={`text-xl font-semibold mb-2 ${!plan.featured && "text-stone-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-4xl font-bold mb-2 ${plan.featured ? "text-white" : "text-stone-900"}`}>
                    {plan.price}
                    {plan.price !== "Free" && <span className="text-lg font-normal opacity-70">/mo</span>}
                  </p>
                  <p className={`text-sm mb-6 ${plan.featured ? "text-violet-100" : "text-stone-500"}`}>
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.featured ? "bg-white/20" : "bg-violet-100"
                        }`}>
                          <Star className={`w-3 h-3 ${plan.featured ? "text-white" : "text-violet-600"}`} />
                        </div>
                        <span className={plan.featured ? "text-violet-100" : "text-stone-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/admissions">
                    <Button 
                      variant={plan.featured ? "secondary" : "primary"} 
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-16 text-center text-white">
              <h2 className="text-4xl font-semibold mb-6">Still Have Questions?</h2>
              <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
                Our admissions team is here to help you find the perfect program for your spiritual journey.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                  Contact Admissions
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
