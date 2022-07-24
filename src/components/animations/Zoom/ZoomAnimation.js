import React from "react";
import { Zoom } from "@mui/material";

function ZoomAnimation({ children, visible }) {
  return (
    <Zoom in={visible} style={{ transitionDelay: visible ? "500ms" : "0ms" }}>
      <div>{children}</div>
    </Zoom>
  );
}

export default ZoomAnimation;
