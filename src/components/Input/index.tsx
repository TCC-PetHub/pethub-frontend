"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Eye, EyeOff, Upload } from "lucide-react";

import {
  Container,
  ErrorMessage,
  Field,
  FileButton,
  FileContent,
  FileHint,
  FileNames,
  IconSlot,
  PasswordToggle,
  Wrapper,
} from "./styles";

interface CommonInputProps {
  error?: string;
  variant?: "default" | "compact";
  icon?: ReactNode;
  fileLabel?: string;
  fileHint?: string;
}

export type FileInputProps = CommonInputProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue"
  > & {
    type: "file";
    value?: never;
    defaultValue?: never;
  };

export type StandardInputProps = CommonInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?:
      | "button"
      | "checkbox"
      | "color"
      | "date"
      | "datetime-local"
      | "email"
      | "hidden"
      | "image"
      | "month"
      | "number"
      | "password"
      | "radio"
      | "range"
      | "reset"
      | "search"
      | "submit"
      | "tel"
      | "text"
      | "time"
      | "url"
      | "week";
  };

export type InputProps = FileInputProps | StandardInputProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className,
      id,
      type = "text",
      style,
      variant = "default",
      icon,
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
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const description =
      [describedBy, error ? errorId : null, isFile && fileHint ? hintId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    useEffect(() => {
      if (!isFile) return;

      const form = localRef.current?.form;
      const reset = () => setFileNames([]);

      form?.addEventListener("reset", reset);
      return () => form?.removeEventListener("reset", reset);
    }, [isFile]);

    return (
      <Container>
        <Wrapper
          file={isFile}
          invalid={isFile && !!error}
          disabled={isFile && !!props.disabled}
        >
          {!isFile && icon && <IconSlot aria-hidden>{icon}</IconSlot>}

          <Field
            id={inputId}
            ref={(element) => {
              localRef.current = element;
              if (typeof ref === "function") ref(element);
              else if (ref) ref.current = element;
            }}
            type={inputType}
            suppressHydrationWarning
            className={className}
            style={style}
            compact={variant === "compact"}
            hasIcon={!!icon}
            hasToggle={isPassword}
            invalid={!!error}
            native={isFile}
            {...props}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={description}
            onChange={(event) => {
              if (isFile) {
                setFileNames(
                  Array.from(event.target.files ?? [], (file) => file.name),
                );
              }
              onChange?.(event);
            }}
            onReset={onReset}
          />

          {isFile && (
            <FileContent aria-hidden>
              <FileButton>
                <Upload size={17} />
                {fileLabel}
              </FileButton>
              <FileNames>
                {fileNames.length
                  ? fileNames.join(", ")
                  : "Nenhum arquivo selecionado"}
              </FileNames>
            </FileContent>
          )}

          {isPassword && (
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
              suppressHydrationWarning
            >
              {showPassword ? (
                <EyeOff size={20} aria-hidden />
              ) : (
                <Eye size={20} aria-hidden />
              )}
            </PasswordToggle>
          )}
        </Wrapper>

        {isFile && fileHint && <FileHint id={hintId}>{fileHint}</FileHint>}

        {error && (
          <ErrorMessage id={errorId} role="alert">
            {error}
          </ErrorMessage>
        )}
      </Container>
    );
  },
);

Input.displayName = "Input";

export default Input;
