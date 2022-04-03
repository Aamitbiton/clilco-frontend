import React from "react";
import Button from "@mui/material/Button";

function AppButton({
  label,
  onClick,
  disabled = false,
  variant = "outlined",
  startIcon,
  endIcon,
  ...otherProps
}) {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      {...otherProps}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default AppButton;
