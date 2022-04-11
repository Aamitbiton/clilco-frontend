import React from "react";
import Typography from "@mui/material/Typography";

function Title({ title, mt = 7, color = "secondary", ...otherProps }) {
  const style = { position: "fixed" };

  return (
    <Typography
      style={style}
      className={"flex-center full-width"}
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
