import React from "react";
import Typography from "@mui/material/Typography";

function Title({ title, mt = 7, color = "secondary", ...otherProps }) {
  return (
    <Typography mt={mt} color={color} variant={"h4"} {...otherProps}>
      {title}
    </Typography>
  );
}

export default Title;
