import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Links de navegação                                                         */
/* -------------------------------------------------------------------------- */

// O NavigationLinks aplica essas classes internamente, então os seletores
// ficam nos wrappers (Nav e MobileMenu) até ele ter estilos próprios.
const navLinks = {
  ".nav-list": {
    display: "flex",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },

  ".nav-vertical": {
    flexDirection: "column",
  },

  ".nav-link": {
    display: "block",
    padding: "8px 10px",
    borderRadius: "$md",
    color: "$textSecondary",
    fontSize: "var(--fontSizes-size13)",
    fontWeight: 500,
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "all 200ms ease",

    "&:hover": {
      color: "$primary",
    },

    "&:focus-visible": {
      outline: "none",
      boxShadow: "var(--shadows-focus)",
    },
  },

  ".nav-link-active": {
    backgroundColor: "$adoptedBackground",
    color: "$primary",
    fontWeight: 600,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Header = styled("header", {
  position: "sticky",
  top: 0,
  zIndex: 20,
  borderBottom: "1px solid $border",
  backgroundColor: "$background",
  fontFamily: "$sans",
});

export const Inner = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  width: "100%",
  maxWidth: 1280,
  height: 64,
  margin: "0 auto",
  padding: "0 16px",

  "@sm": {
    padding: "0 24px",
  },
});

export const Left = styled("div", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: 8,
});

export const Actions = styled("div", {
  position: "relative",
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: 8,
});

/* -------------------------------------------------------------------------- */
/* Navegação                                                                  */
/* -------------------------------------------------------------------------- */

export const MenuToggle = styled("button", {
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
    boxShadow: "var(--shadows-focus)",
  },

  "@media (min-width: 1050px)": {
    display: "none",
  },
});

export const Nav = styled("div", {
  display: "none",

  "@media (min-width: 1050px)": {
    display: "block",
  },

  ...navLinks,
});

export const MobileMenu = styled("div", {
  padding: "8px 16px 16px",
  borderTop: "1px solid $border",
  backgroundColor: "$background",
  boxShadow: "$md",

  "@media (min-width: 1050px)": {
    display: "none",
  },

  ...navLinks,
});

/* -------------------------------------------------------------------------- */
/* Conta                                                                      */
/* -------------------------------------------------------------------------- */

export const Organizer = styled("span", {
  display: "none",

  "@sm": {
    display: "block",
  },
});

export const Dropdown = styled("div", {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  minWidth: 150,
  padding: 4,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "$md",
});

export const DropdownItem = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  padding: "10px 12px",
  border: 0,
  borderRadius: "$md",
  backgroundColor: "transparent",
  color: "$negative",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size13)",
  textAlign: "left",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$negativeBackground",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },
});
