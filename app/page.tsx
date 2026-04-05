"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { testimonials, courses as coursesData } from "@/lib/data";
import { supabase } from "@/lib/supabase";

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

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("featured", true)
        .limit(3);
      if (data && data.length > 0) {
        setCourses(data);
      }
    }
    fetchCourses();
  }, []);

  const featuredCourses = courses.length > 0 ? courses : coursesData.filter((c: any) => c.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero - Minimal */}
      <section className="relative py-32 md:py-48 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-stone-900 tracking-tight mb-6">
              Deepen Your <br />
              <span className="text-stone-600">Intimacy with God</span>
            </h1>

            <p className="text-lg text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Transformative biblical education that helps you cultivate a life-changing relationship with your Heavenly Father.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/admissions">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="lg">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About - Simple */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <Image
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop"
                alt="Spiritual formation"
                width={600}
                height={450}
                className="rounded-lg object-cover"
              />
            </AnimatedSection>

            <AnimatedSection className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
                Where Faith Meets Understanding
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Founded on the belief that every believer deserves access to deep, transformative biblical teaching, 
                Intimacy Bible Institute has been equipping disciples for over a decade.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Our programs combine academic rigor with spiritual depth, creating an environment where students 
                experience genuine transformation.
              </p>
              <Link href="/about" className="inline-block">
                <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                  Learn More
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Courses - Clean */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 mb-4">
              Our Programs
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Carefully crafted courses designed to deepen your walk with God and equip you for ministry.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, i) => (
              <AnimatedSection key={course.id} delay={i * 0.1}>
                <CourseCard course={course} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/programs">
              <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                View All Courses
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials - Minimal */}
      <section className="py-24 md:py-32 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Lives Transformed
            </h2>
          </AnimatedSection>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl text-stone-300 mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-stone-400">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === activeTestimonial ? "bg-white w-8" : "bg-stone-700 w-2 hover:bg-stone-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 mb-6">
              Begin Your Transformation Today
            </h2>
            <p className="text-stone-500 mb-10 max-w-lg mx-auto">
              Join our community of believers committed to deepening their intimacy with God.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/admissions">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Apply Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats - Simple */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4,500+", label: "Students" },
              { value: "50+", label: "Instructors" },
              { value: "120+", label: "Courses" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <AnimatedSection key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-stone-900">{stat.value}</p>
                <p className="text-stone-500 mt-1">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
