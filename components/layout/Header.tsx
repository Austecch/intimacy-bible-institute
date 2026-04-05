"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Our Mission", href: "/about#mission" },
      { label: "Our Vision", href: "/about#vision" },
      { label: "The Mandate", href: "/about#mandate" },
      { label: "Leadership", href: "/about#leadership" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    dropdown: [
      { label: "All Courses", href: "/programs" },
      { label: "Spiritual Formation", href: "/programs?category=spiritual" },
      { label: "Ministry Training", href: "/programs?category=ministry" },
      { label: "Leadership", href: "/programs?category=leadership" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    dropdown: [
      { label: "Sermons", href: "/media?sermons" },
      { label: "Teachings", href: "/media?teachings" },
      { label: "Videos", href: "/media?videos" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-soft" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900 dark:text-white tracking-tight">Intimacy Bible</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400">Institute</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <button
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-violet-600"
                        : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-stone-800 rounded-xl shadow-lifted border border-stone-100 dark:border-stone-700 p-2"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/admissions">
              <Button variant="primary">Apply Now</Button>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-left text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pl-4 mt-1 space-y-1"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-stone-500 dark:text-stone-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`block px-4 py-3 rounded-xl ${
                        pathname === item.href
                          ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-medium"
                          : "text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/admissions">
                  <Button variant="primary" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
