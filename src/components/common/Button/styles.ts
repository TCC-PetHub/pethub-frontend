import { styled } from "@/styles";

export const StyledButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "1px solid transparent",
  borderRadius: "$lg",
  fontFamily: "inherit",
  fontWeight: 600,
  whiteSpace: "nowrap",
  cursor: "pointer",
  outline: "none",
  transition: "all 200ms ease",

  "&:not(:disabled):hover": {
    opacity: 0.95,
    transform: "scale(1.01)",
  },

  "&:not(:disabled):active": {
    transform: "scale(0.99)",
  },

  "&:focus-visible": {
    boxShadow: "var(--shadows-focus)",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary",
        color: "$background",
      },

      tertiary: {
        backgroundColor: "$primaryLight",
        color: "$background",
      },

      secondary: {
        borderColor: "$border",
        backgroundColor: "$backgroundSecondary",
        color: "$text",

        "&:not(:disabled):hover": {
          borderColor: "$textMuted",
          backgroundColor: "$border",
        },
      },

      ghost: {
        backgroundColor: "transparent",
        color: "$textSecondary",

        "&:not(:disabled):hover": {
          backgroundColor: "$backgroundSecondary",
          color: "$primary",
        },
      },

      danger: {
        backgroundColor: "$negative",
        color: "$background",
      },

      "danger-ghost": {
        borderColor: "$negative",
        backgroundColor: "transparent",
        color: "$negative",

        "&:not(:disabled):hover": {
          backgroundColor: "$negative",
          color: "$background",
        },
      },

      "success-ghost": {
        borderColor: "$positive",
        backgroundColor: "$positiveBackground",
        color: "$positive",

        "&:not(:disabled):hover": {
          backgroundColor: "$positive",
          color: "$background",
        },
      },
    },

    size: {
      sm: {
        height: 32,
        padding: "0 12px",
        fontSize: "var(--fontSizes-size13)",
      },
      md: {
        padding: "12px 16px",
        fontSize: "var(--fontSizes-sm)",
      },
    },

    fullWidth: {
      true: { width: "100%" },
      false: { width: "auto" },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: true,
  },
});
