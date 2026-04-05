"use client";

import { cn } from "@/lib/utils";
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
      primary: "bg-stone-900 text-white hover:bg-stone-800",
      secondary: "bg-white text-stone-900 border border-stone-200 hover:border-stone-300 hover:bg-stone-50",
      ghost: "text-stone-600 hover:text-stone-900 hover:bg-stone-100",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-5 py-2.5 text-sm rounded-md",
      lg: "px-6 py-3 text-base rounded-lg",
    };

    const iconSizes = {
      sm: 16,
      md: 18,
      lg: 20,
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors",
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
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
