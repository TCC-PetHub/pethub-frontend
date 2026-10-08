import { styled } from "@/styles";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Container = styled("div", {
  width: "100%",
});

export const Wrapper = styled("div", {
  position: "relative",
  width: "100%",

  variants: {
    file: {
      true: {
        border: "1px dashed $borderStrong",
        borderRadius: "var(--radii-input)",
        backgroundColor: "$backgroundSecondary",
        transition: "all 200ms ease",

        "&:focus-within": {
          borderColor: "$primaryLight",
          boxShadow: "var(--shadows-focusSoft)",
        },
      },
    },

    invalid: {
      true: {
        borderColor: "$negative",
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Campo                                                                      */
/* -------------------------------------------------------------------------- */

export const Field = styled("input", {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 16px",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$backgroundSecondary",
  color: "$text",
  fontFamily: "inherit",
  fontSize: "var(--fontSizes-sm)",
  lineHeight: 1.5,
  outline: "none",
  transition: "all 200ms ease",

  "&::placeholder": {
    color: "$textMuted",
    opacity: 1,
  },

  "&:focus": {
    borderColor: "$primaryLight",
    boxShadow: "var(--shadows-focusSoft)",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  variants: {
    compact: {
      true: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },

    hasIcon: {
      true: {
        paddingLeft: 40,
      },
    },

    hasToggle: {
      true: {
        paddingRight: 48,
      },
    },

    invalid: {
      true: {
        borderColor: "$negative",

        "&:focus": {
          borderColor: "$negative",
          boxShadow: "var(--shadows-focusNegative)",
        },
      },
    },

    // Input nativo de arquivo: fica invisível por cima do visual customizado.
    native: {
      true: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        height: "100%",
        opacity: 0,
        cursor: "pointer",

        "&:disabled": {
          opacity: 0,
          cursor: "default",
        },
      },
    },
  },
});

export const IconSlot = styled("span", {
  position: "absolute",
  top: "50%",
  left: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$textMuted",
  pointerEvents: "none",
  transform: "translateY(-50%)",
});

export const PasswordToggle = styled("button", {
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "0 16px",
  border: 0,
  borderRadius: "$md",
  backgroundColor: "transparent",
  color: "$textMuted",
  cursor: "pointer",
  transition: "all 200ms ease",

  "&:hover": {
    color: "$text",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "inset 0 0 0 2px var(--colors-primaryLight)",
  },
});

/* -------------------------------------------------------------------------- */
/* Arquivo                                                                    */
/* -------------------------------------------------------------------------- */

export const FileContent = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 10,
  padding: 12,
});

export const FileButton = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "$primaryLight",
  fontSize: "var(--fontSizes-sm)",
});

export const FileNames = styled("span", {
  color: "$textMuted",
  fontSize: "var(--fontSizes-xs)",
  overflowWrap: "anywhere",
});

export const FileHint = styled("p", {
  margin: "6px 0 0",
  color: "$textMuted",
  fontSize: "var(--fontSizes-xs)",
});

/* -------------------------------------------------------------------------- */
/* Erro                                                                       */
/* -------------------------------------------------------------------------- */

export const ErrorMessage = styled("p", {
  margin: "6px 0 0",
  color: "$negative",
  fontSize: "var(--fontSizes-xs)",
  lineHeight: 1.5,

  "@sm": {
    fontSize: "var(--fontSizes-sm)",
  },
});
