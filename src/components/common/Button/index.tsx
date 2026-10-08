"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { StyledButton } from "./styles";

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
      children,
      disabled,
      isLoading,
      loadingLabel = "Loading...",
      type = "button",
      variant = "primary",
      size = "md",
      fullWidth = true,
      ...props
    },
    ref,
  ) => (
    <StyledButton
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <span>{loadingLabel}</span> : children}
    </StyledButton>
  ),
);

Button.displayName = "Button";

export default Button;
