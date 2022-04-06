import React from "react";
import Stack from "@mui/material/Stack";
function AppStack({
  children,
  margin,
  flexWrap = "wrap",
  direction = "row",
  spacing = 2,
  ...otherProps
}) {
  return (
    <Stack
      margin={margin}
      {...otherProps}
      draggable={true}
      flexWrap={flexWrap}
      spacing={spacing}
      direction={direction}
    >
      {children}
    </Stack>
  );
}

export default AppStack;
