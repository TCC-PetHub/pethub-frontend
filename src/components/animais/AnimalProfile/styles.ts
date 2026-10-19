import Link from "next/link";

import { styled } from "@/styles";

const tablet = "@media (max-width: 1000px)";
const mobile = "@media (max-width: 767px)";
const compact = "@media (max-width: 440px)";

const focusRing = {
  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },
};

const controlBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "8px 12px",
  border: "1px solid $border",
  borderRadius: "var(--radii-control)",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size11)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  textDecoration: "none",
} as const;

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "340px minmax(0, 1fr)",
  gap: 20,

  [tablet]: {
    gridTemplateColumns: "260px minmax(0, 1fr)",
  },

  [mobile]: {
    gridTemplateColumns: "1fr",
  },
});

export const Aside = styled("aside", {
  [mobile]: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  [compact]: {
    display: "block",
  },
});

export const Panel = styled("section", {
  overflow: "hidden",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
});

/* Fotos */

export const LargePhoto = styled("div", {
  height: 300,
  border: "1px solid $border",
  borderRadius: "$lg",

  [mobile]: {
    height: 220,
  },
});

export const Thumbnails = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 8,
  margin: "12px 0",

  [mobile]: {
    gridColumn: 1,
    margin: 0,
  },

  [compact]: {
    margin: "12px 0",
  },
});

export const Thumbnail = styled("button", {
  height: 56,
  border: "1px solid $border",
  borderRadius: "var(--radii-input)",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "border-color 200ms ease",

  "&:hover": {
    borderColor: "$textMuted",
  },

  ...focusRing,

  variants: {
    selected: {
      true: {
        borderColor: "$primaryLight",
      },
    },
  },
});

/* Organização */

export const OrgPanel = styled(Panel, {
  padding: 16,

  [mobile]: {
    gridColumn: 2,
    gridRow: "1 / 3",
  },

  [compact]: {
    gridColumn: "auto",
    gridRow: "auto",
  },
});

export const OrgTitle = styled("h3", {
  margin: "0 0 12px",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size10)",
});

export const OrgIdentity = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  paddingBottom: 10,
  borderBottom: "1px solid $border",

  "> span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: "var(--radii-circle)",
    backgroundColor: "$adoptedBackground",
    color: "$primaryLight",
  },

  strong: {
    fontSize: "$xs",
  },

  p: {
    margin: "3px 0 0",
  },
});

export const OrgText = styled("p", {
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  lineHeight: 1.5,
});

/* Detalhe */

export const Detail = styled(Panel, {
  padding: 22,

  [mobile]: {
    padding: 18,
  },
});

export const DetailHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,

  [tablet]: {
    alignItems: "flex-start",
    flexDirection: "column",
  },

  [compact]: {
    gap: 8,
  },
});

export const TitleRow = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const PetName = styled("h1", {
  margin: 0,
  fontSize: "var(--fontSizes-size27)",
});

export const Subtitle = styled("p", {
  margin: "8px 0",
  color: "$textSecondary",
  fontSize: "$xs",
  lineHeight: 1.7,
});

export const Actions = styled("div", {
  display: "flex",
  gap: 8,

  [compact]: {
    flexWrap: "wrap",
  },
});

export const OutlineButton = styled("button", {
  ...controlBase,
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$backgroundSecondary",
  },

  ...focusRing,
});

export const OutlineTag = styled("span", {
  ...controlBase,
});

export const PrimaryLink = styled(Link, {
  ...controlBase,
  borderColor: "$primaryLight",
  backgroundColor: "$primaryLight",
  color: "$background",
  transition: "all 200ms ease",

  "&:hover": {
    backgroundColor: "$primaryHover",
  },

  ...focusRing,
});

export const Notice = styled("p", {
  margin: "14px 0 0",
  padding: 10,
  borderRadius: "var(--radii-input)",
  backgroundColor: "$positiveSoft",
  color: "$primaryHover",
  fontSize: "$xs",
  lineHeight: 1.5,
});

export const Facts = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
  margin: "20px 0",

  [compact]: {
    gap: 6,
  },
});

export const Fact = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  padding: 12,
  border: "1px solid $border",
  borderRadius: "var(--radii-input)",
  backgroundColor: "$backgroundPage",

  small: {
    color: "$textSubtle",
    fontSize: "var(--fontSizes-size9)",
    letterSpacing: "0.5px",
  },

  strong: {
    fontSize: "var(--fontSizes-size13)",

    [compact]: {
      fontSize: "var(--fontSizes-size11)",
    },
  },

  [compact]: {
    padding: 9,
  },
});

/* Abas */

export const Tabs = styled("div", {
  display: "flex",
  gap: 16,
  marginBottom: 20,
  overflow: "auto",
  borderBottom: "1px solid $border",

  [tablet]: {
    gap: 12,
  },
});

export const Tab = styled("button", {
  padding: "12px 0",
  border: 0,
  borderBottom: "2px solid transparent",
  backgroundColor: "transparent",
  color: "$textMuted",
  font: "inherit",
  fontSize: "var(--fontSizes-size11)",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    color: "$textSecondary",
  },

  ...focusRing,

  variants: {
    active: {
      true: {
        borderColor: "$primaryLight",
        color: "$primaryLight",
        fontWeight: 600,
      },
    },
  },
});

export const SectionTitle = styled("h3", {
  margin: "18px 0 8px",
  fontSize: "$xs",
});

export const Text = styled("p", {
  margin: "8px 0",
  color: "$textSecondary",
  fontSize: "$xs",
  lineHeight: 1.7,
});

export const Chips = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,

  span: {
    padding: "5px 10px",
    borderRadius: "var(--radii-pill)",
    backgroundColor: "$adoptedBackground",
    color: "$primaryHover",
    fontSize: "var(--fontSizes-size10)",
    fontWeight: 600,
  },
});

export const Table = styled("table", {
  width: "100%",
  border: "1px solid $border",
  borderCollapse: "collapse",
  fontSize: "var(--fontSizes-size10)",
  textAlign: "left",

  "th, td": {
    padding: 10,
    borderBottom: "1px solid $border",
    lineHeight: 1.5,
  },

  th: {
    backgroundColor: "$backgroundPage",
    color: "$textMuted",
    fontWeight: 500,
  },

  td: {
    color: "$textSecondary",
  },
});

export const Badge = styled("span", {
  display: "inline-flex",
  padding: "4px 7px",
  borderRadius: "var(--radii-sm)",
  fontSize: "var(--fontSizes-size10)",
  whiteSpace: "nowrap",

  variants: {
    tone: {
      green: {
        backgroundColor: "$positiveBackground",
        color: "$available",
      },
      amber: {
        backgroundColor: "$inTreatmentBackground",
        color: "$inTreatment",
      },
    },
  },
});
