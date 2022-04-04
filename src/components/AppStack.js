import React from "react";
import Stack from "@mui/material/Stack";
function AppStack({
  children,
  flexWrap = "wrap",
  direction = "row",
  spacing = 2,
}) {
  return (
    <Stack
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
