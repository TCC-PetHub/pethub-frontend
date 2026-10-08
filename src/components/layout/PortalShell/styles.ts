import { styled } from "@/styles";

export const Page = styled("div", {
  minHeight: "100vh",
  backgroundColor: "$backgroundPage",
  color: "$text",
  fontFamily: "$sans",
  fontSize: "var(--fontSizes-sm)",
});

export const Main = styled("main", {
  maxWidth: 1280,
  margin: "auto",
  padding: "30px 24px 55px",

  "@media (max-width: 767px)": {
    padding: "24px 16px 40px",
  },
});
