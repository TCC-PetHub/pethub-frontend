import { styled } from "@/styles";

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

export const OrganizationFieldHelp = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: 9,
  lineHeight: 1.4,
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