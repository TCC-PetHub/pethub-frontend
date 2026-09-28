"use client";

import { ButtonHTMLAttributes, forwardRef, type CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingLabel?: string;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "danger"
    | "danger-ghost"
    | "success-ghost";
  size?: "sm" | "md";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      disabled,
      isLoading,
      loadingLabel = "Loading...",
      type = "button",
      variant = "primary",
      size = "md",
      fullWidth = true,
      style,
      ...props
    },
    ref,
  ) => {
    const variantStyle: CSSProperties =
      variant === "primary"
        ? {
            background:
              "linear-gradient(to right, var(--color-primary), var(--color-brand))",
            color: "#fff",
          }
        : variant === "tertiary"
          ? { backgroundColor: "var(--color-brand)", color: "#fff" }
          : variant === "secondary"
            ? {
                backgroundColor: "var(--color-surface-input)",
                border: "1px solid var(--color-border-subtle)",
                color: "#fff",
              }
            : variant === "danger"
              ? {
                  backgroundColor: "var(--color-danger, #dc2626)",
                  color: "#fff",
                }
              : variant === "danger-ghost"
                ? {
                    backgroundColor: "transparent",
                    border: "1px solid var(--color-danger, #dc2626)",
                    color: "var(--color-danger, #dc2626)",
                  }
                : variant === "success-ghost"
                  ? {
                      backgroundColor: "var(--color-success-bg)",
                      border: "1px solid var(--color-success-light)",
                      color: "var(--color-success-light)",
                    }
                  : {
                      backgroundColor: "transparent",
                      border: "1px solid transparent",
                      color: "var(--text-secondary)",
                    };

    const sizeClass =
      size === "sm"
        ? "h-8 px-3 text-[13px] rounded-lg"
        : "px-4 py-3 text-sm rounded-xl";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        suppressHydrationWarning
        className={`btn-${variant} ${fullWidth ? "w-full" : "w-auto"} ${sizeClass} inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-semibold transition duration-200 cursor-pointer hover:scale-[1.01] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-default disabled:hover:scale-100 focus:outline-none ${className}`}
        style={{ ...variantStyle, ...style }}
        {...props}
      >
        {isLoading ? <span>{loadingLabel}</span> : children}

        <style jsx>{`
          button:focus-visible {
            box-shadow: 0 0 0 2px var(--color-focus-ring);
          }

          .btn-secondary:hover {
            border-color: var(--color-border-hover);
            background-color: var(--color-surface-subtle);
          }

          .btn-ghost:hover {
            color: #fff;
          }

          .btn-danger-ghost:hover {
            background-color: var(--color-danger, #dc2626);
            color: #fff;
          }

          .btn-success-ghost:hover {
            background-color: var(--color-success-light);
            color: #0a0a0a;
          }
        `}</style>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
