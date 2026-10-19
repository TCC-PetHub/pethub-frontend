"use client";
import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { TextareaControl, ControlError } from "@/components/common/FormControl";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { error, id, "aria-describedby": description, ...props },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div style={{ width: "100%" }}>
        <TextareaControl
          {...props}
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [description, error ? `${inputId}-error` : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        {error && (
          <ControlError id={`${inputId}-error`} role="alert">
            {error}
          </ControlError>
        )}
      </div>
    );
  },
);
export default Textarea;
