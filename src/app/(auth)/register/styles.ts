import Link from "next/link";

import { styled } from "@/styles";

export const Container = styled("main", {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  overflowY: "auto",
  padding: "$md",
  backgroundColor: "$backgroundSecondary",
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

export const Brand = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$sm",
  marginBottom: "$md",
});

export const BrandLogo = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "$lg",
  backgroundColor: "$primaryLight",
  color: "#FFFFFF",
});

export const BrandText = styled("div", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.2,

  strong: {
    color: "$text",
    fontSize: "$lg",
    fontWeight: 700,
  },

  span: {
    color: "$textMuted",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
});

export const Tabs = styled("nav", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$xs",
  padding: "$xs",
  marginBottom: "$md",
  borderRadius: "$lg",
  backgroundColor: "$backgroundSecondary",
});

export const Tab = styled(Link, {
  padding: "8px 0",
  borderRadius: "$md",
  color: "$textSecondary",
  fontSize: "$sm",
  fontWeight: 500,
  textAlign: "center",
  textDecoration: "none",
  transition: "all 200ms ease",

  "&:hover": {
    color: "$text",
  },

  variants: {
    active: {
      true: {
        backgroundColor: "$background",
        boxShadow: "$sm",
        color: "$text",
        fontWeight: 600,
      },
    },
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
