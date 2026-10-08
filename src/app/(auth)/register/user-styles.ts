import Link from "next/link";

import { styled } from "@/styles";

export const UserRegistrationPage = styled("main", {
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

export const UserRegistrationCard = styled("section", {
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

export const UserRegistrationForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$md",
});

export const RegistrationIntro = styled("header", {
  display: "flex",
  flexDirection: "column",
  gap: "$xs",
});

export const RegistrationTitle = styled("h1", {
  margin: 0,
  color: "$text",
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.3,
});

export const RegistrationDescription = styled("p", {
  margin: 0,
  color: "$textSecondary",
  fontSize: 11,
  lineHeight: 1.5,
});

export const RequiredFieldsNote = styled("p", {
  margin: "-8px 0 0",
  color: "$textMuted",
  fontSize: 10,
});

export const ProfileGuidance = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: 10,
  lineHeight: 1.45,
});

export const RegistrationSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const RegistrationSectionTitle = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: 13,
  fontWeight: 700,
});

export const RegistrationSectionDescription = styled("p", {
  margin: "$xs 0 0",
  color: "$textSecondary",
  fontSize: 10,
  lineHeight: 1.5,
});

export const RegistrationField = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

export const FieldLabel = styled("label", {
  color: "$text",
  fontSize: 10,
  fontWeight: 600,
});

export const FieldHelp = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: 9,
  lineHeight: 1.45,
});

export const ProfileSelector = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$sm",
});

export const ProfileOption = styled(Link, {
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

export const CityStateFields = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 52px",
  gap: "$sm",
});

export const DocumentUploadArea = styled("label", {
  position: "relative",
  display: "flex",
  minHeight: 76,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  padding: "$sm",
  border: "1px dashed $border",
  borderRadius: "$md",
  backgroundColor: "$backgroundSecondary",
  color: "$primary",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 180ms ease, background-color 180ms ease",

  "&:hover, &:focus-within": {
    borderColor: "$primaryLight",
    backgroundColor: "$adoptedBackground",
  },
});

export const DocumentFileInput = styled("input", {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  clipPath: "inset(50%)",
});

export const DocumentUploadIcon = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$primaryLight",
});

export const DocumentUploadAction = styled("span", {
  color: "$primary",
  fontSize: 10,
  fontWeight: 700,
});

export const DocumentUploadHelp = styled("span", {
  color: "$textMuted",
  fontSize: 9,
});

export const SelectedDocumentNames = styled("p", {
  margin: 0,
  color: "$textSecondary",
  fontSize: 10,
  overflowWrap: "anywhere",
});

export const IdentityPrivacyNotice = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$sm",
  padding: "$sm",
  borderRadius: "$md",
  backgroundColor: "$adoptedBackground",
  color: "$textSecondary",
  fontSize: 10,
  lineHeight: 1.5,

  svg: {
    flexShrink: 0,
    color: "$primary",
  },

  strong: {
    color: "$primary",
  },
});

export const PrivacyConsent = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$sm",
  color: "$textSecondary",
  fontSize: 10,
  lineHeight: 1.5,
  cursor: "pointer",

  input: {
    flexShrink: 0,
    width: 13,
    height: 13,
    margin: "1px 0 0",
    accentColor: "$colors$primaryLight",
  },

  a: {
    color: "$primaryLight",
    fontWeight: 600,
    textDecoration: "underline",
  },
});

export const FieldError = styled("p", {
  margin: 0,
  color: "$negative",
  fontSize: 10,
  lineHeight: 1.4,
});