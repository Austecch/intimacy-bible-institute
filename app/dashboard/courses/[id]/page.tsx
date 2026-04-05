"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause,
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Users, 
  Star,
  CheckCircle2,
  FileText,
  Download,
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Save,
  MessageSquare,
  FolderOpen
} from "lucide-react";
import { Card, ProgressBar } from "@/components/ui/Card";
import { LessonItem } from "@/components/ui/CourseCard";
import { Badge, Avatar } from "@/components/ui/Elements";
import { courses } from "@/lib/data";
import { formatDuration } from "@/lib/utils";

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

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const [lessonNotes, setLessonNotes] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  const course = courses.find(c => c.id === params.id);
  
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto text-center py-16">
        <h1 className="text-2xl font-semibold text-stone-900 mb-4">Course not found</h1>
        <Link href="/dashboard/courses" className="text-violet-600 hover:text-violet-700">
          Back to courses
        </Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons[activeLesson];
  const completedLessons = allLessons.filter(l => l.completed).length;
  const progress = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  const handlePreviousLesson = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1);
      setCurrentTime(0);
      setIsPlaying(false);
      setAutoSaveStatus("saving");
      setTimeout(() => setAutoSaveStatus("saved"), 1000);
    }
  };

  const handleNextLesson = () => {
    if (activeLesson < allLessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setCurrentTime(0);
      setIsPlaying(false);
      setAutoSaveStatus("saving");
      setTimeout(() => setAutoSaveStatus("saved"), 1000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleMarkComplete = () => {
    setAutoSaveStatus("saving");
    setTimeout(() => setAutoSaveStatus("saved"), 1000);
  };

  useEffect(() => {
    setAutoSaveStatus("idle");
    setLessonNotes("");
  }, [activeLesson]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <AnimatedSection className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/dashboard/courses"
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">{course.title}</h1>
            <p className="text-stone-500">{course.instructor}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {autoSaveStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-sm text-stone-500"
              >
                <Save className={`w-4 h-4 ${autoSaveStatus === "saving" ? "animate-pulse" : "text-emerald-500"}`} />
                <span>{autoSaveStatus === "saving" ? "Saving..." : "Saved"}</span>
              </motion.div>
            )}
          </div>
        </div>
        <ProgressBar value={progress} showLabel />
      </AnimatedSection>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <AnimatedSection>
            <Card className="!p-0 overflow-hidden">
              <div 
                className="relative aspect-video bg-stone-900 group"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* Placeholder video area - in production would be actual video */}
                <div className="absolute inset-0 bg-stone-800">
                  <Image
                    src={course.thumbnail}
                    alt={currentLesson?.title || course.title}
                    fill
                    className="object-cover opacity-60"
                  />
                </div>

                {/* Fake video element for controls demo */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={course.thumbnail}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Center Play Button */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <button 
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-all hover:scale-105 shadow-lg"
                      >
                        <Play className="w-8 h-8 text-stone-900 ml-1" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controls Overlay */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col justify-end"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                      
                      {/* Controls */}
                      <div className="relative p-4 space-y-3">
                        {/* Progress bar */}
                        <div 
                          ref={progressRef}
                          onClick={handleProgressClick}
                          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer group/progress"
                        >
                          <div 
                            className="h-full bg-violet-500 rounded-full relative"
                            style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow" />
                          </div>
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={togglePlay}
                              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                            </button>
                            
                            <button 
                              onClick={handlePreviousLesson}
                              disabled={activeLesson === 0}
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <SkipBack className="w-5 h-5" />
                            </button>
                            
                            <button 
                              onClick={handleNextLesson}
                              disabled={activeLesson === allLessons.length - 1}
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <SkipForward className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2 ml-2">
                              <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                              />
                            </div>

                            <span className="text-sm ml-3">
                              {formatTime(currentTime)} / {formatTime(duration || currentLesson?.duration || 0)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <button 
                                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
                              >
                                <Settings className="w-5 h-5" />
                                <span className="text-sm">{playbackSpeed}x</span>
                              </button>
                              <AnimatePresence>
                                {showSpeedMenu && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full mb-2 right-0 bg-stone-800 rounded-lg overflow-hidden shadow-xl"
                                  >
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                      <button
                                        key={speed}
                                        onClick={() => handleSpeedChange(speed)}
                                        className={`w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${
                                          playbackSpeed === speed ? "text-violet-400" : "text-white"
                                        }`}
                                      >
                                        {speed}x
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                              <Maximize className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </AnimatedSection>

          {/* Lesson Info */}
          <AnimatedSection delay={0.1}>
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900 mb-1">
                    {currentLesson?.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(currentLesson?.duration || 0)}
                    </span>
                    <Badge>{currentLesson?.type}</Badge>
                  </div>
                </div>
                {currentLesson?.completed ? (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                  </Badge>
                ) : (
                  <button 
                    onClick={handleMarkComplete}
                    className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-stone-100 mb-6">
                {[
                  { id: "Overview", icon: BookOpen },
                  { id: "Notes", icon: MessageSquare },
                  { id: "Resources", icon: FolderOpen },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-violet-600 border-b-2 border-violet-600"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.id}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "Overview" && (
                    <div className="space-y-4">
                      <p className="text-stone-600 leading-relaxed">
                        In this lesson, you'll explore the foundational principles of {currentLesson?.title.toLowerCase()}. 
                        Through careful study of Scripture and practical application, you'll develop a deeper understanding 
                        of how this concept applies to your daily walk with God.
                      </p>
                      <p className="text-stone-600 leading-relaxed">
                        This teaching is part of the "{course.title}" course designed to help you grow in your relationship 
                        with God. Take notes, reflect on the concepts, and apply what you learn to your life.
                      </p>
                    </div>
                  )}

                  {activeTab === "Notes" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-stone-900">Your Notes</h4>
                        <span className="text-xs text-stone-400">Auto-saved</span>
                      </div>
                      <textarea
                        value={lessonNotes}
                        onChange={(e) => {
                          setLessonNotes(e.target.value);
                          setAutoSaveStatus("saving");
                          setTimeout(() => setAutoSaveStatus("saved"), 1000);
                        }}
                        placeholder="Write your notes here... Take time to journal what you're learning and how it applies to your life."
                        className="w-full h-64 p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 resize-none"
                      />
                    </div>
                  )}

                  {activeTab === "Resources" && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-stone-900 mb-4">Downloadable Resources</h4>
                      {[
                        { name: "Lesson Transcript (PDF)", size: "2.4 MB" },
                        { name: "Study Guide (PDF)", size: "1.8 MB" },
                        { name: "Discussion Questions (PDF)", size: "0.5 MB" },
                      ].map((resource, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-violet-600" />
                            <div>
                              <p className="font-medium text-stone-900">{resource.name}</p>
                              <p className="text-sm text-stone-500">{resource.size}</p>
                            </div>
                          </div>
                          <Download className="w-5 h-5 text-stone-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card>
          </AnimatedSection>

          {/* Navigation */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePreviousLesson}
                disabled={activeLesson === 0}
                className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Lesson
              </button>
              <button 
                onClick={handleNextLesson}
                disabled={activeLesson === allLessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next Lesson
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info */}
          <AnimatedSection delay={0.1}>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={course.instructorImage} name={course.instructor} size="lg" />
                <div>
                  <p className="font-medium text-stone-900">{course.instructor}</p>
                  <p className="text-sm text-stone-500">Instructor</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrolled.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {course.rating}
                </span>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Get Certificate</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download All Resources</span>
                </button>
              </div>
            </Card>
          </AnimatedSection>

          {/* Course Content */}
          <AnimatedSection delay={0.2}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">Course Content</h3>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1 rounded hover:bg-stone-100 transition-colors"
                >
                  <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-90" : ""}`} />
                </button>
              </div>
              
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="mb-4">
                  <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl mb-2">
                    <BookOpen className="w-4 h-4 text-violet-600" />
                    <span className="font-medium text-stone-900">{module.title}</span>
                    <span className="text-xs text-stone-400 ml-auto">{module.lessons.length} lessons</span>
                  </div>
                  {sidebarOpen && (
                    <div className="space-y-1 ml-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const globalIndex = course.modules
                          .slice(0, moduleIndex)
                          .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex;
                        
                        return (
                          <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            index={lessonIndex}
                            isActive={globalIndex === activeLesson}
                            onClick={() => setActiveLesson(globalIndex)}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
