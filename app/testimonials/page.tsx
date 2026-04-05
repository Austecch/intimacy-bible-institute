"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SectionHeader, Badge } from "@/components/ui/Elements";
import { testimonials, courses } from "@/lib/data";
import Link from "next/link";
import Button from "@/components/ui/Button";

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

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-50 via-violet-50/30 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Testimonials
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              Lives{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Transformed
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Hear from students whose lives have been changed through our programs 
              and their journey with God.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-6 left-8 opacity-20">
                <Quote className="w-32 h-32" />
              </div>
              <div className="relative">
                <Quote className="w-12 h-12 mx-auto mb-6 text-violet-200" />
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-violet-50">
                  "IBI didn't just teach me theology—it awakened a hunger for God's presence I never knew I had. 
                  The intimacy I now experience with my Heavenly Father has transformed every area of my life."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                    alt="Featured testimonial"
                    width={64}
                    height={64}
                    className="rounded-full object-cover ring-4 ring-white/30"
                  />
                  <div className="text-left">
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-violet-200">Diploma Graduate, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <SectionHeader
              badge="Stories"
              title="Student Stories"
              centered
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={testimonial.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lifted transition-all duration-300 h-full"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg text-stone-600 mb-6 leading-relaxed font-serif italic">
                    "{testimonial.quote}"
                  </p>
                  {testimonial.course && (
                    <Badge variant="outline" className="mb-4">
                      {testimonial.course}
                    </Badge>
                  )}
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-stone-900">{testimonial.name}</p>
                      <p className="text-sm text-stone-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionHeader
              badge="Video Testimonials"
              title="In Their Own Words"
              description="Watch students share their transformation stories"
              centered
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "From Doubt to Destiny",
                name: "Michael Thompson",
                role: "Senior Pastor",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
              },
              {
                title: "Healing Through Intimacy",
                name: "Grace Williams",
                role: "Worship Leader",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
              },
              {
                title: "Called to Ministry",
                name: "David Kim",
                role: "Youth Pastor",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
              },
            ].map((video, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={video.image}
                      alt={video.title}
                      width={400}
                      height={240}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-6 h-6 text-stone-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1">{video.title}</h3>
                  <p className="text-sm text-stone-500">{video.name} • {video.role}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-16 text-center text-white">
              <h2 className="text-4xl font-semibold mb-6">Share Your Story</h2>
              <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
                Has IBI transformed your life? We'd love to hear from you and share your testimony 
                with our community.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100" icon={ArrowRight} iconPosition="right">
                  Submit Your Testimony
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
