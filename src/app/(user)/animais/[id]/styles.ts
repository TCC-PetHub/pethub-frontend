import { styled } from "@/styles";

const mobile = "@media (max-width: 767px)";

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
