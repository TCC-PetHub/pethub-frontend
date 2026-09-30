import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, createTheme, theme } =
  createStitches({
    theme: {
      colors: {
        // Base
        text: "#0F172A",
        textSecondary: "#475569",
        textMuted: "#64748B",

        background: "#FFFFFF",
        backgroundSecondary: "#F1F5F9",
        border: "#E2E8F0",

        // Cores principais
        primary: "#115E59",
        primaryLight: "#0D9488",
        warning: "#F59E0B",

        // Status
        negative: "#EF4444",
        negativeBackground: "#FEE2E2",

        positive: "#10B981",
        positiveBackground: "#D1FAE5",

        inTreatment: "#D97706",
        inTreatmentBackground: "#FEF3C7",

        available: "#059669",

        // Adoção
        adoptedBackground: "#CCFBF1",

        // Gênero
        male: "#1D4ED8",
        maleBackground: "#DBEAFE",

        female: "#BE185D",
        femaleBackground: "#FCE7F3",

        // Idade
        age: "#115E59",
        ageBackground: "#CCFBF1",
      },

      fonts: {
        sans: "Arial, Helvetica, sans-serif",
        mono: "monospace",
      },

      fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },

      space: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      radii: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },

      shadows: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
        md: "0 4px 6px rgba(15, 23, 42, 0.08)",
        lg: "0 10px 15px rgba(15, 23, 42, 0.10)",
      },
    },

    media: {
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      xl: "(min-width: 1280px)",
    },
  });
