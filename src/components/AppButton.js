import React from "react";
import RaisedButton  from "@mui/material/Button";
import IconRender from "./iconRender";

function AppButton({
labelColor,
  label,
  onClick,
  disabled = false,
  variant = "outlined",
  startIcon,
  endIcon,
  customIcon = true,
  rounded = true,
  ...otherProps
}) {

  const style = {
    borderRadius: rounded && 50,
    justifyContent: 'space-between'

  }
  return (
    <RaisedButton
      endIcon={
          endIcon && (customIcon ? <IconRender icon={endIcon} /> : endIcon)
      }
      variant={variant}
      {...otherProps}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <b style={{color:labelColor}} >{label}</b>
    </RaisedButton >
  );
}

export default AppButton;
