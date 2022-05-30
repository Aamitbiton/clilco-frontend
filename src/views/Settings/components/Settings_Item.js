import React from "react";
import { Typography } from "@mui/material";
import defaultStyles from "../../../style/defaultStyles";

function SettingsItem({ icon, onClick, label }) {
  const ICON_SIZE = defaultStyles.icons.DEFAULT_LARGE_SIZE;
  return (
    <div
      className={"flex-column-center pointer"}
      style={{ fontSize: ICON_SIZE }}
      onClick={onClick}
    >
      {icon} <Typography align={"center"}>{label}</Typography>
    </div>
  );
}

export default SettingsItem;
