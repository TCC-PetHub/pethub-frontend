import Link from "next/link";

import { keyframes, styled } from "@/styles";

export const Container = styled("main", {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  overflowY: "auto",
  padding: "$md",
  backgroundColor:
    "color-mix(in srgb, var(--colors-adoptedBackground) 35%, var(--colors-background))",
  fontFamily: "$sans",

  "&, & *": {
    boxSizing: "border-box",
  },

  "@sm": {
    padding: "$xl $md",
  },
});

export const Card = styled("section", {
  width: "100%",
  maxWidth: 400,
  margin: "auto",
  padding: "$lg $md",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "$lg",

  "@sm": {
    padding: "$lg",
  },
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$md",
});

export const Field = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const Label = styled("label", {
  color: "$text",
  fontSize: 13,
  fontWeight: 600,
});

export const Hint = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: 11,
});

export const ErrorMessage = styled("p", {
  margin: 0,
  color: "$negative",
  fontSize: "$xs",
});

export const TypeToggle = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$sm",
});

export const TypeOption = styled("button", {
  padding: "8px 12px",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    borderColor: "$textMuted",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 3px $colors$primaryLight",
  },

  variants: {
    active: {
      true: {
        borderColor: "$primaryLight",
        backgroundColor: "$adoptedBackground",
        color: "$primary",
        fontWeight: 600,
      },
    },
  },
});

export const Row = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 72px",
  gap: "$sm",

  "@sm": {
    gridTemplateColumns: "1fr 88px",
    gap: "$md",
  },
});

export const Consent = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$sm",
  color: "$textSecondary",
  fontSize: 11,
  lineHeight: 1.5,
  cursor: "pointer",

  input: {
    appearance: "none",
    flexShrink: 0,
    width: 16,
    height: 16,
    margin: "1px 0 0",
    border: "1.5px solid $textMuted",
    borderRadius: "$sm",
    backgroundColor: "$background",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "12px",
    cursor: "pointer",
    transition: "all 200ms ease",

    "&:checked": {
      borderColor: "$primaryLight",
      backgroundColor: "$primaryLight",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3.5 8.5 6.5 11.5 12.5 4.5'/%3E%3C/svg%3E\")",
    },

    "&:focus-visible": {
      outline: "none",
      boxShadow: "0 0 0 3px $colors$adoptedBackground",
    },
  },

  a: {
    color: "$primaryLight",
    fontWeight: 600,
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const PendingBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$md",
  padding: "$md 0 $sm",
  textAlign: "center",
});

const flip = keyframes({
  "0%, 40%": { transform: "rotate(0deg)" },
  "60%, 100%": { transform: "rotate(180deg)" },
});

export const PendingIcon = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 96,
  height: 96,
  borderRadius: "50%",
  backgroundColor: "$adoptedBackground",
  color: "$primary",

  svg: {
    animation: `${flip} 2s ease-in-out infinite`,

    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const PendingTitle = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: 18,
  fontWeight: 700,
});

export const PendingText = styled("p", {
  margin: 0,
  maxWidth: 300,
  color: "$textSecondary",
  fontSize: 13,
  lineHeight: 1.6,
});

export const BackLink = styled(Link, {
  marginTop: "$sm",
  padding: "10px 20px",
  border: "1px solid $primaryLight",
  borderRadius: "$lg",
  color: "$primary",
  fontSize: 13,
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$adoptedBackground",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 3px $colors$primaryLight",
  },
});
