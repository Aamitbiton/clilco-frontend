import React, { useState, useEffect } from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";
import Typography from "@mui/material/Typography";

export const NotDateTime = ({ datesStartedMilliseconds }) => {
  return (
    <div className="flex-center full-screen">
      <Typography className={"flex-center"} color={"white"} variant={"h5"}>
        מוכנים?
      </Typography>
      <Timer expiredMilliseconds={datesStartedMilliseconds} />
    </div>
  );
};
