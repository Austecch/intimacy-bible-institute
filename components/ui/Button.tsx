"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      loading,
      children,
      disabled,
      type = "button",
      onClick,
    },
    ref
  ) => {
    const variants = {
      primary: "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-glow",
      secondary:
        "bg-white text-violet-600 border border-violet-200 hover:border-violet-300 hover:bg-violet-50",
      ghost: "text-stone-600 hover:text-stone-900 hover:bg-stone-100",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3",
      lg: "px-8 py-4 text-lg",
    };

    const iconSizes = {
      sm: 16,
      md: 18,
      lg: 20,
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200",
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width={iconSizes[size]}
            height={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="10"
              opacity="0.3"
            />
            <path
              d="M12 2C6.48 2 2 6.48 2 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : Icon && iconPosition === "left" ? (
          <Icon size={iconSizes[size]} />
        ) : null}
        {children}
        {!loading && Icon && iconPosition === "right" && (
          <Icon size={iconSizes[size]} />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
