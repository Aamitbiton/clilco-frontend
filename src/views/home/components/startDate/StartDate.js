import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./startDate.css";
import AppStack from "../../../../components/AppStack";
import Typography from "@mui/material/Typography";
import AppButton from "../../../../components/Buttons/AppButton";
import defaultStyles from "../../../../style/defaultStyles";

export const StartDate = ({ navigate }) => {
  return (
    <>
      <div className="start-date flex-center full-width">
        <AppStack direction="column" spacing={1}>
          <Typography className={"flex-center"} color={"white"} variant={"h5"}>
            מוכנים?
          </Typography>
          <AppButton
            width={defaultStyles.inputs.STATIC_WIDTH}
            height={defaultStyles.inputs.STATIC_HEIGHT}
            backgroundColor={
              "linear-gradient(90deg, rgba(119,42,118,1) 1%, rgba(219,27,135,1) 97%)"
            }
            onClick={() => navigate("/video-date")}
            variant={"contained"}
            labelColor={"white"}
            label={"קח אותי לדייט"}
          />
          <AppButton labelColor={"white"} label={"צפה במשתמשים "} />
        </AppStack>
      </div>
    </>
  );
};
