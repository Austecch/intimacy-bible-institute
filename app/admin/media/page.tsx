"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Upload,
  FolderOpen,
  Image,
  Film,
  Music,
  FileText,
  Trash2,
  Download,
  Eye,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Elements";
import { mediaItems } from "@/lib/data";
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

const typeIcons = {
  sermon: Film,
  video: Film,
  teaching: FileText,
  audio: Music,
  image: Image,
};

const typeColors = {
  sermon: "bg-amber-100 text-amber-600",
  video: "bg-blue-100 text-blue-600",
  teaching: "bg-violet-100 text-violet-600",
  audio: "bg-pink-100 text-pink-600",
  image: "bg-emerald-100 text-emerald-600",
};

export default function MediaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Media Library</h1>
            <p className="text-stone-400">Upload and manage your media files</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
            <Upload className="w-5 h-5" />
            Upload Media
          </button>
        </div>
      </AnimatedSection>

      {/* Upload Zone */}
      <AnimatedSection delay={0.1}>
        <Card className="border-2 border-dashed border-stone-600 bg-stone-800/50 text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-stone-700 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Drop files here to upload</h3>
          <p className="text-stone-400 mb-4">or click to browse from your computer</p>
          <p className="text-sm text-stone-500">Supports: MP4, MP3, PDF, PNG, JPG (Max 500MB)</p>
        </Card>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={0.15}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2">
              {["all", "sermon", "teaching", "video"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    typeFilter === type
                      ? "bg-violet-600 text-white"
                      : "bg-stone-700 text-stone-400 hover:bg-stone-600"
                  }`}
                >
                  {type === "all" ? "All Files" : type + "s"}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-300 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Media Grid */}
      <AnimatedSection delay={0.2}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons] || FileText;
            return (
              <Card key={item.id} hover className="!p-0 overflow-hidden group">
                <div className="relative h-40">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                      <Eye className="w-5 h-5 text-stone-700" />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                      <Download className="w-5 h-5 text-stone-700" />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                  <div className={`absolute top-3 left-3 ${typeColors[item.type as keyof typeof typeColors]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-stone-900 truncate mb-1">{item.title}</h4>
                  <p className="text-sm text-stone-500 mb-3">{item.speaker}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">{formatDate(item.date)}</span>
                    <span className="text-xs text-stone-400">{item.duration}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  );
}
