import React, { useState, useEffect } from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";
import Typography from "@mui/material/Typography";
import AppStack from "../../../../components/AppStack";
import AppButton from "../../../../components/AppButton";

export const NotDateTime = ({ datesStartedMilliseconds }) => {
  return (
    <div className="flex-center  full-width ">
      <AppStack direction="column" spacing={1}>
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מתחילים בעוד
        </Typography>
        <Timer expiredMilliseconds={datesStartedMilliseconds} />
        <AppButton labelColor={"white"} label={"צפה במשתמשים נוספים"} />
        <AppButton
          borderColor={"purple"}
          labelColor={"white"}
          label={"ערוך פרטים אישיים"}
        />
      </AppStack>
    </div>
  );
};
