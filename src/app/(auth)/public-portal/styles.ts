import Link from "next/link";

import { globalCss, styled } from "@/styles";

export const resetGlobal = globalCss({
  "*, *::before, *::after": { boxSizing: "border-box" },
  "html, body": { margin: 0, padding: 0 },
});

export const Page = styled("div", {
  minHeight: "100vh",
  fontFamily: "$sans",
  color: "$text",
  backgroundColor: "$background",
});

export const Inner = styled("div", {
  width: "100%",
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 $md",

  "@lg": {
    padding: "0 $lg",
  },
});

/* ---------- Seções ---------- */

export const Section = styled("section", {
  padding: "$2xl 0",

  "@md": {
    padding: "64px 0",
  },

  variants: {
    tone: {
      mint: {
        backgroundColor: "#F0FDFA",
        borderTop: "1px solid #CCFBF1",
        borderBottom: "1px solid #CCFBF1",
      },
    },
  },
});

export const SectionHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  marginBottom: "$lg",

  "@sm": {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "$md",
  },
});

export const SectionTitle = styled("h2", {
  margin: "$sm 0 0",
  fontSize: "$2xl",
  fontWeight: 700,
  lineHeight: 1.2,

  "@md": {
    fontSize: "$3xl",
  },
});

export const SectionSubtitle = styled("p", {
  margin: "$xs 0 0",
  maxWidth: 560,
  color: "$textSecondary",
  fontSize: "$sm",
  lineHeight: 1.5,
});

export const SeeAll = styled(Link, {
  display: "inline-flex",
  alignItems: "center",
  gap: "$xs",
  color: "$primaryLight",
  fontSize: "$xs",
  fontWeight: 600,
  textDecoration: "none",
  whiteSpace: "nowrap",

  "&:hover": {
    color: "$primary",
    textDecoration: "underline",
  },
});

export const Badge = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  borderRadius: "$full",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",

  variants: {
    tone: {
      amber: {
        backgroundColor: "$inTreatmentBackground",
        color: "$inTreatment",
      },
      teal: {
        backgroundColor: "$adoptedBackground",
        color: "$primary",
      },
    },
  },
});

/* ---------- Hero ---------- */

export const Hero = styled("section", {
  padding: "$2xl 0",

  "@md": {
    padding: "72px 0",
  },
});

export const HeroTitle = styled("h1", {
  maxWidth: 520,
  margin: "$md 0",
  fontSize: "$3xl",
  fontWeight: 700,
  lineHeight: 1.15,

  "@md": {
    fontSize: "3rem",
  },
});

export const HeroText = styled("p", {
  maxWidth: 520,
  margin: 0,
  color: "$textSecondary",
  fontSize: "$md",
  lineHeight: 1.6,
});

export const SearchForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  maxWidth: 560,
  marginTop: "$lg",

  "@sm": {
    flexDirection: "row",
  },
});

export const SearchField = styled("div", {
  flex: 1,
});

export const SearchAction = styled("div", {
  width: "100%",

  "@sm": {
    width: 120,
  },
});

export const Chips = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$sm",
  marginTop: "$md",
});

export const Chip = styled("button", {
  padding: "6px 14px",
  border: "1px solid $border",
  borderRadius: "$full",
  backgroundColor: "$background",
  color: "$textSecondary",
  fontFamily: "inherit",
  fontSize: "$xs",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    borderColor: "$primaryLight",
  },

  "&:focus-visible": {
    outline: "2px solid $primaryLight",
    outlineOffset: 2,
  },

  variants: {
    active: {
      true: {
        borderColor: "$primaryLight",
        backgroundColor: "$adoptedBackground",
        color: "$primary",
      },
    },
  },
});

/* ---------- Grids e cards ---------- */

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$md",

  "@sm": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  variants: {
    cols: {
      3: {
        "@lg": { gridTemplateColumns: "repeat(3, 1fr)" },
      },
      4: {
        "@lg": { gridTemplateColumns: "repeat(4, 1fr)" },
      },
    },
  },
});

export const Card = styled("article", {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  boxShadow: "$sm",
});

export const CardBody = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  padding: "$md",
});

export const CardTop = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const IconBox = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "$md",
  backgroundColor: "$backgroundSecondary",
  color: "$textMuted",
});

export const Tag = styled("span", {
  padding: "2px 8px",
  borderRadius: "$sm",
  fontSize: 10,
  fontWeight: 600,

  variants: {
    tone: {
      age: { backgroundColor: "$ageBackground", color: "$age" },
      male: { backgroundColor: "$maleBackground", color: "$male" },
      female: { backgroundColor: "$femaleBackground", color: "$female" },
      amber: {
        backgroundColor: "$inTreatmentBackground",
        color: "$inTreatment",
      },
      blue: { backgroundColor: "$maleBackground", color: "$male" },
    },
  },
});

export const CardTitle = styled("h3", {
  margin: 0,
  fontSize: "$md",
  fontWeight: 700,
});

export const CardMeta = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: "$xs",
  margin: 0,
  color: "$textMuted",
  fontSize: "$xs",
});

/* ---------- Campanhas ---------- */

export const ProgressTrack = styled("div", {
  height: 6,
  overflow: "hidden",
  borderRadius: "$full",
  backgroundColor: "$border",
});

export const ProgressFill = styled("div", {
  height: "100%",
  borderRadius: "$full",
  backgroundColor: "$primaryLight",
});

export const ProgressValues = styled("div", {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "$sm",
  fontSize: "$xs",

  strong: {
    color: "$primary",
    fontSize: "$sm",
  },

  span: {
    color: "$textMuted",
  },
});

/* ---------- Animais ---------- */

export const AnimalPhoto = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: "4 / 3",
  backgroundColor: "$backgroundSecondary",
  color: "$border",
});

export const TagRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$xs",
});

/* ---------- ONGs ---------- */

export const PartnerCard = styled(Card, {
  gap: "$md",
  padding: "$md",
  boxShadow: "none",
});

export const PartnerName = styled("strong", {
  fontSize: "$sm",
});

export const PartnerFooter = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "$sm",
  borderTop: "1px solid $border",
  color: "$textMuted",
  fontSize: "$xs",

  strong: {
    color: "$primaryLight",
    fontSize: "$sm",
  },
});

/* ---------- Footer ---------- */

export const Footer = styled("footer", {
  padding: "$2xl 0 $lg",
  backgroundColor: "$text",
  color: "#94A3B8",
});

export const FooterGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$xl",

  "@sm": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@lg": {
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
  },
});

export const FooterText = styled("p", {
  maxWidth: 320,
  margin: "$md 0 0",
  fontSize: "$xs",
  lineHeight: 1.6,
});

export const FooterTitle = styled("h4", {
  margin: "0 0 $md",
  color: "#FFFFFF",
  fontSize: "$sm",
  fontWeight: 600,
});

export const FooterList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  margin: 0,
  padding: 0,
  listStyle: "none",
  fontSize: "$xs",

  a: {
    color: "#94A3B8",
    textDecoration: "none",
    transition: "color 200ms ease",

    "&:hover": {
      color: "#FFFFFF",
    },
  },
});

export const FooterBottom = styled("div", {
  marginTop: "$xl",
  paddingTop: "$md",
  borderTop: "1px solid #1E293B",
  fontSize: "$xs",
});

/* ---------- Apenas desenvolvimento ---------- */

export const DevToggle = styled("button", {
  position: "fixed",
  right: "$md",
  bottom: "$md",
  zIndex: 50,
  padding: "10px 14px",
  border: "1px solid $primaryLight",
  borderRadius: "$md",
  backgroundColor: "$background",
  boxShadow: "$md",
  color: "$primary",
  fontFamily: "inherit",
  fontSize: "$xs",
  fontWeight: 600,
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$adoptedBackground",
  },
});