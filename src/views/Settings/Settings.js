import React from "react";
import { Header } from "../home/components/header/header";
import Typography from "@mui/material/Typography";
import CenterLayout from "../../components/CenterLayout";

function Settings(props) {
  return (
    <>
      <Header />
      <CenterLayout>
        <Typography>הגדרות!!!</Typography>
      </CenterLayout>
    </>
  );
}

export default Settings;
