import React from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";
import Typography from "@mui/material/Typography";
import AppStack from "../../../../components/AppStack";
import AppButton from "../../../../components/Buttons/AppButton";
import AppRoutes from "../../../../app/AppRoutes";
import { set_its_dating_time } from "../../../../store/video/videoFunctions";
import defaultStyles from "../../../../style/defaultStyles";

export const NotDateTime = ({ navigate, datesStartedMilliseconds }) => {
  const { inputs } = defaultStyles;
  const { PROFILE, VIEW_USERS } = AppRoutes;
  return (
    <>
      <AppStack direction="column" spacing={1.5}>
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מתחילים בעוד
        </Typography>
        <Timer
          style={{ width: inputs.STATIC_WIDTH, height: inputs.STATIC_HEIGHT }}
          endAction={() => set_its_dating_time(true)}
          expiredMilliseconds={datesStartedMilliseconds}
        />
        <AppButton
          width={inputs.STATIC_WIDTH}
          height={inputs.STATIC_HEIGHT}
          onClick={() => navigate(VIEW_USERS)}
          labelColor={"white"}
          label={"צפה במשתמשים "}
        />
      </AppStack>
    </>
  );
};
