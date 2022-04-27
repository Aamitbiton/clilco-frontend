import React, { useState, useEffect } from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";
import Typography from "@mui/material/Typography";
import AppStack from "../../../../components/AppStack";
import AppButton from "../../../../components/Buttons/AppButton";
import AppRoutes from "../../../../app/AppRoutes";
import { set_its_dating_time } from "../../../../store/video/videoFunctions";

export const NotDateTime = ({ navigate, datesStartedMilliseconds }) => {
  const { PROFILE, VIEW_USERS } = AppRoutes;
  return (
    <div className="flex-center  full-width ">
      <AppStack direction="column" spacing={1}>
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מתחילים בעוד
        </Typography>
        <Timer
          endAction={() => set_its_dating_time(true)}
          style={{ width: "100%" }}
          expiredMilliseconds={datesStartedMilliseconds}
        />
        <AppButton
          onClick={() => navigate(VIEW_USERS)}
          labelColor={"white"}
          label={"צפה במשתמשים נוספים"}
        />
        <AppButton
          borderColor={"purple"}
          labelColor={"white"}
          onClick={() => navigate(PROFILE)}
          label={"פרטים אישיים"}
        />
      </AppStack>
    </div>
  );
};
