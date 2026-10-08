import Link from "next/link";

import { styled } from "@/styles";

const SIDEBAR_WIDTH = 240;

/* -------------------------------------------------------------------------- */
/* Estrutura                                                                  */
/* -------------------------------------------------------------------------- */

export const Shell = styled("div", {
  minHeight: "100vh",
  backgroundColor: "$backgroundPage",
  fontFamily: "$sans",
});

export const Content = styled("main", {
  minWidth: 0,
  padding: "$md",

  "@sm": {
    padding: "$lg",
  },

  "@lg": {
    marginLeft: SIDEBAR_WIDTH,
    padding: "$xl",
  },
});

/* -------------------------------------------------------------------------- */
/* Barra mobile                                                               */
/* -------------------------------------------------------------------------- */

export const MobileBar = styled("header", {
  position: "sticky",
  top: 0,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  gap: 8,
  height: 64,
  padding: "0 16px",
  borderBottom: "1px solid $border",
  backgroundColor: "$background",

  "@lg": {
    display: "none",
  },
});

export const MobileToggle = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  padding: 0,
  border: 0,
  borderRadius: "$md",
  backgroundColor: "transparent",
  color: "$textSecondary",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$backgroundSecondary",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focus",
  },
});

export const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  zIndex: 30,
  backgroundColor: "$overlay",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 200ms ease",

  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
      },
    },
  },

  "@lg": {
    display: "none",
  },
});

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export const Sidebar = styled("aside", {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  zIndex: 40,
  display: "flex",
  flexDirection: "column",
  width: SIDEBAR_WIDTH,
  padding: "20px 12px 16px",
  borderRight: "1px solid $border",
  backgroundColor: "$backgroundSecondary",
  overflowY: "auto",
  transform: "translateX(-100%)",
  transition: "transform 250ms ease",

  variants: {
    open: {
      true: {
        transform: "translateX(0)",
      },
    },
  },

  "@lg": {
    transform: "translateX(0)",
  },
});

export const SidebarHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "0 8px",
  marginBottom: 24,
});

export const CloseButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  padding: 0,
  border: 0,
  borderRadius: "$md",
  backgroundColor: "transparent",
  color: "$textSecondary",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$background",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focus",
  },

  "@lg": {
    display: "none",
  },
});

/* -------------------------------------------------------------------------- */
/* Navegação                                                                  */
/* -------------------------------------------------------------------------- */

export const NavList = styled("ul", {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 2,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const NavItem = styled(Link, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: "$md",
  color: "$textSecondary",
  fontSize: "$size13",
  fontWeight: 500,
  textDecoration: "none",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$background",
    color: "$primary",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focus",
  },

  "&[aria-current='page']": {
    backgroundColor: "$adoptedBackground",
    color: "$primary",
    fontWeight: 600,

    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: 10,
      width: 3,
      height: 16,
      borderRadius: "$full",
      backgroundColor: "$primaryLight",
      transform: "translateY(-50%)",
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Usuário                                                                    */
/* -------------------------------------------------------------------------- */

export const UserCard = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 16,
  padding: 10,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
});

export const Avatar = styled("span", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "$full",
  backgroundColor: "$adoptedBackground",
  color: "$primary",
  fontSize: "$size13",
  fontWeight: 700,
});

export const UserInfo = styled("div", {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minWidth: 0,

  strong: {
    overflow: "hidden",
    color: "$text",
    fontSize: "$size13",
    fontWeight: 600,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  span: {
    overflow: "hidden",
    color: "$textMuted",
    fontSize: "$size11",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const LogoutButton = styled("button", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  padding: 0,
  border: 0,
  borderRadius: "$md",
  backgroundColor: "transparent",
  color: "$textSecondary",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$backgroundSecondary",
    color: "$text",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "$focus",
  },
});
