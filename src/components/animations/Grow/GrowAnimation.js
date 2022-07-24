import React from "react";
import { Grow } from "@mui/material";

function GrowAnimation({ children, visible }) {
  return (
    <Grow
      in={visible}
      style={{ transformOrigin: "0 0 0" }}
      {...(visible ? { timeout: 1000 } : {})}
    >
      <div>{children}</div>
    </Grow>
  );
}

export default GrowAnimation;
