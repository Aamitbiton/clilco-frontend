import React from "react";
import IconButton from "@mui/material/IconButton";

function AppIconButton({
  size,
  disabled = false,
  color,
  children,
  ...otherProps
}) {
  return (
    <IconButton size={size} disabled={disabled} color={color} {...otherProps}>
      {children}
    </IconButton>
  );
}

export default AppIconButton;
