import { createTheme } from "@mui/material/styles";

const { background, turquoise, light, purple, grey } = Object.freeze({
  turquoise: "#0ae5c0",
  background: "#2d3138",
  grey: "#c5c9d6",
  light: "#ffffff",
  purple: "#db1b87",
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: background,
    },
    primary: {
      main: turquoise,
    },
    secondary: {
      main: purple,
    },
  },
});
