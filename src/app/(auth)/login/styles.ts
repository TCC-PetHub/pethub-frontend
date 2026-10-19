import Link from "next/link";

import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Main = styled("main", {
  display: "grid",
  placeItems: "center",
  minHeight: "100vh",
  padding: "$md",
  fontFamily: "$sans",
  backgroundColor:
    "color-mix(in srgb, var(--colors-adoptedBackground) 35%, var(--colors-background))",

  "@media (prefers-reduced-motion: reduce)": {
    "*": { transition: "none !important" },
  },
});

export const Panel = styled("section", {
  width: "100%",
  maxWidth: 420,
  padding: "$lg",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "$lg",

  "@sm": {
    padding: "$xl",
  },
});

/* -------------------------------------------------------------------------- */
/* Formulário                                                                 */
/* -------------------------------------------------------------------------- */

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$md",
});

export const ErrorAlert = styled("p", {
  margin: 0,
  padding: "10px 12px",
  borderRadius: "$md",
  backgroundColor: "$negativeBackground",
  color: "$negative",
  fontSize: "$size13",
  lineHeight: 1.5,
});

export const Field = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const FieldLabel = styled("label", {
  color: "$text",
  fontSize: "$size13",
  fontWeight: 600,
});

/* -------------------------------------------------------------------------- */
/* Seletor de perfil                                                          */
/* -------------------------------------------------------------------------- */

export const ProfilePicker = styled("fieldset", {
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
});

export const ProfileLegend = styled("legend", {
  marginBottom: 6,
  padding: 0,
  color: "$text",
  fontSize: "$size13",
  fontWeight: 600,
});

export const ProfileOptions = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$sm",
});

export const ProfileOption = styled(Link, {
  display: "block",
  padding: "10px $sm",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontSize: "$size13",
  fontWeight: 500,
  textAlign: "center",
  textDecoration: "none",
  transition: "border-color 200ms ease, background-color 200ms ease",

  "&:hover": {
    borderColor: "$primaryLight",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focus",
  },

  "&[aria-current='true']": {
    borderColor: "$primary",
    backgroundColor: "$adoptedBackground",
    color: "$primary",
    fontWeight: 600,
  },
});

/* -------------------------------------------------------------------------- */
/* Opções                                                                     */
/* -------------------------------------------------------------------------- */

export const Options = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$sm",
  fontSize: "$size11",
});

export const RememberOption = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: "$sm",
  color: "$textSecondary",
  cursor: "pointer",

  input: {
    margin: 0,
    accentColor: "var(--colors-primary)",
  },
});

export const StyledForgotLink = styled(Link, {
  color: "$primary",
  fontWeight: 600,
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },

  "&:focus-visible": {
    outline: "none",
    borderRadius: "$sm",
    boxShadow: "$focus",
  },
});

/* -------------------------------------------------------------------------- */
/* Divisor                                                                    */
/* -------------------------------------------------------------------------- */

export const Divider = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$md",
  margin: "$md 0",
  color: "$textMuted",
  fontSize: "$size11",

  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: "$border",
  },
});
