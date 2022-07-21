import React from "react";
import Fade from "@mui/material/Fade";

function FadeAnimation({ children, visible, timeout = 400 }) {
  return (
    <Fade timeout={timeout} in={visible}>
      <div>{children}</div>
    </Fade>
  );
}

export default FadeAnimation;
