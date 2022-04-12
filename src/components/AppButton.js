import React from "react";
import Button from "@mui/material/Button";
import IconRender from "./iconRender";

function AppButton({
  backgroundColor,
  labelColor,
  label,
  onClick,
  disabled = false,
  variant = "outlined",
  startIcon,
  endIcon,
  borderColor,
  customIcon = true,
  rounded = true,
  ...otherProps
}) {
  const style = {
    borderRadius: rounded && 50,
    border: `2px solid ${
      borderColor ? borderColor : !backgroundColor && "turquoise"
    }`,
    background: backgroundColor && backgroundColor,
    justifyContent: "center",
  };

  return (
    <Button
      endIcon={
        endIcon && (customIcon ? <IconRender icon={endIcon} /> : startIcon)
      }
      variant={variant}
      {...otherProps}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <b className={"flex-center"} style={{ color: labelColor }}>
        {label}
      </b>
    </Button>
  );
}

export default AppButton;
