"use client";
import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { SelectControl, ControlError } from "@/components/FormControl";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, id, "aria-describedby": description, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div style={{ display: "contents" }}>
      <SelectControl
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
});
export default Select;
