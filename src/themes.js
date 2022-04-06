import React from "react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
const { background, turquoise, light, purple, grey } = Object.freeze({
  turquoise: "#0ae5c0",
  background: "#2d3138",
  grey: "#c5c9d6",
  light: "#ffffff",
  purple: "#db1b87",
});

export const theme = createTheme({
  direction: "rtl",
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

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export function RTL({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
