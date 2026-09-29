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
            backgroundColor: "var(--colors-primary)",
            color: "#FFFFFF",
          }
        : variant === "tertiary"
          ? {
              backgroundColor: "var(--colors-primaryLight)",
              color: "#FFFFFF",
            }
          : variant === "secondary"
            ? {
                backgroundColor: "var(--colors-backgroundSecondary)",
                border: "1px solid var(--colors-border)",
                color: "var(--colors-text)",
              }
            : variant === "danger"
              ? {
                  backgroundColor: "var(--colors-negative)",
                  color: "#FFFFFF",
                }
              : variant === "danger-ghost"
                ? {
                    backgroundColor: "transparent",
                    border: "1px solid $var(--colors-negative)",
                    color: "var(--colors-negative)",
                  }
                : variant === "success-ghost"
                  ? {
                      backgroundColor: "var(--colors-positiveBackground)",
                      border: "1px solid var(--colors-positive)",
                      color: "var(--colors-positive)",
                    }
                  : {
                      backgroundColor: "transparent",
                      border: "1px solid transparent",
                      color: "var(--colors-textSecondary)",
                    };

    const sizeStyle: CSSProperties =
      size === "sm"
        ? {
            height: "32px",
            padding: "0 12px",
            fontSize: "13px",
            borderRadius: "var(--radii-lg)",
          }
        : {
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "var(--radii-lg)",
          };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`btn-${variant} ${className}`}
        style={{
          ...variantStyle,
          ...sizeStyle,
          width: fullWidth ? "100%" : "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          whiteSpace: "nowrap",
          fontWeight: 600,
          fontFamily: "inherit",
          border: variantStyle.border ?? "1px solid transparent",
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
          transition: "all 200ms ease",
          opacity: disabled || isLoading ? 0.5 : 1,
          ...style,
        }}
        {...props}
      >
        {isLoading ? <span>{loadingLabel}</span> : children}

        <style jsx>{`
          button {
            outline: none;
          }

          button:focus-visible {
            box-shadow: 0 0 0 3px var(--colors-primaryLight);
          }

          button:not(:disabled):hover {
            transform: scale(1.01);
            opacity: 0.95;
          }

          button:not(:disabled):active {
            transform: scale(0.99);
          }

          .btn-secondary:not(:disabled):hover {
            border-color: var(--colors-textMuted);
            background-color: var(--colors-border);
          }

          .btn-ghost:not(:disabled):hover {
            color: var(--colors-primary);
            background-color: var(--colors-backgroundSecondary);
          }

          .btn-danger-ghost:not(:disabled):hover {
            background-color: var(--colors-negative);
            color: #ffffff;
          }

          .btn-success-ghost:not(:disabled):hover {
            background-color: var(--colors-positive);
            color: #ffffff;
          }
        `}</style>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
