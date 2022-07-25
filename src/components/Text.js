import React from "react";
import Typography from "@mui/material/Typography";

function Text({ children, sx, align, color, fontSize, ...otherProps }) {
  return (
    <Typography
      align={align}
      sx={sx}
      color={color}
      fontSize={fontSize}
      {...otherProps}
    >
      {children}
    </Typography>
  );
}

export default Text;
