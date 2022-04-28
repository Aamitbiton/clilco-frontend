import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function SimpleTooltip({
  children,
  leaveDelay = 200,
  enterDelay = 500,
  title,
}) {
  return (
    <Tooltip title={title} enterDelay={enterDelay} leaveDelay={leaveDelay}>
      {children}
    </Tooltip>
  );
}
