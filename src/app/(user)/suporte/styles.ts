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

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "2.1fr 1fr",
  gap: 20,
  alignItems: "start",

  [tablet]: {
    gridTemplateColumns: "1.7fr 1fr",
  },

  [mobile]: {
    gridTemplateColumns: "1fr",
  },
});

export const Panel = styled("section", {
  overflow: "hidden",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
});

export const PanelTitle = styled("h2", {
  margin: "0 0 8px",
  fontSize: "var(--fontSizes-size15)",
});

export const Muted = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  lineHeight: 1.5,
});

/* Formulário */

export const FormPanel = styled(Panel, {
  padding: 22,

  [mobile]: {
    padding: 18,
  },
});

export const FormTitle = styled(PanelTitle, {
  marginBottom: 18,
  paddingBottom: 14,
  borderBottom: "1px solid $border",
});

export const Field = styled("label", {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  marginBottom: 14,
  color: "$textSecondary",
  fontSize: "var(--fontSizes-size11)",
});

export const TypeOptions = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 7,
  margin: "0 0 16px",
});

export const TypeButton = styled("button", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 5,
  padding: 12,
  border: "1px solid $border",
  borderRadius: "var(--radii-input)",
  backgroundColor: "$background",
  color: "$textMuted",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size10)",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    borderColor: "$textMuted",
  },

  ...focusRing,

  [tablet]: {
    padding: "10px 4px",
  },

  variants: {
    selected: {
      true: {
        borderColor: "$primaryLight",
        backgroundColor: "$backgroundMint",
        color: "$primaryHover",
      },
    },
  },
});

export const FormGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,

  [compact]: {
    gridTemplateColumns: "1fr",
    gap: 0,
  },
});

export const FormActions = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
  marginTop: 18,
  paddingTop: 16,
  borderTop: "1px solid $border",

  [compact]: {
    alignItems: "flex-start",
  },
});

export const FormHint = styled("small", {
  maxWidth: 280,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size10)",
  lineHeight: 1.5,
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

/* FAQ e ajuda */

export const FaqPanel = styled(Panel, {
  padding: 20,
});

export const FaqItem = styled("details", {
  padding: "14px 0",
  borderBottom: "1px solid $border",
  fontSize: "var(--fontSizes-size11)",
});

export const FaqQuestion = styled("summary", {
  color: "$textSecondary",
  fontWeight: 600,
  lineHeight: 1.5,
  cursor: "pointer",

  ...focusRing,
});

export const FaqAnswer = styled("p", {
  margin: "8px 0 0",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  lineHeight: 1.6,
});

export const HelpBox = styled("section", {
  marginTop: 16,
  padding: 18,
  border: "1px solid $primaryBorder",
  borderRadius: "var(--radii-panel)",
  backgroundColor: "$backgroundMint",
});

export const HelpTitle = styled("h2", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: 0,
  color: "$primaryHover",
  fontSize: "$xs",
});

export const HelpText = styled("p", {
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  lineHeight: 1.6,
});

/* Minhas solicitações */

export const TicketPanel = styled(Panel, {
  marginTop: 22,
  padding: 20,

  [mobile]: {
    padding: 16,
  },
});

export const TicketHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
  marginBottom: 14,

  select: {
    width: "auto",
  },

  [mobile]: {
    alignItems: "flex-start",

    select: {
      maxWidth: 140,
    },
  },

  [compact]: {
    gap: 8,
  },
});

export const TableScroll = styled("div", {
  overflowX: "auto",
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

  "td strong": {
    color: "$primaryHover",
  },

  [mobile]: {
    minWidth: 520,
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

export const TextButton = styled("button", {
  border: 0,
  backgroundColor: "transparent",
  color: "$primaryHover",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-size11)",
  whiteSpace: "nowrap",
  cursor: "pointer",

  ...focusRing,
});

export const TableNote = styled(Muted, {
  marginTop: 5,
});

/* Modal */

export const Modal = styled("dialog", {
  position: "relative",
  width: "calc(100% - 32px)",
  maxWidth: 480,
  padding: 28,
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$background",
  color: "$text",
  lineHeight: 1.6,

  "&::backdrop": {
    background: "var(--colors-overlay)",
  },
});

export const ModalTitle = styled("h2", {
  margin: "0 0 8px",
  fontSize: "var(--fontSizes-size15)",
});

export const CloseButton = styled("button", {
  position: "absolute",
  top: 10,
  right: 10,
  border: 0,
  backgroundColor: "transparent",
  color: "$textMuted",
  cursor: "pointer",

  ...focusRing,
});
