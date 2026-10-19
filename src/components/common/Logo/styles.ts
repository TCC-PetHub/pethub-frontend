import Link from "next/link";

import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Link                                                                       */
/* -------------------------------------------------------------------------- */

export const LogoLink = styled(Link, {
  display: "inline-flex",
  color: "inherit",
  textDecoration: "none",

  "&:focus-visible": {
    outline: "none",
    borderRadius: "$lg",
    boxShadow: "$focus",
  },
});

/* -------------------------------------------------------------------------- */
/* Logo                                                                       */
/* -------------------------------------------------------------------------- */

export const Wrapper = styled("div", {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  fontFamily: "$sans",
  userSelect: "none",
});

export const Mark = styled("span", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "$lg",
  backgroundColor: "$primaryLight",
  color: "$background",
});

export const Text = styled("span", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.2,

  strong: {
    color: "$primaryLight",
    fontSize: "$lg",
    fontWeight: 700,
  },

  small: {
    color: "$textMuted",
    fontSize: "$size10",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  variants: {
    // Versão para fundos escuros (footer).
    light: {
      true: {
        strong: {
          color: "$background",
        },

        small: {
          color: "$textSubtle",
        },
      },
    },
  },
});
