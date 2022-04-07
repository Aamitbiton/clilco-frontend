import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";

export const NotDateTime = ({ datesStartedMilliseconds }) => {
  return (
    <div className="flex-center full-screen">
      <Timer expiredMilliseconds={datesStartedMilliseconds} />
    </div>
  );
};
