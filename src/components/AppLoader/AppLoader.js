import React from "react";
import { CircularProgress } from "@mui/material";

function AppLoader(props) {
  return (
    <div className={"full-screen flex-center"}>
      <CircularProgress size={100} />
    </div>
  );
}

export default AppLoader;
