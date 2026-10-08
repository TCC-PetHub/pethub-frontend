"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState, useId, useRef, useEffect } from "react";

import { Eye, EyeOff, Upload } from "lucide-react";

interface CommonInputProps {
  error?: string;
  variant?: "default" | "compact";
  icon?: ReactNode;
  containerClassName?: string;
  fileLabel?: string;
  fileHint?: string;
}

export type FileInputProps = CommonInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue"> & {
    type: "file";
    value?: never;
    defaultValue?: never;
  };

export type StandardInputProps = CommonInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
  };
export type InputProps = FileInputProps | StandardInputProps;

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
      containerClassName = "",
      fileLabel = "Selecionar arquivo",
      fileHint,
      onChange,
      onReset,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const localRef = useRef<HTMLInputElement | null>(null);
    const isFile = type === "file";
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const description = [describedBy, error ? errorId : null, isFile && fileHint ? hintId : null].filter(Boolean).join(" ") || undefined;

    useEffect(() => {
      if (!isFile) return;
      const form = localRef.current?.form;
      const reset = () => setFileNames([]);
      form?.addEventListener("reset", reset);
      return () => form?.removeEventListener("reset", reset);
    }, [isFile]);

    const isPassword = type === "password";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`input-container pethub-input-container ${containerClassName}`}>
        <div className={`input-wrapper pethub-input-control ${isFile ? "file-wrapper" : ""} ${isFile && error ? "file-error" : ""} ${props.disabled ? "is-disabled" : ""}`}>
          {!isFile && icon && (
            <span className="input-icon pethub-input-icon" aria-hidden="true">
              {icon}
            </span>
          )}

          <input
            id={inputId}
            ref={(element) => {
              localRef.current = element;
              if (typeof ref === "function") ref(element);
              else if (ref) ref.current = element;
            }}
            type={inputType}
            suppressHydrationWarning
            className={`
              input-field pethub-input
              ${variant === "compact" ? "input-compact" : ""}
              ${variant === "compact" ? "pethub-input--compact" : ""}
              ${icon ? "input-with-icon" : ""}
              ${icon ? "pethub-input--with-icon" : ""}
              ${isPassword ? "input-with-password" : ""}
              ${isPassword ? "pethub-input--with-password" : ""}
              ${error ? "input-error" : ""}
              ${error ? "pethub-input--error" : ""}
              ${isFile ? "file-native" : ""}
              ${className}
            `}
            style={style}
            {...props}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={description}
            onChange={(event) => {
              if (isFile) setFileNames(Array.from(event.target.files ?? [], (file) => file.name));
              onChange?.(event);
            }}
            onReset={onReset}
          />

          {isFile && (
            <div className="file-content" aria-hidden="true">
              <span className="file-button"><Upload size={17} />{fileLabel}</span>
              <span className="file-names">{fileNames.length ? fileNames.join(", ") : "Nenhum arquivo selecionado"}</span>
            </div>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
              suppressHydrationWarning
              className="password-toggle pethub-input-password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {isFile && fileHint && <p id={hintId} className="file-hint">{fileHint}</p>}
        {error && (
          <p id={errorId} className="input-error-message pethub-input-error-message" role="alert">
            {error}
          </p>
        )}

        <style jsx>{`
          .input-container,
          .pethub-input-container {
            width: 100%;
          }

          .input-wrapper,
          .pethub-input-control {
            position: relative;
            width: 100%;
          }

          .file-wrapper {
            border: 1px dashed var(--colors-borderStrong);
            border-radius: var(--radii-input);
            background: var(--colors-backgroundSecondary);
          }
          .file-wrapper:focus-within {
            border-color: var(--colors-primaryLight);
            box-shadow: var(--shadows-focusSoft);
          }
          .file-wrapper.file-error { border-color: var(--colors-negative); }
          .file-wrapper.is-disabled { opacity: 0.5; }
          .input-field.file-native,
          .pethub-input.file-native {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
            cursor: pointer;
          }
          .input-field.file-native:disabled,
          .pethub-input.file-native:disabled { cursor: not-allowed; }
          .file-content { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 12px; }
          .file-button { display: inline-flex; align-items: center; gap: 8px; color: var(--colors-primaryLight); font-size: var(--fontSizes-sm); }
          .file-names { color: var(--colors-textMuted); font-size: var(--fontSizes-xs); overflow-wrap: anywhere; }
          .file-hint { margin: 6px 0 0; color: var(--colors-textMuted); font-size: var(--fontSizes-xs); }

          .input-field,
          .pethub-input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            padding: 12px 16px;
            border: 1px solid var(--colors-border);
            border-radius: var(--radii-lg);
            background-color: var(--colors-backgroundSecondary);
            color: var(--colors-text);
            font-family: inherit;
            font-size: var(--fontSizes-sm);
            line-height: 1.5;
            outline: none;
            transition:
              border-color 200ms ease,
              box-shadow 200ms ease,
              background-color 200ms ease;
          }

          .input-field::placeholder,
          .pethub-input::placeholder {
            color: var(--colors-textMuted);
            opacity: 1;
          }

          .input-field:focus,
          .pethub-input:focus {
            border-color: var(--colors-primaryLight);
            box-shadow: var(--shadows-focusSoft);
          }

          .input-field:disabled,
          .pethub-input:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .input-field.input-compact,
          .pethub-input.pethub-input--compact {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .input-field.input-with-icon,
          .pethub-input.pethub-input--with-icon {
            padding-left: 40px;
          }

          .input-field.input-with-password,
          .pethub-input.pethub-input--with-password {
            padding-right: 48px;
          }

          .input-field.input-error,
          .pethub-input.pethub-input--error {
            border-color: var(--colors-negative);
          }

          .input-field.input-error:focus,
          .pethub-input.pethub-input--error:focus {
            border-color: var(--colors-negative);
            box-shadow: var(--shadows-focusNegative);
          }

          .input-icon,
          .pethub-input-icon {
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

          .password-toggle,
          .pethub-input-password-toggle {
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

          .password-toggle:hover,
          .pethub-input-password-toggle:hover {
            color: var(--colors-text);
          }

          .password-toggle:focus-visible,
          .pethub-input-password-toggle:focus-visible {
            outline: 2px solid var(--colors-primaryLight);
            outline-offset: -4px;
            border-radius: var(--radii-md);
          }

          .input-error-message,
          .pethub-input-error-message {
            margin-top: 6px;
            color: var(--colors-negative);
            font-size: var(--fontSizes-xs);
            line-height: 1.5;
          }

          @media (min-width: 640px) {
            .input-error-message,
            .pethub-input-error-message {
              font-size: var(--fontSizes-sm);
            }
          }
        `}</style>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
