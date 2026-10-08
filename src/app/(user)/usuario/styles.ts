import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Page = styled("div", {
  minHeight: "100vh",
  backgroundColor: "$backgroundPage",
  color: "$text",
  fontFamily: "$sans",
});

export const Main = styled("main", {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "24px 16px 48px",

  "@sm": {
    padding: "40px 32px 80px",
  },

  "@media (min-width: 1400px)": {
    maxWidth: 1280,
  },
});

export const Card = styled("section", {
  backgroundColor: "$background",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$card",
});

export const Dashboard = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 20,

  "@sm": {
    gridTemplateColumns: "2.15fr 1fr",
  },
});

export const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

export const ActionButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  padding: "8px 12px",
  border: "1px solid $border",
  borderRadius: "$control",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size11)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },

  variants: {
    variant: {
      secondary: {
        "&:hover": {
          backgroundColor: "$backgroundSecondary",
        },
      },
      primary: {
        borderColor: "$primaryLight",
        backgroundColor: "$primaryLight",
        color: "$background",

        "&:hover": {
          backgroundColor: "$primaryHover",
        },
      },
    },
  },

  defaultVariants: {
    variant: "secondary",
  },
});

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

export const Profile = styled(Card, {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 16,
  minHeight: 124,
  marginBottom: 24,
  padding: "24px 20px",

  "@sm": {
    flexWrap: "nowrap",
    gap: 24,
    padding: "32px 24px",
  },
});

export const AvatarSpace = styled("div", {
  display: "none",
  flexShrink: 0,
  width: 48,

  "@sm": {
    display: "block",
    width: 68,
  },
});

export const Identity = styled("div", {
  flex: 1,
  minWidth: 0,
});

export const NameRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,

  h1: {
    margin: 0,
    fontSize: "var(--fontSizes-xl)",

    "@sm": {
      fontSize: "var(--fontSizes-size22)",
    },
  },
});

export const VerifiedBadge = styled("span", {
  padding: "4px 7px",
  borderRadius: "$control",
  backgroundColor: "$adoptedBackground",
  color: "$primary",
  fontSize: "var(--fontSizes-size10)",
  fontWeight: 600,
});

export const Contacts = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 10,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",

  "@sm": {
    flexDirection: "row",
    gap: 18,
  },

  span: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },

  svg: {
    width: 13,
    height: 13,
  },
});

export const EditButton = styled(ActionButton, {
  marginLeft: "auto",

  "@sm": {
    marginLeft: 0,
  },
});

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

export const Stats = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,

  "@sm": {
    gap: 16,
  },
});

export const Stat = styled(Card, {
  display: "block",
  minHeight: 116,
  padding: "16px 12px",
  color: "inherit",
  textDecoration: "none",
  transition: "border-color 200ms ease",

  "@sm": {
    padding: 20,
  },

  small: {
    color: "$textMuted",
    fontSize: "var(--fontSizes-size10)",
  },

  variants: {
    interactive: {
      true: {
        cursor: "pointer",

        "&:hover": {
          borderColor: "$primaryBorder",
        },

        "&:focus-visible": {
          outline: "none",
          boxShadow: "var(--shadows-focus)",
        },
      },
    },
  },
});

export const StatLabel = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  fontWeight: 600,

  svg: {
    color: "$primaryLight",
  },

  variants: {
    iconColor: {
      warning: {
        svg: {
          color: "$warning",
        },
      },
    },
  },
});

export const StatValue = styled("div", {
  display: "flex",
  alignItems: "baseline",
  gap: 6,
  margin: "8px 0",

  "@sm": {
    gap: 10,
  },

  strong: {
    fontSize: "var(--fontSizes-3xl)",
  },

  span: {
    color: "$textMuted",
    fontSize: "var(--fontSizes-size9)",

    "@sm": {
      fontSize: "var(--fontSizes-size10)",
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Notifications                                                              */
/* -------------------------------------------------------------------------- */

export const Notifications = styled(Card, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "22px 20px",

  "@sm": {
    gap: 24,
  },

  h2: {
    margin: "0 0 5px",
    fontSize: "var(--fontSizes-xs)",
  },

  p: {
    maxWidth: 460,
    margin: 0,
    color: "$textMuted",
    fontSize: "var(--fontSizes-size11)",
    lineHeight: 1.5,
  },
});

export const Switch = styled("button", {
  flexShrink: 0,
  width: 38,
  height: 20,
  padding: 2,
  border: 0,
  borderRadius: "var(--radii-pill)",
  backgroundColor: "$border",
  cursor: "pointer",
  transition: "background-color 200ms ease",

  "&:hover": {
    filter: "brightness(0.96)",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },

  span: {
    display: "block",
    width: 16,
    height: 16,
    borderRadius: "var(--radii-circle)",
    backgroundColor: "$background",
    boxShadow: "var(--shadows-switch)",
    transition: "transform 200ms ease",

    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$primaryLight",

        span: {
          transform: "translateX(18px)",
        },
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Side panels                                                                */
/* -------------------------------------------------------------------------- */

export const Panel = styled(Card, {
  padding: "20px",

  "@sm": {
    padding: "22px 20px",
  },

  "& > h2": {
    margin: "0 0 16px",
    paddingBottom: 14,
    borderBottom: "1px solid $border",
    fontSize: "var(--fontSizes-sm)",
  },
});

export const Preference = styled("div", {
  marginTop: 14,

  h3: {
    margin: "0 0 7px",
    color: "$textMuted",
    fontSize: "var(--fontSizes-size10)",
  },
});

export const Chips = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const Chip = styled("li", {
  padding: "5px 10px",
  borderRadius: "var(--radii-pill)",
  backgroundColor: "$adoptedBackground",
  color: "$primary",
  fontSize: "var(--fontSizes-size10)",
  fontWeight: 600,

  variants: {
    outline: {
      true: {
        padding: "5px 8px",
        border: "1px solid $primaryLight",
        borderRadius: "$control",
        backgroundColor: "transparent",
        fontSize: "var(--fontSizes-size11)",
        fontWeight: 400,
      },
    },
  },
});

export const Environment = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 9,
  margin: 0,
  padding: 0,
  listStyle: "none",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",

  li: {
    display: "flex",
    alignItems: "flex-start",
    gap: 7,
    lineHeight: 1.4,
  },

  svg: {
    flexShrink: 0,
    width: 13,
    height: 13,
    color: "$primaryLight",
  },
});

/* -------------------------------------------------------------------------- */
/* Edit dialog                                                                */
/* -------------------------------------------------------------------------- */

export const Dialog = styled("dialog", {
  width: "calc(100% - 32px)",
  maxWidth: 460,
  padding: 32,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  color: "$text",
  boxShadow: "var(--shadows-dialog)",

  "&::backdrop": {
    backgroundColor: "$overlay",
  },
});

export const DialogTitle = styled("h2", {
  margin: "0 20px 20px 0",
  fontSize: "var(--fontSizes-xl)",
});

export const DialogForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const FieldLabel = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontSize: "var(--fontSizes-size13)",
});

export const CloseButton = styled("button", {
  position: "absolute",
  top: 14,
  right: 14,
  display: "flex",
  padding: 4,
  border: 0,
  borderRadius: "$control",
  backgroundColor: "transparent",
  color: "$textMuted",
  cursor: "pointer",
  transition: "color 200ms ease",

  "&:hover": {
    color: "$text",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },
});
