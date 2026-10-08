import Link from "next/link";

import { styled } from "@/styles";

export const OrganizationRegistrationPage = styled("main", {
  minHeight: "100vh",
  display: "flex",
  overflowY: "auto",
  padding: "$lg $md",
  backgroundColor: "#EFF9F7",
  fontFamily: "$sans",

  "&, & *": {
    boxSizing: "border-box",
  },

  "& *, & *::before, & *::after": {
    fontSize: "13px !important",
  },
});

export const OrganizationRegistrationCard = styled("section", {
  width: "100%",
  maxWidth: 640,
  margin: "auto",
  padding: "$xl",
  border: "1px solid #E4EFEC",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "0 8px 28px rgba(15, 94, 87, 0.08)",

  "@media (max-width: 639px)": {
    padding: "$lg $md",
  },
});

export const OrganizationRegistrationForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const OrganizationField = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const OrganizationFieldLabel = styled("label", {
  color: "$text",
  fontSize: 10,
  fontWeight: 600,
});

export const OrganizationFieldHelp = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: 9,
  lineHeight: 1.4,
});

export const OrganizationSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const OrganizationSectionTitle = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: 11,
  fontWeight: 700,
});

export const OrganizationSectionDescription = styled("p", {
  margin: "3px 0 0",
  color: "$textSecondary",
  fontSize: 9,
  lineHeight: 1.45,
});

export const OrganizationProfileSelector = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$sm",
});

export const OrganizationProfileOption = styled(Link, {
  display: "block",
  padding: "7px 10px",
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontSize: 10,
  fontWeight: 500,
  textAlign: "center",
  textDecoration: "none",
  transition: "all 180ms ease",

  "&:hover": {
    borderColor: "$primaryLight",
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

export const OrganizationCityStateFields = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 52px",
  gap: "$sm",
});

export const OrganizationDocumentUploadControl = styled("label", {
  position: "relative",
  display: "flex",
  minHeight: 30,
  alignItems: "center",
  gap: "$xs",
  padding: "0 $sm",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$backgroundSecondary",
  color: "$textMuted",
  cursor: "pointer",

  "&:hover, &:focus-within": {
    borderColor: "$primaryLight",
  },

  svg: {
    flexShrink: 0,
    color: "$primaryLight",
  },
});

export const OrganizationDocumentFileInput = styled("input", {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
});

export const OrganizationDocumentName = styled("span", {
  flex: 1,
  overflow: "hidden",
  fontSize: 9,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const OrganizationPrivacyConsent = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$sm",
  color: "$textSecondary",
  fontSize: 9,
  lineHeight: 1.45,
  cursor: "pointer",

  input: {
    flexShrink: 0,
    width: 12,
    height: 12,
    margin: "1px 0 0",
    accentColor: "$colors$primaryLight",
  },

  a: {
    color: "$primaryLight",
    fontWeight: 600,
    textDecoration: "underline",
  },
});

export const OrganizationFieldError = styled("p", {
  margin: 0,
  color: "$negative",
  fontSize: 9,
  lineHeight: 1.4,
});