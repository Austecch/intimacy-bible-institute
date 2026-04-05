"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof courses>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const stored = localStorage.getItem("recent_searches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = courses.filter(
        c =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.instructor.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (courseId: string) => {
    const searches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    localStorage.setItem("recent_searches", JSON.stringify(searches));
    router.push(`/dashboard/courses/${courseId}`);
    onClose();
    setQuery("");
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lifted overflow-hidden mx-4">
              <div className="flex items-center gap-3 p-4 border-b border-stone-200 dark:border-stone-700">
                <Search className="w-5 h-5 text-stone-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, lessons, instructors..."
                  className="flex-1 bg-transparent text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {query.length === 0 && recentSearches.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Recent searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => handleRecentClick(term)}
                          className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-sm rounded-full hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    {results.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => handleSelect(course.id)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-left"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-stone-900 dark:text-white truncate">
                            {course.title}
                          </p>
                          <p className="text-sm text-stone-500">{course.instructor}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {query.length > 1 && results.length === 0 && (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
                    <p className="text-stone-500">No results found for "{query}"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
