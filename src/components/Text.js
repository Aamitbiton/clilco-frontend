import React from "react";
import Typography from "@mui/material/Typography";

function Text({ children, sx, align, color, ...otherProps }) {
  return (
    <Typography align={align} sx={sx} color={color} {...otherProps}>
      {children}
    </Typography>
  );
}

export default Text;
