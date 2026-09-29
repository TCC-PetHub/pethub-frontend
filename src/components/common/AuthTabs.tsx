import Link from "next/link";

import { styled } from "@/styles";

export const AuthTabs = styled("nav", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$xs",
  padding: "$xs",
  marginBottom: "$md",
  borderRadius: "$lg",
  backgroundColor: "$backgroundSecondary",
});

export const AuthTab = styled(Link, {
  padding: "8px 0",
  borderRadius: "$md",
  color: "$textSecondary",
  fontSize: "$sm",
  fontWeight: 500,
  textAlign: "center",
  textDecoration: "none",
  transition: "all 200ms ease",

  "&:hover": {
    color: "$primary",
  },

  variants: {
    active: {
      true: {
        backgroundColor: "$background",
        boxShadow: "$sm",
        color: "$primary",
        fontWeight: 600,
      },
    },
  },
});