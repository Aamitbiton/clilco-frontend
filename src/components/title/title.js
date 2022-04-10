import React from "react";
import Typography from "@mui/material/Typography";

function Title({ title, mb = 2, color = "secondary", ...otherProps }) {
  return (
    <Typography mb={mb} color={color} variant={"h4"} {...otherProps}>
      {title}
    </Typography>
  );
}

export default Title;
