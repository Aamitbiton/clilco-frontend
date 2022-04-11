import React from "react";
import Typography from "@mui/material/Typography";

function Title({ title, mt = 3, color = "secondary", ...otherProps }) {
  return (
    <Typography
      className={"flex-center"}
      mt={mt}
      color={color}
      variant={"h4"}
      {...otherProps}
    >
      {title}
    </Typography>
  );
}

export default Title;
