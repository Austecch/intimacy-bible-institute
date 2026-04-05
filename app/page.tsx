"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Quote,
  Star,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Heart,
  BookOpen,
  MessageCircle,
  Sparkles,
  Award,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { SectionHeader, Badge } from "@/components/ui/Elements";
import { courses, testimonials } from "@/lib/data";

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

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    setIsHeroLoaded(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-violet-50/30 to-stone-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-100 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroLoaded ? 1 : 0, y: isHeroLoaded ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
                <Sparkles className="w-4 h-4" />
                Transforming Lives Through His Word
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroLoaded ? 1 : 0, y: isHeroLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6"
            >
              Deepen Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Intimacy
              </span>{" "}
              with God
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroLoaded ? 1 : 0, y: isHeroLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Discover a transformative journey of spiritual formation through our comprehensive biblical education programs. 
              Cultivate a life-changing relationship with your Heavenly Father.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroLoaded ? 1 : 0, y: isHeroLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/admissions">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="secondary" size="lg" icon={Play}>
                  Explore Programs
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroLoaded ? 1 : 0, y: isHeroLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex items-center justify-center gap-8 text-sm text-stone-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Accredited Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Expert Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Lifetime Access</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-stone-300 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-stone-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-violet-100 rounded-3xl -z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=1000&fit=crop"
                  alt="Spiritual formation"
                  width={600}
                  height={750}
                  className="rounded-3xl shadow-soft object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-lifted">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                      <Heart className="w-7 h-7 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-stone-900">4,500+</p>
                      <p className="text-sm text-stone-500">Students Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:pl-8">
              <span className="inline-block px-4 py-1.5 bg-violet-50 text-violet-600 text-sm font-medium rounded-full mb-4">
                About IBI
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
                Where Faith Meets{" "}
                <span className="text-violet-600">Understanding</span>
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Founded on the belief that every believer deserves access to deep, transformative biblical teaching, 
                Intimacy Bible Institute has been equipping disciples for over a decade.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Our programs combine academic rigor with spiritual depth, creating an environment where students 
                not only learn about God but experience His presence in unprecedented ways.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BookOpen, label: "Comprehensive Curriculum" },
                  { icon: MessageCircle, label: "Interactive Learning" },
                  { icon: Heart, label: "Spiritual Formation" },
                  { icon: Award, label: "Recognized Certification" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <span className="font-medium text-stone-700">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                  Learn More About Us
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              badge="Our Programs"
              title="Transformative Courses"
              description="Explore our carefully crafted programs designed to deepen your walk with God and equip you for ministry."
              centered
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Founder Spotlight */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-4">
                Our Founder
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
                Apostle James Richardson
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed font-serif italic text-stone-700">
                "God has called us not merely to know about Him, but to know Him intimately—to dwell in His presence 
                and allow His love to transform every area of our lives."
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                With over 30 years of ministry experience, Apostle Richardson founded IBI with a vision to make 
                deep, life-transforming biblical teaching accessible to believers worldwide. His teaching style 
                combines prophetic insight with practical application, creating an environment where students 
                experience genuine spiritual transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline">Doctorate in Theology</Badge>
                <Badge variant="outline">International Speaker</Badge>
                <Badge variant="outline">Author of 12 Books</Badge>
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-amber-100 rounded-3xl -z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop"
                  alt="Apostle James Richardson"
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-soft object-cover w-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-violet-600 to-violet-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-4">
              <Quote className="w-4 h-4" />
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Lives Transformed
            </h2>
          </AnimatedSection>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-12 h-12 mx-auto mb-6 text-violet-300" />
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-white/90">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-violet-200">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeTestimonial
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 to-stone-800 p-16 text-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                  Begin Your Transformation Today
                </h2>
                <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto">
                  Join our community of believers committed to deepening their intimacy with God 
                  and discovering their divine purpose.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/admissions">
                    <Button size="lg" icon={ArrowRight} iconPosition="right" className="bg-white text-stone-900 hover:bg-stone-100">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4,500+", label: "Students Enrolled" },
              { value: "50+", label: "Expert Instructors" },
              { value: "120+", label: "Courses Available" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <AnimatedSection key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-stone-900 mb-2">{stat.value}</p>
                <p className="text-stone-500">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
