"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Download, 
  FileText, 
  Headphones, 
  Video,
  Search,
  FolderOpen,
  Clock,
  HardDrive
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tabs, Badge } from "@/components/ui/Elements";

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

const downloads = [
  {
    id: 1,
    title: "Course Workbook - Foundations",
    type: "pdf",
    size: "12.5 MB",
    course: "Foundations of Intimacy with God",
    date: "2024-03-15",
    downloads: 234,
  },
  {
    id: 2,
    title: "Worship Resources Collection",
    type: "zip",
    size: "89.2 MB",
    course: "Worship as Lifestyle",
    date: "2024-03-10",
    downloads: 156,
  },
  {
    id: 3,
    title: "Audio: Prayer Meditation Guide",
    type: "audio",
    size: "45.8 MB",
    course: "Foundations of Intimacy with God",
    date: "2024-03-05",
    downloads: 412,
  },
  {
    id: 4,
    title: "Prophetic Activation Notes",
    type: "pdf",
    size: "8.3 MB",
    course: "The Prophetic Anointing",
    date: "2024-02-28",
    downloads: 189,
  },
  {
    id: 5,
    title: "Financial Stewardship Guide",
    type: "pdf",
    size: "15.1 MB",
    course: "Kingdom Economics",
    date: "2024-02-20",
    downloads: 267,
  },
  {
    id: 6,
    title: "Healing Ministry Training Manual",
    type: "pdf",
    size: "22.7 MB",
    course: "Healing Ministry Training",
    date: "2024-02-15",
    downloads: 145,
  },
];

const typeIcons = {
  pdf: FileText,
  audio: Headphones,
  video: Video,
  zip: FolderOpen,
};

const typeColors = {
  pdf: "bg-red-100 text-red-600",
  audio: "bg-violet-100 text-violet-600",
  video: "bg-blue-100 text-blue-600",
  zip: "bg-amber-100 text-amber-600",
};

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDownloads = downloads.filter(d => {
    const matchesType = activeTab === "all" || d.type === activeTab;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalSize = downloads.reduce((acc, d) => {
    const size = parseFloat(d.size);
    return acc + size;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Downloads</h1>
          <p className="text-stone-500">Access your course materials and resources</p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatedSection delay={0.1}>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">{totalSize.toFixed(1)} MB</p>
              <p className="text-sm text-stone-500">Total Downloaded</p>
            </div>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Download className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">1,403</p>
              <p className="text-sm text-stone-500">Total Downloads</p>
            </div>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">{downloads.length}</p>
              <p className="text-sm text-stone-500">Available Files</p>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      {/* Filters */}
      <AnimatedSection delay={0.25}>
        <Card className="!p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <Tabs
              tabs={[
                { id: "all", label: "All", count: downloads.length },
                { id: "pdf", label: "PDFs", count: downloads.filter(d => d.type === "pdf").length },
                { id: "audio", label: "Audio", count: downloads.filter(d => d.type === "audio").length },
                { id: "video", label: "Video", count: downloads.filter(d => d.type === "video").length },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
              />
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Download List */}
      <AnimatedSection delay={0.3}>
        <div className="space-y-3">
          {filteredDownloads.map((item) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons] || FileText;
            return (
              <Card key={item.id} hover className="!py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[item.type as keyof typeof typeColors]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-900 truncate">{item.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-stone-500">
                      <span>{item.course}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{item.size}</Badge>
                    <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </AnimatedSection>

      {filteredDownloads.length === 0 && (
        <AnimatedSection delay={0.35}>
          <Card className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No files found</h3>
            <p className="text-stone-500">Try adjusting your search or filters</p>
          </Card>
        </AnimatedSection>
      )}
    </div>
  );
}
