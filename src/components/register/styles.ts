import Link from "next/link";

import { keyframes, styled } from "@/styles";

export const RegistrationPage = styled("main", {
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

export const RegistrationCard = styled("section", {
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

export const RegistrationSection = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
});

export const RegistrationFieldLabel = styled("label", {
  color: "$text",
  fontSize: 10,
  fontWeight: 600,
});

export const RegistrationProfileSelector = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$sm",
});

export const RegistrationProfileOption = styled(Link, {
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

export const RegistrationCityStateFields = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 52px",
  gap: "$sm",
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
  borderRadius: "var(--radii-circle)",
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
  fontSize: "var(--fontSizes-lg)",
  fontWeight: 700,
});

export const PendingText = styled("p", {
  margin: 0,
  maxWidth: 300,
  color: "$textSecondary",
  fontSize: "var(--fontSizes-size13)",
  lineHeight: 1.6,
});

export const BackLink = styled(Link, {
  marginTop: "$sm",
  padding: "10px 20px",
  border: "1px solid $primaryLight",
  borderRadius: "$lg",
  color: "$primary",
  fontSize: "var(--fontSizes-size13)",
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$adoptedBackground",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },
});
