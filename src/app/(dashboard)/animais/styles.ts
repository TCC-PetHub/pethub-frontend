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

export const Heading = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 22,

  [mobile]: {
    alignItems: "flex-start",
  },
});

export const HeadingTitle = styled("h1", {
  margin: "0 0 6px",
  fontSize: "var(--fontSizes-size23)",

  [mobile]: {
    fontSize: "var(--fontSizes-size21)",
  },
});

export const HeadingText = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: "$xs",

  [mobile]: {
    lineHeight: 1.6,
  },
});

export const DemoTag = styled("span", {
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

  [mobile]: {
    display: "none",
  },
});

/* Filtros */

export const Filters = styled("section", {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: 14,
  margin: "0 -24px 22px",
  padding: 20,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",

  [tablet]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  [mobile]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    margin: "0 0 18px",
    padding: 14,
  },
});

export const FilterField = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  color: "$textSecondary",
  fontSize: "var(--fontSizes-size11)",
});

/* Grid de animais */

export const PetGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 18,

  [mobile]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },

  [compact]: {
    gridTemplateColumns: "1fr",
  },
});

export const PetCard = styled(Link, {
  display: "block",
  overflow: "hidden",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  color: "inherit",
  textDecoration: "none",
  transition: "border-color 150ms ease",

  "&:hover": {
    borderColor: "$primaryLight",
  },

  ...focusRing,
});

export const PetPhoto = styled("div", {
  height: 170,
  backgroundColor: "$background",

  [mobile]: {
    height: 140,
  },

  [compact]: {
    height: 170,
  },
});

export const PetBody = styled("div", {
  padding: 14,
});

export const PetHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,

  [compact]: {
    flexWrap: "wrap",
    gap: 8,
  },
});

export const PetName = styled("h2", {
  margin: 0,
  fontSize: "var(--fontSizes-md)",
});

export const PetInfo = styled("p", {
  margin: "7px 0 0",
  fontSize: "var(--fontSizes-size11)",
});

export const PetMeta = styled(PetInfo, {
  color: "$textMuted",
  lineHeight: 1.5,
});

export const PetOrg = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 10,
  paddingTop: 10,
  borderTop: "1px solid $border",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
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
      mint: {
        backgroundColor: "$adoptedBackground",
        color: "$primaryHover",
      },
    },
  },
});

export const Empty = styled("p", {
  padding: 50,
  textAlign: "center",
  color: "$textMuted",
});

/* Paginação */

export const Pagination = styled("footer", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  marginTop: 24,
  paddingTop: 16,
  borderTop: "1px solid $border",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",

  [mobile]: {
    flexWrap: "wrap",
  },
});

export const PaginationControls = styled("div", {
  display: "flex",
  gap: 7,
});

export const PageButton = styled("button", {
  padding: "8px 12px",
  border: "1px solid $border",
  borderRadius: "var(--radii-input)",
  backgroundColor: "$background",
  color: "$textSecondary",
  font: "inherit",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover:not(:disabled)": {
    borderColor: "$textMuted",
  },

  "&:disabled": {
    opacity: 0.45,
    cursor: "default",
  },

  ...focusRing,

  variants: {
    current: {
      true: {
        borderColor: "$adoptedBackground",
        backgroundColor: "$adoptedBackground",
        color: "$primaryHover",
      },
    },
  },
});
