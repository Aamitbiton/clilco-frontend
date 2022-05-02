import React from "react";
import Button from "@mui/material/Button";
import IconRender from "../iconRender";
import "../../style/colors.scss";

function AppButton({
  backgroundColor,
  labelColor,
  label,
  onClick,
  width,
  height,
  disabled = false,
  variant = "outlined",
  startIcon,
  endIcon,
  borderColor,
  fontSize = 16,
  margin,
  children,
  customIcon = true,
  rounded = true,
  ...otherProps
}) {
  const style = {
    borderRadius: rounded && 50,
    fontSize,
    border: `2px solid ${
      borderColor ? borderColor : !backgroundColor && "turquoise"
    }`,
    background: backgroundColor && backgroundColor,
    justifyContent: "center",
    width,
    height,
    margin,
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
      {children && children}
    </Button>
  );
}

export default AppButton;
