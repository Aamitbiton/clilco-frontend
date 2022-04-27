import React, { useState, useEffect } from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";
import Typography from "@mui/material/Typography";
import AppStack from "../../../../components/AppStack";
import AppButton from "../../../../components/Buttons/AppButton";

export const NotDateTime = ({ navigate, datesStartedMilliseconds }) => {
  return (
    <div className="flex-center  full-width ">
      <AppStack direction="column" spacing={1}>
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מתחילים בעוד
        </Typography>
        <Timer
          style={{ width: "100%" }}
          expiredMilliseconds={datesStartedMilliseconds}
        />
        <AppButton
          onClick={() => navigate("/view-users")}
          labelColor={"white"}
          label={"צפה במשתמשים נוספים"}
        />
        <AppButton
          borderColor={"purple"}
          labelColor={"white"}
          label={"ערוך פרטים אישיים"}
        />
      </AppStack>
    </div>
  );
};
