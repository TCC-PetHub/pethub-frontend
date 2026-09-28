"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variant?: "default" | "compact";
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className = "",
      id,
      type = "text",
      style,
      variant = "default",
      icon,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="input-container">
        <div className="input-wrapper">
          {icon && (
            <span className="input-icon" aria-hidden="true">
              {icon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            type={inputType}
            suppressHydrationWarning
            className={`
              input-field
              ${variant === "compact" ? "input-compact" : ""}
              ${icon ? "input-with-icon" : ""}
              ${isPassword ? "input-with-password" : ""}
              ${error ? "input-error" : ""}
              ${className}
            `}
            style={style}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              aria-pressed={showPassword}
              suppressHydrationWarning
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && (
          <p id={`${id}-error`} className="input-error-message">
            {error}
          </p>
        )}

        <style jsx>{`
          .input-container {
            width: 100%;
          }

          .input-wrapper {
            position: relative;
            width: 100%;
          }

          .input-field {
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding: 12px 16px;
            border: 1px solid var(--colors-border);
            border-radius: var(--radii-lg);
            background-color: var(--colors-backgroundSecondary);
            color: var(--colors-text);
            font-family: inherit;
            font-size: 14px;
            line-height: 1.5;
            outline: none;
            transition:
              border-color 200ms ease,
              box-shadow 200ms ease,
              background-color 200ms ease;
          }

          .input-field::placeholder {
            color: var(--colors-textMuted);
            opacity: 1;
          }

          .input-field:focus {
            border-color: var(--colors-primaryLight);
            box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12);
          }

          .input-field:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .input-field.input-compact {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .input-field.input-with-icon {
            padding-left: 40px;
          }

          .input-field.input-with-password {
            padding-right: 48px;
          }

          .input-field.input-error {
            border-color: var(--colors-negative);
          }

          .input-field.input-error:focus {
            border-color: var(--colors-negative);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
          }

          .input-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--colors-textMuted);
            pointer-events: none;
          }

          .password-toggle {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 16px;
            border: none;
            background: transparent;
            color: var(--colors-textMuted);
            cursor: pointer;
            transition: color 200ms ease;
          }

          .password-toggle:hover {
            color: var(--colors-text);
          }

          .password-toggle:focus-visible {
            outline: 2px solid var(--colors-primaryLight);
            outline-offset: -4px;
            border-radius: var(--radii-md);
          }

          .input-error-message {
            margin-top: 6px;
            color: var(--colors-negative);
            font-size: 12px;
            line-height: 1.5;
          }

          @media (min-width: 640px) {
            .input-error-message {
              font-size: 14px;
            }
          }
        `}</style>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
