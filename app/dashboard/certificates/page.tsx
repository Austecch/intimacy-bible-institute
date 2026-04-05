"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Award, 
  Download, 
  Share2, 
  Calendar,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Elements";
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

const certificates = [
  {
    id: 1,
    title: "Foundations of Intimacy with God",
    instructor: "Apostle James Richardson",
    issueDate: "2024-02-15",
    verificationCode: "IBI-FOUND-2024-001",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "The Prophetic Anointing",
    instructor: "Prophetess Maria Thompson",
    issueDate: "2024-01-20",
    verificationCode: "IBI-PROPH-2024-003",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Kingdom Economics",
    instructor: "Bishop David Chen",
    issueDate: "2023-12-10",
    verificationCode: "IBI-KING-2023-087",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Certificates</h1>
            <p className="text-stone-500">Your achievements and recognized accomplishments</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatedSection delay={0.1}>
          <Card className="text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-violet-600" />
            </div>
            <p className="text-3xl font-bold text-stone-900">{certificates.length}</p>
            <p className="text-sm text-stone-500">Total Certificates</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <Card className="text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-stone-900">3</p>
            <p className="text-sm text-stone-500">Verified</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Card className="text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-stone-900">6</p>
            <p className="text-sm text-stone-500">Downloads</p>
          </Card>
        </AnimatedSection>
      </div>

      {/* Certificate Grid */}
      <AnimatedSection delay={0.25}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCert(cert.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted cursor-pointer transition-all duration-300"
            >
              <div className="relative h-40">
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="success" className="bg-emerald-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-semibold text-white line-clamp-1">{cert.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  Issued {formatDate(cert.issueDate)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">{cert.verificationCode}</span>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Share Certificate Section */}
      <AnimatedSection delay={0.3}>
        <Card className="bg-gradient-to-br from-violet-600 to-violet-700 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Share Your Achievements</h3>
                <p className="text-violet-200">Show off your certificates on LinkedIn or social media</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-medium rounded-xl hover:bg-violet-50 transition-colors">
              <ExternalLink className="w-5 h-5" />
              Share Now
            </button>
          </div>
        </Card>
      </AnimatedSection>
    </div>
  );
}
