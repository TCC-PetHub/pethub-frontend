import { styled } from "@/styles";

import { ActionButton, Card } from "../styles";

/* -------------------------------------------------------------------------- */
/* Heading + filters                                                          */
/* -------------------------------------------------------------------------- */

export const Heading = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 20,
  marginBottom: 24,

  "@sm": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  h1: {
    margin: "0 0 6px",
    fontSize: "var(--fontSizes-xl)",
  },

  p: {
    margin: 0,
    color: "$textMuted",
    fontSize: "var(--fontSizes-size11)",
  },
});

export const Filters = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
});

export const FilterButton = styled("button", {
  padding: "7px 12px",
  border: "1px solid $border",
  borderRadius: "$control",
  backgroundColor: "$background",
  color: "$textMuted",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size11)",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    borderColor: "$textMuted",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "var(--shadows-focus)",
  },

  variants: {
    active: {
      true: {
        borderColor: "$primaryLight",
        backgroundColor: "$primaryLight",
        color: "$background",

        "&:hover": {
          borderColor: "$primaryLight",
        },
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Applications list                                                          */
/* -------------------------------------------------------------------------- */

export const Applications = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 18,

  "@sm": {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const EmptyState = styled("p", {
  gridColumn: "1 / -1",
  margin: 0,
  padding: "40px 0",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size13)",
  textAlign: "center",
});

export const Application = styled(Card, {
  display: "flex",
  gap: 12,
  minHeight: 154,
  padding: 16,

  "@media (min-width: 421px)": {
    gap: 20,
  },

  "@media (min-width: 1400px)": {
    minHeight: 175,
  },
});

export const PetSpace = styled("div", {
  flexShrink: 0,
  width: 32,

  "@media (min-width: 421px)": {
    width: 80,
  },

  "@sm": {
    width: 65,
  },

  "@media (min-width: 1001px)": {
    width: 102,
  },
});

export const ApplicationBody = styled("div", {
  flex: 1,
  minWidth: 0,
});

export const ApplicationTop = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 8,

  "@media (min-width: 421px)": {
    flexWrap: "nowrap",
  },

  "@sm": {
    flexWrap: "wrap",
  },

  "@media (min-width: 1001px)": {
    flexWrap: "nowrap",
  },

  h2: {
    margin: 0,
    fontSize: "var(--fontSizes-md)",
  },
});

export const Badge = styled("span", {
  padding: "4px 6px",
  borderRadius: "$sm",
  fontSize: "var(--fontSizes-size9)",
  fontWeight: 600,
  whiteSpace: "nowrap",

  variants: {
    tone: {
      analysis: {
        backgroundColor: "$inTreatmentBackground",
        color: "$inTreatment",
      },
      completed: {
        backgroundColor: "$positiveDark",
        color: "$background",
      },
      pending: {
        backgroundColor: "$pendingBackground",
        color: "$pending",
      },
      approved: {
        backgroundColor: "$positiveBackground",
        color: "$available",
      },
    },
  },
});

export const Description = styled("p", {
  margin: "8px 0",
  color: "$primary",
  fontSize: "var(--fontSizes-size10)",
  fontWeight: 600,
});

export const Organization = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: 5,
  margin: 0,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size10)",
});

export const Footer = styled("footer", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  marginTop: 30,
  paddingTop: 10,
  borderTop: "1px solid $border",

  "@media (min-width: 421px)": {
    flexWrap: "nowrap",
  },

  "@sm": {
    flexWrap: "wrap",
  },

  "@media (min-width: 1001px)": {
    flexWrap: "nowrap",
  },

  "@media (min-width: 1400px)": {
    marginTop: 40,
  },

  small: {
    color: "$textSubtle",
    fontSize: "var(--fontSizes-size9)",
  },
});

export const DetailsButton = styled(ActionButton, {
  padding: "6px 9px",
  fontSize: "var(--fontSizes-size10)",
});

/* -------------------------------------------------------------------------- */
/* Details dialog                                                             */
/* -------------------------------------------------------------------------- */

export const DialogText = styled("p", {
  margin: "0 0 12px",
  color: "$textSecondary",
  fontSize: "var(--fontSizes-sm)",
  lineHeight: 1.6,

  strong: {
    color: "$text",
  },
});
