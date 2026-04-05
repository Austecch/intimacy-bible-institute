"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  Play, 
  Search, 
  Filter,
  Calendar,
  Speaker,
  Sparkles,
  ChevronRight,
  Clock
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SectionHeader, Badge } from "@/components/ui/Elements";
import { mediaItems } from "@/lib/data";
import { Modal } from "@/components/ui/Feedback";

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

const mediaTypes = [
  { id: "all", label: "All" },
  { id: "sermon", label: "Sermons" },
  { id: "teaching", label: "Teachings" },
  { id: "video", label: "Videos" },
];

export default function MediaPage() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = mediaItems.filter((item) => {
    const matchesType = activeType === "all" || item.type === activeType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const typeColors = {
    sermon: "bg-amber-100 text-amber-700",
    teaching: "bg-violet-100 text-violet-700",
    video: "bg-emerald-100 text-emerald-700",
  };

  const typeLabels = {
    sermon: "Sermon",
    teaching: "Teaching",
    video: "Video",
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
              Media Centre
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 mb-6">
              Sermons, Teachings &{" "}
              <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Access powerful messages, in-depth teachings, and valuable resources to 
              strengthen your walk with God.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex gap-2">
              {mediaTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeType === type.id
                      ? "bg-violet-600 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedMedia(item.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted cursor-pointer transition-all duration-300 group"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-7 h-7 text-stone-900 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      {item.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-stone-500">
                      <div className="flex items-center gap-1">
                        <Speaker className="w-4 h-4" />
                        {item.speaker}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">No media found</h3>
              <p className="text-stone-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        title={mediaItems.find(m => m.id === selectedMedia)?.title}
        size="xl"
      >
        <div className="aspect-video bg-stone-900 rounded-xl flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-stone-400">Video Player</p>
            <p className="text-sm text-stone-500 mt-2">Video playback would be implemented here</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-stone-900">{mediaItems.find(m => m.id === selectedMedia)?.title}</h4>
            <p className="text-sm text-stone-500">{mediaItems.find(m => m.id === selectedMedia)?.speaker}</p>
          </div>
          <Badge>{mediaItems.find(m => m.id === selectedMedia)?.duration}</Badge>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
