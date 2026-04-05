"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>
        
        {error.digest && (
          <p className="text-xs text-stone-400 dark:text-stone-500 mb-6">
            Error code: {error.digest}
          </p>
        )}
        
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            icon={RefreshCw}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="ghost" icon={Home}>
              Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
