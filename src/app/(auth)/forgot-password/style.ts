import Link from "next/link";

import { globalCss, styled } from "@/styles";

export const resetGlobal = globalCss({
  "*, *::before, *::after": { boxSizing: "border-box" },
  "html, body": { margin: 0, padding: 0 },
});

export const Container = styled("main", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  boxSizing: "border-box",
  padding: "$md",
  fontFamily: "$sans",
  backgroundColor: "$backgroundSecondary",

  "@supports (min-height: 100dvh)": {
    minHeight: "100dvh",
  },

  "@sm": {
    padding: "$xl $md",
  },
});

export const Card = styled("section", {
  width: "100%",
  maxWidth: 448,
  padding: "$lg $md",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "$lg",

  "@sm": {
    padding: "$xl $lg",
  },
});

export const Brand = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$sm",
  marginBottom: "$md",

  "@sm": {
    gap: "$md",
    marginBottom: "$lg",
  },
});

export const BrandLogo = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "$lg",
  backgroundColor: "$primaryLight",
  color: "#FFFFFF",
});

export const BrandText = styled("div", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.2,

  strong: {
    color: "$primaryLight",
    fontSize: "$md",
    fontWeight: 700,

    "@sm": {
      fontSize: "$lg",
    },
  },

  span: {
    color: "$textMuted",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
});

export const Description = styled("p", {
  margin: 0,
  marginBottom: "$lg",
  color: "$textSecondary",
  fontSize: "$sm",
  lineHeight: 1.5,
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
  fontSize: "$sm",
  fontWeight: 600,
});

export const BackLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$xs",
  minHeight: 44,
  marginTop: "$md",
  color: "$primaryLight",
  fontSize: "$sm",
  fontWeight: 600,
  textDecoration: "none",

  "@sm": {
    minHeight: 0,
    marginTop: "$lg",
    fontSize: "$xs",
  },

  "&:hover": {
    color: "$primary",
    textDecoration: "underline",
  },
});