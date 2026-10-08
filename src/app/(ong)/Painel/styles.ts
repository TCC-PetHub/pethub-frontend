import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Cabeçalho                                                                  */
/* -------------------------------------------------------------------------- */

export const Header = styled("header", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 24,
});

export const HeaderText = styled("div", {
  h1: {
    margin: 0,
    color: "$text",
    fontSize: "$xl",
    fontWeight: 700,
    lineHeight: 1.3,
  },

  p: {
    margin: "4px 0 0",
    color: "$textMuted",
    fontSize: "$size13",
  },
});

export const HeaderActions = styled("div", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: 12,
});

export const PeriodButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$background",
  color: "$text",
  fontFamily: "inherit",
  fontSize: "$size13",
  fontWeight: 500,
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

export const IconButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  padding: 0,
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$background",
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

/* -------------------------------------------------------------------------- */
/* Indicadores                                                                */
/* -------------------------------------------------------------------------- */

export const Stats = styled("section", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  marginBottom: 24,

  "@sm": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@lg": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

export const Stat = styled("article", {
  padding: 20,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  transition: "all 200ms ease",

  variants: {
    highlight: {
      true: {
        borderColor: "$primaryLight",
        boxShadow: "inset 0 0 0 1px $colors$primaryLight",
      },
    },
  },
});

export const StatHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
});

export const StatLabel = styled("span", {
  color: "$textSecondary",
  fontSize: "$size13",
});

export const StatValue = styled("strong", {
  display: "block",
  marginTop: 8,
  color: "$text",
  fontSize: "$size27",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const Badge = styled("span", {
  padding: "2px 8px",
  borderRadius: "$sm",
  fontSize: "$size11",
  fontWeight: 600,

  variants: {
    trend: {
      up: {
        backgroundColor: "$positiveBackground",
        color: "$positive",
      },
      down: {
        backgroundColor: "$negativeBackground",
        color: "$negative",
      },
    },
  },

  defaultVariants: {
    trend: "up",
  },
});

/* -------------------------------------------------------------------------- */
/* Linhas e cards                                                             */
/* -------------------------------------------------------------------------- */

export const Row = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  marginBottom: 24,

  variants: {
    layout: {
      charts: {
        "@lg": {
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        },
      },
      lists: {
        "@lg": {
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
        },
      },
    },
  },
});

export const Card = styled("section", {
  minWidth: 0,
  padding: 20,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
});

export const CardTitle = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: "$md",
  fontWeight: 700,
});

export const CardSubtitle = styled("p", {
  margin: "2px 0 0",
  color: "$textMuted",
  fontSize: "$xs",
});

/* -------------------------------------------------------------------------- */
/* Gráficos                                                                   */
/* -------------------------------------------------------------------------- */

export const ChartBox = styled("div", {
  width: "100%",
  height: 260,
  marginTop: 16,
});

export const DonutWrap = styled("div", {
  position: "relative",
  width: "100%",
  height: 200,
  marginTop: 16,
});

export const DonutCenter = styled("div", {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",

  strong: {
    color: "$text",
    fontSize: "$xl",
    fontWeight: 700,
    lineHeight: 1.2,
  },

  span: {
    color: "$textMuted",
    fontSize: "$size10",
  },
});

export const Legend = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  margin: "16px 0 0",
  padding: 0,
  listStyle: "none",
});

export const LegendItem = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "$textSecondary",
  fontSize: "$size13",

  span: {
    flex: 1,
  },

  strong: {
    color: "$text",
    fontWeight: 600,
  },
});

export const Swatch = styled("span", {
  width: 10,
  height: 10,
  borderRadius: 3,
});

/* -------------------------------------------------------------------------- */
/* Top organizações                                                           */
/* -------------------------------------------------------------------------- */

export const Bars = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  marginTop: 20,
});

export const BarRow = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const BarHeader = styled("div", {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 8,
  color: "$text",
  fontSize: "$size13",
  fontWeight: 500,

  "span:last-child": {
    color: "$textMuted",
    fontSize: "$size11",
    fontWeight: 400,
  },

  strong: {
    color: "$text",
    fontSize: "$size13",
    fontWeight: 700,
  },
});

export const BarTrack = styled("div", {
  width: "100%",
  height: 8,
  borderRadius: "$full",
  backgroundColor: "$backgroundSecondary",
  overflow: "hidden",
});

export const BarFill = styled("div", {
  height: "100%",
  borderRadius: "$full",
  backgroundColor: "$primaryLight",
  transition: "width 400ms ease",

  variants: {
    highlight: {
      true: {
        backgroundColor: "$warning",
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Atividades recentes                                                        */
/* -------------------------------------------------------------------------- */

export const ActivityList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  margin: "12px 0 0",
  padding: 0,
  listStyle: "none",
});

export const ActivityItem = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "14px 0",
  borderBottom: "1px solid $border",

  "&:last-child": {
    borderBottom: 0,
  },
});

export const ActivityAvatar = styled("span", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "$md",
  backgroundColor: "$backgroundSecondary",
  color: "$primaryLight",
});

export const ActivityInfo = styled("div", {
  flex: 1,
  minWidth: 0,

  p: {
    margin: 0,
    color: "$textSecondary",
    fontSize: "$size13",
  },

  strong: {
    color: "$text",
    fontWeight: 700,
  },

  small: {
    display: "block",
    marginTop: 2,
    color: "$textMuted",
    fontSize: "$size11",
    lineHeight: 1.4,
  },
});

export const ActivityTime = styled("span", {
  flexShrink: 0,
  color: "$textMuted",
  fontSize: "$size11",
});
