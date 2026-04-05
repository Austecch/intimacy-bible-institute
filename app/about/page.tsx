"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowRight, 
  Target, 
  Eye, 
  BookOpen, 
  Users, 
  Award,
  CheckCircle2,
  Quote,
  Sparkles
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { SectionHeader, Badge } from "@/components/ui/Elements";

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

const leadership = [
  {
    name: "Apostle James Richardson",
    role: "Founder & President",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Doctor of Theology with 30+ years of ministry experience. Author of 12 books on spiritual formation.",
  },
  {
    name: "Prophetess Maria Thompson",
    role: "Dean of Prophetic Studies",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Recognized international prophet and speaker with a powerful prophetic ministry.",
  },
  {
    name: "Bishop David Chen",
    role: "Director of Theology",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Former seminary professor with expertise in systematic theology and church history.",
  },
  {
    name: "Dr. Rebecca Johnson",
    role: "Dean of Ministry Training",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    bio: "Medical doctor turned minister, specializing in healing ministry and deliverance.",
  },
  {
    name: "Dr. Michael Roberts",
    role: "Head of Biblical Studies",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "PhD in Biblical Studies with expertise in hermeneutics and scriptural interpretation.",
  },
  {
    name: "Pastor Grace Williams",
    role: "Worship Ministry Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Award-winning worship leader with 20 years of experience in church music ministry.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-50 via-violet-50/30 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              About Intimacy Bible Institute
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              Our Story of{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Faith & Purpose
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              For over a decade, Intimacy Bible Institute has been a beacon of transformative biblical education, 
              equipping believers worldwide to deepen their relationship with God.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-violet-100 rounded-3xl -z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop"
                  alt="Mission"
                  width={600}
                  height={450}
                  className="rounded-3xl shadow-soft object-cover w-full"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-3xl font-semibold text-stone-900">Our Mission</h2>
              </div>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                To provide accessible, Spirit-empowered biblical education that transforms lives and equips 
                believers to fulfill their divine purpose through intimate knowledge of God and His Word.
              </p>
              <div className="space-y-4">
                {[
                  "Deliver curriculum that combines theological depth with practical application",
                  "Create an environment where students experience genuine spiritual transformation",
                  "Train disciples who can effectively minister in their local churches and communities",
                  "Foster a global community of believers committed to intimacy with God",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <p className="text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-3xl font-semibold text-stone-900">Our Vision</h2>
              </div>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                To be the leading global institution for intimate biblical education, raising up a generation 
                of believers who walk in supernatural intimacy with their Heavenly Father and operate in 
                the power and authority of the Kingdom.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100+", label: "Countries Reached" },
                  { value: "50K+", label: "Alumni Worldwide" },
                  { value: "98%", label: "Graduation Rate" },
                  { value: "24/7", label: "Online Access" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-soft">
                    <p className="text-2xl font-bold text-violet-600">{stat.value}</p>
                    <p className="text-sm text-stone-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-amber-100 rounded-3xl -z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop"
                  alt="Vision"
                  width={600}
                  height={450}
                  className="rounded-3xl shadow-soft object-cover w-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Mandate */}
      <section id="mandate" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-3xl font-semibold text-stone-900">The Mandate</h2>
            </div>
            <p className="text-lg text-stone-600">
              Our mandate is rooted in the Great Commission and the call to make disciples who know 
              their Father intimately.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Equip",
                description: "Provide comprehensive biblical training that addresses every aspect of Christian life and ministry.",
                icon: Award,
              },
              {
                title: "Empower",
                description: "Release students into their God-given purpose through prophetic impartation and practical training.",
                icon: Sparkles,
              },
              {
                title: "Send",
                description: "Deploy graduates ready to transform their communities with the message of intimacy with God.",
                icon: Users,
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-stone-50 rounded-2xl p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionHeader
              badge="Our Team"
              title="Leadership"
              description="Meet the dedicated team guiding Intimacy Bible Institute"
              centered
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-stone-900">{person.name}</h3>
                    <p className="text-sm text-violet-600 mb-3">{person.role}</p>
                    <p className="text-sm text-stone-500">{person.bio}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-16 text-white">
              <h2 className="text-4xl font-semibold mb-6">Ready to Join Our Community?</h2>
              <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                Begin your journey of transformation and discover the intimate relationship 
                with God you've always longed for.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/admissions">
                  <Button size="lg" icon={ArrowRight} iconPosition="right" className="bg-white text-violet-700 hover:bg-violet-50">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
