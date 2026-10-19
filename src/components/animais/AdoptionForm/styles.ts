import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Card = styled("section", {
  backgroundColor: "$background",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$card",
});

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 20,

  "@sm": {
    gridTemplateColumns: "260px 1fr",
    alignItems: "start",
  },
});

/* -------------------------------------------------------------------------- */
/* Progress                                                                   */
/* -------------------------------------------------------------------------- */

export const ProgressCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 20,
  padding: "20px",

  "@sm": {
    padding: "22px 24px",
  },
});

export const ProgressRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  color: "$text",
  fontSize: "var(--fontSizes-size13)",
});

export const Badge = styled("span", {
  display: "inline-block",
  padding: "4px 7px",
  borderRadius: "$control",
  backgroundColor: "$adoptedBackground",
  color: "$primary",
  fontSize: "var(--fontSizes-size10)",
  fontWeight: 600,
  letterSpacing: "0.08em",
});

export const StepNumber = styled("span", {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "var(--radii-circle)",
  backgroundColor: "$backgroundSecondary",
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
  fontWeight: 600,
  transition: "all 200ms ease",
});

export const Steps = styled("ol", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
  margin: 0,
  padding: 0,
  listStyle: "none",

  "@sm": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
});

export const Step = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size13)",
  fontWeight: 500,
  transition: "all 200ms ease",

  variants: {
    active: {
      true: {
        color: "$primary",
        fontWeight: 600,

        [`& ${StepNumber}`]: {
          backgroundColor: "$primaryLight",
          color: "$background",
        },
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Pet summary                                                                */
/* -------------------------------------------------------------------------- */

export const PetCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "20px",
});

export const PetPhoto = styled("div", {
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: "$control",
  backgroundColor: "$adoptedBackground",
});

export const PetName = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: "var(--fontSizes-lg)",
  fontWeight: 700,
});

export const PetMeta = styled("p", {
  display: "flex",
  alignItems: "center",
  gap: 7,
  margin: 0,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",

  svg: {
    flexShrink: 0,
    width: 13,
    height: 13,
    color: "$primaryLight",
  },
});

export const PetDivider = styled("hr", {
  width: "100%",
  margin: "4px 0",
  border: 0,
  borderTop: "1px solid $border",
});

export const PetNote = styled("small", {
  color: "$textMuted",
  fontSize: "var(--fontSizes-size10)",
  lineHeight: 1.5,
});

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

export const FormPanel = styled(Card, {
  padding: "20px",

  "@sm": {
    padding: "24px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

export const FormTitle = styled("h2", {
  margin: 0,
  color: "$text",
  fontSize: "var(--fontSizes-lg)",
  fontWeight: 700,
});

export const FormGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,

  "@sm": {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Field = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const Label = styled("label", {
  color: "$text",
  fontSize: "var(--fontSizes-size13)",
  fontWeight: 600,
});

export const ErrorMessage = styled("p", {
  margin: 0,
  color: "$negative",
  fontSize: "var(--fontSizes-xs)",
});

export const Muted = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: "var(--fontSizes-size11)",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

/* -------------------------------------------------------------------------- */
/* Switch                                                                     */
/* -------------------------------------------------------------------------- */

export const SwitchRow = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  color: "$text",
  fontSize: "var(--fontSizes-size13)",
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
/* Term & consent                                                             */
/* -------------------------------------------------------------------------- */

export const Term = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "16px",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$backgroundSecondary",
  color: "$textSecondary",
  fontSize: "var(--fontSizes-size13)",
  lineHeight: 1.6,

  p: {
    margin: 0,
  },

  strong: {
    color: "$text",
  },
});

export const Checkbox = styled("label", {
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  color: "$textSecondary",
  fontSize: "var(--fontSizes-size13)",
  lineHeight: 1.5,
  cursor: "pointer",

  input: {
    appearance: "none",
    flexShrink: 0,
    width: 16,
    height: 16,
    margin: "2px 0 0",
    border: "1.5px solid $textMuted",
    borderRadius: "$sm",
    backgroundColor: "$background",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "12px",
    cursor: "pointer",
    transition: "all 200ms ease",

    "&:checked": {
      borderColor: "$primaryLight",
      backgroundColor: "$primaryLight",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3.5 8.5 6.5 11.5 12.5 4.5'/%3E%3C/svg%3E\")",
    },

    "&:focus-visible": {
      outline: "none",
      boxShadow: "var(--shadows-focusMint)",
    },
  },
});
