import React from "react";
import "./title.css";
import Typography from "@mui/material/Typography";

function Title({ title, mb = 2, color = "secondary", ...otherProps }) {
  return (
    <Typography
      className={"flex-center"}
      mb={mb}
      color={color}
      variant={"h4"}
      {...otherProps}
    >
      {title}
    </Typography>
  );
}

export default Title;
