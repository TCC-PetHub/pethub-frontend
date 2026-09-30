import { globalCss } from "./theme";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
  },

  html: {
    margin: 0,
    padding: 0,
  },

  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "$background",
    color: "$text",
    fontFamily: "$sans",
  },

  button: {
    fontFamily: "inherit",
    cursor: "pointer",
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },
});