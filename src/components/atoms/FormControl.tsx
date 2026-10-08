"use client";

import { styled } from "@/styles";

// Appearance belongs to the atoms. Pages define only field arrangement.
const control = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 16px",
  border: "1px solid var(--colors-border)",
  borderRadius: "var(--radii-lg)",
  background: "var(--colors-backgroundSecondary)",
  color: "var(--colors-text)",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-sm)",
  lineHeight: "1.5",
  outline: "none",
  "&::placeholder": { color: "var(--colors-textMuted)", opacity: 1 },
  "&:focus": { borderColor: "var(--colors-primaryLight)", boxShadow: "var(--shadows-focusSoft)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  '&[aria-invalid="true"]': { borderColor: "var(--colors-negative)" },
};

export const SelectControl = styled("select", control);
export const TextareaControl = styled("textarea", {
  ...control,
  minHeight: "110px",
  resize: "vertical",
});

export const ControlError = styled("p", {
  margin: "6px 0 0",
  color: "var(--colors-negative)",
  fontSize: "var(--fontSizes-xs)",
  lineHeight: "1.5",
});
