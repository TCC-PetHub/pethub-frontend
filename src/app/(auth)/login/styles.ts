import { css } from "@/styles";

const ring = "var(--shadows-focus)";

export const loginStyles = css({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "$md",
  fontFamily: "$sans",
  backgroundColor:
    "color-mix(in srgb, var(--colors-adoptedBackground) 35%, var(--colors-background))",

  ".login-panel": {
    width: "100%",
    maxWidth: "420px",
    padding: "$lg",
    backgroundColor: "$background",
    borderRadius: "$lg",
    boxShadow: "$lg",
    "@sm": { padding: "$xl" },
  },

  /* Marca */
  ".brand": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "$sm",
    width: "fit-content",
    margin: "0 auto $lg",
    borderRadius: "$md",
    "&:focus-visible": { outline: "none", boxShadow: ring },
  },
  ".brand-icon": {
    display: "grid",
    placeItems: "center",
    width: "36px",
    height: "36px",
    borderRadius: "$md",
    backgroundColor: "$primary",
    color: "var(--colors-background)",
  },
  ".brand-copy": {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1,
    strong: { fontSize: "$lg", fontWeight: 700, color: "$primary" },
    span: {
      marginTop: "2px",
      fontSize: "var(--fontSizes-size10)",
      fontWeight: 600,
      letterSpacing: "0.14em",
      color: "$primary",
    },
  },

  /* Formulário */
  ".login-form": {
    display: "flex",
    flexDirection: "column",
    gap: "$md",
  },
  ".form-field": {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    label: { fontSize: "var(--fontSizes-size13)", fontWeight: 600 },
  },

  /* Seletor de perfil (links com o perfil na URL) */
  ".profile-picker": {
    minWidth: 0,
    margin: 0,
    padding: 0,
    border: 0,
    legend: {
      padding: 0,
      marginBottom: "6px",
      fontSize: "var(--fontSizes-size13)",
      fontWeight: 600,
    },
  },
  ".profile-options": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "$sm",
  },
  ".profile-option": {
    display: "block",
    padding: "10px $sm",
    textAlign: "center",
    fontSize: "var(--fontSizes-size13)",
    fontWeight: 500,
    color: "$textSecondary",
    backgroundColor: "$background",
    border: "1px solid $colors$border",
    borderRadius: "$lg",
    transition: "border-color 200ms ease, background-color 200ms ease",
    textDecoration: "none",
    "&:hover": {
      borderColor: "$primaryLight",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: ring,
    },
    "&[aria-current='true']": {
      backgroundColor: "$adoptedBackground",
      borderColor: "$primary",
      color: "$primary",
      fontWeight: 600,
    },
  },

  /* Lembrar-me / esqueci a senha */
  ".form-options": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "$sm",
    fontSize: "var(--fontSizes-size11)",
    a: {
      fontWeight: 600,
      color: "$primary",
      "&:hover": { textDecoration: "underline" },
    },
  },
  ".remember-option": {
    display: "flex",
    alignItems: "center",
    gap: "$sm",
    color: "$textSecondary",
    cursor: "pointer",
    input: { margin: 0, accentColor: "$colors$primary" },
  },

  /* Divisor */
  ".divider": {
    display: "flex",
    alignItems: "center",
    gap: "$md",
    margin: "$md 0",
    fontSize: "var(--fontSizes-size11)",
    color: "$textMuted",
    "&::before, &::after": {
      content: '""',
      flex: 1,
      height: "1px",
      backgroundColor: "$border",
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    "*": { transition: "none !important" },
  },
});
