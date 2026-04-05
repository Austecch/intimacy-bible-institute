"use client";

import { useState, useRef } from "react";
import { motion, useInView, Reorder, useDragControls } from "framer-motion";
import { 
  Plus,
  GripVertical,
  Trash2,
  Edit,
  Video,
  Headphones,
  FileText,
  BookOpen,
  Save,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Upload,
  Image,
  Settings,
  Eye,
  Copy,
  MoreVertical,
  X,
  Check,
  Clock,
  Layers,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge, Avatar } from "@/components/ui/Elements";
import { courses } from "@/lib/data";

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

interface Lesson {
  id: string;
  title: string;
  type: "video" | "audio" | "pdf" | "text";
  duration: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const lessonTypes = [
  { type: "video", icon: Video, label: "Video", color: "bg-violet-100 text-violet-600" },
  { type: "audio", icon: Headphones, label: "Audio", color: "bg-pink-100 text-pink-600" },
  { type: "pdf", icon: FileText, label: "PDF", color: "bg-red-100 text-red-600" },
  { type: "text", icon: BookOpen, label: "Text", color: "bg-emerald-100 text-emerald-600" },
];

const existingCourse = courses[0];

export default function CourseBuilderPage() {
  const [activeTab, setActiveTab] = useState("content");
  const [courseTitle, setCourseTitle] = useState(existingCourse?.title || "");
  const [courseDescription, setCourseDescription] = useState(existingCourse?.description || "");
  const [modules, setModules] = useState<Module[]>(
    existingCourse?.modules || [
      {
        id: "mod_new_1",
        title: "Module 1: Introduction",
        lessons: [
          { id: "les_new_1", title: "Welcome & Overview", type: "video", duration: 10 },
          { id: "les_new_2", title: "Course Materials", type: "pdf", duration: 5 },
        ],
      },
      {
        id: "mod_new_2",
        title: "Module 2: Getting Started",
        lessons: [
          { id: "les_new_3", title: "Setting Up Your Environment", type: "video", duration: 15 },
        ],
      },
    ]
  );
  const [expandedModules, setExpandedModules] = useState<string[]>(["mod_new_1"]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [newLessonType, setNewLessonType] = useState<"video" | "audio" | "pdf" | "text">("video");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [publishModal, setPublishModal] = useState(false);

  const tabs = [
    { id: "content", label: "Course Content", icon: Layers },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "preview", label: "Preview", icon: Eye },
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const addModule = () => {
    const newModule: Module = {
      id: `mod_new_${Date.now()}`,
      title: `Module ${modules.length + 1}: New Module`,
      lessons: [],
    };
    setModules([...modules, newModule]);
    setExpandedModules([...expandedModules, newModule.id]);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, title } : m))
    );
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `les_new_${Date.now()}`,
      title: "New Lesson",
      type: newLessonType,
      duration: 10,
    };
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      )
    );
    setShowLessonModal(false);
    setNewLessonTitle("");
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      )
    );
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId ? { ...l, ...updates } : l
              ),
            }
          : m
      )
    );
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.duration, 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title..."
                className="bg-transparent text-xl font-semibold text-white placeholder:text-stone-500 focus:outline-none w-full"
              />
              <p className="text-sm text-stone-400">
                {totalLessons} lessons • {totalDuration} min total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={Eye}>
              Preview
            </Button>
            <Button variant="secondary" icon={Save}>
              Save Draft
            </Button>
            <Button icon={Check} onClick={() => setPublishModal(true)}>
              Publish Course
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection delay={0.1}>
        <div className="flex gap-2 p-1 bg-stone-800 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Main Content */}
      {activeTab === "content" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Module List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatedSection delay={0.15}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Course Structure</h2>
                <Button size="sm" icon={Plus} onClick={addModule}>
                  Add Module
                </Button>
              </div>
            </AnimatedSection>

            <Reorder.Group
              axis="y"
              values={modules}
              onReorder={setModules}
              className="space-y-4"
            >
              {modules.map((module, moduleIndex) => (
                <Reorder.Item
                  key={module.id}
                  value={module}
                  className="relative"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-stone-800 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 border-b border-stone-700">
                      <div className="cursor-grab active:cursor-grabbing text-stone-500 hover:text-stone-300">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="text-stone-400 hover:text-white transition-colors"
                      >
                        {expandedModules.includes(module.id) ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                        className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                      />
                      <span className="text-sm text-stone-500">
                        {module.lessons.length} lessons
                      </span>
                      <button className="p-2 rounded-lg hover:bg-stone-700 text-stone-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteModule(module.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-stone-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {expandedModules.includes(module.id) && (
                      <div className="p-4 space-y-2">
                        {module.lessons.map((lesson) => {
                          const lessonType = lessonTypes.find((t) => t.type === lesson.type);
                          return (
                            <motion.div
                              key={lesson.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-stone-700/50 hover:bg-stone-700 group"
                            >
                              <GripVertical className="w-4 h-4 text-stone-500 cursor-grab" />
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lessonType?.color}`}>
                                {lessonType && <lessonType.icon className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-stone-400">
                                  {lesson.duration} min
                                </p>
                              </div>
                              <button
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-stone-400 hover:text-red-400 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          );
                        })}

                        <button
                          onClick={() => setShowLessonModal(true)}
                          className="flex items-center gap-2 w-full p-3 rounded-lg border-2 border-dashed border-stone-600 text-stone-400 hover:text-white hover:border-stone-500 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Lesson
                        </button>
                      </div>
                    )}
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2}>
              <Card className="bg-stone-800 border-stone-700">
                <h3 className="text-sm font-semibold text-white mb-4">Course Thumbnail</h3>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-700 flex items-center justify-center cursor-pointer hover:bg-stone-600 transition-colors group">
                  <img
                    src={existingCourse?.thumbnail || "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=250&fit=crop"}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-xs text-stone-400 mt-2">Recommended: 800x500px, JPG or PNG</p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <Card className="bg-stone-800 border-stone-700">
                <h3 className="text-sm font-semibold text-white mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-400 mb-1 block">Category</label>
                    <select className="w-full px-3 py-2 rounded-lg bg-stone-700 border border-stone-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Spiritual Formation</option>
                      <option>Ministry Training</option>
                      <option>Leadership</option>
                      <option>Worship</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 mb-1 block">Level</label>
                    <select className="w-full px-3 py-2 rounded-lg bg-stone-700 border border-stone-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 mb-1 block">Duration</label>
                    <Input
                      value={existingCourse?.duration || "8 weeks"}
                      className="!bg-stone-700 !border-stone-600 !text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 mb-1 block">Instructor</label>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-stone-700">
                      <Avatar 
                        src={existingCourse?.instructorImage} 
                        name={existingCourse?.instructor || "Select Instructor"} 
                        size="sm" 
                      />
                      <span className="text-sm text-white">{existingCourse?.instructor || "Select"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <AnimatedSection delay={0.15}>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-stone-800 border-stone-700">
              <h3 className="text-lg font-semibold text-white mb-6">Course Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-stone-300 mb-2 block">Course Description</label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-stone-700 border border-stone-600 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Describe what students will learn..."
                  />
                </div>
                <div>
                  <label className="text-sm text-stone-300 mb-2 block">Learning Objectives</label>
                  <div className="space-y-2">
                    {["Understand foundational principles", "Apply spiritual practices daily", "Develop intimacy with God"].map((obj, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-stone-700">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-white">{obj}</span>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-stone-600 text-stone-400 hover:text-white hover:border-stone-500 transition-colors w-full">
                      <Plus className="w-4 h-4" />
                      Add Objective
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-stone-800 border-stone-700">
              <h3 className="text-lg font-semibold text-white mb-6">Enrollment Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Allow student enrollment", enabled: true },
                  { label: "Require prerequisites", enabled: false },
                  { label: "Enable certificates", enabled: true },
                  { label: "Allow course reviews", enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-stone-700">
                    <span className="text-sm text-white">{setting.label}</span>
                    <button
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        setting.enabled ? "bg-violet-600" : "bg-stone-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          setting.enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </AnimatedSection>
      )}

      {activeTab === "pricing" && (
        <AnimatedSection delay={0.15}>
          <Card className="bg-stone-800 border-stone-700 max-w-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Course Pricing</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                {[
                  { label: "Free", value: 0 },
                  { label: "Paid", value: 99 },
                ].map((option) => (
                  <button
                    key={option.label}
                    className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                      option.value === 0
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-stone-600 hover:border-stone-500"
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">
                      {option.label === "Free" ? "Free" : `$${option.value}`}
                    </p>
                    <p className="text-sm text-stone-400">
                      {option.label === "Free" ? "No payment required" : "One-time payment"}
                    </p>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm text-stone-300 mb-2 block">Price (USD)</label>
                <Input
                  type="number"
                  value="99"
                  className="!bg-stone-700 !border-stone-600 !text-white"
                  icon={<DollarSign className="w-5 h-5" />}
                />
              </div>
              <div>
                <label className="text-sm text-stone-300 mb-2 block">Discount Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter discount code..."
                    className="!bg-stone-700 !border-stone-600 !text-white"
                  />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      )}

      {activeTab === "preview" && (
        <AnimatedSection delay={0.15}>
          <Card className="bg-stone-800 border-stone-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Course Preview</h3>
              <Badge className="bg-amber-500/10 text-amber-400">Student View</Badge>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-stone-700 flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-16 h-16 text-stone-500 mx-auto mb-4" />
                <p className="text-stone-400">Preview how students will see your course</p>
                <Button variant="secondary" className="mt-4">
                  Launch Preview
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLessonModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-stone-800 rounded-2xl p-6 w-full max-w-md border border-stone-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Add New Lesson</h3>
              <button
                onClick={() => setShowLessonModal(false)}
                className="p-2 rounded-lg hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-stone-300 mb-2 block">Lesson Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {lessonTypes.map((type) => (
                    <button
                      key={type.type}
                      onClick={() => setNewLessonType(type.type as any)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                        newLessonType === type.type
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-stone-600 hover:border-stone-500"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type.color}`}>
                        <type.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-white">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-stone-300 mb-2 block">Lesson Title</label>
                <Input
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Enter lesson title..."
                  className="!bg-stone-700 !border-stone-600 !text-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowLessonModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => addLesson(expandedModules[0])}>
                  Add Lesson
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Publish Modal */}
      {publishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPublishModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">Ready to Publish?</h3>
              <p className="text-stone-500 mb-6">
                Your course will be visible to all students. You can always edit it later.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setPublishModal(false)}>
                  Save as Draft
                </Button>
                <Button className="flex-1" onClick={() => setPublishModal(false)}>
                  Publish Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
