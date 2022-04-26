import React from "react";
import Typography from "@mui/material/Typography";
import "./title.css";
function Title({
  title,
  mt = 7,
  mb = 2,
  color = "secondary",
  fontSize,
  underline = false,
  className = "",
  ...otherProps
}) {
  return (
    <Typography
      mt={mt}
      mb={mb}
      sx={{ textDecoration: underline && "underline" }}
      color={color}
      fontSize={fontSize}
      variant={"h4"}
      className={className}
      {...otherProps}
    >
      {title}
    </Typography>
  );
}

export default Title;
