import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./startDate.css";
import AppStack from "../../../../components/AppStack";
import Typography from "@mui/material/Typography";
import AppButton from "../../../../components/Buttons/AppButton";
import defaultStyles from "../../../../style/defaultStyles";
import AppRoutes from "../../../../app/AppRoutes";

export const StartDate = ({ navigate }) => {
  return (
    <>
      <AppStack direction="column" spacing={1}>
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מוכנים?
        </Typography>
        <AppButton
          data_cy="go-to-date-btn"
          width={defaultStyles.inputs.STATIC_WIDTH}
          height={defaultStyles.inputs.STATIC_HEIGHT}
          backgroundColor={
            "linear-gradient(90deg, rgba(119,42,118,1) 1%, rgba(219,27,135,1) 97%)"
          }
          onClick={() => navigate("/lobby")}
          variant={"contained"}
          labelColor={"white"}
          label={"קח אותי לדייט"}
        />
      </AppStack>
    </>
  );
};
