import React, { useState, useEffect } from "react";
import "./notDateTime.css";
import { Timer } from "../../../../components/timer/timer";

export const NotDateTime = ({ datesStartedMilliseconds }) => {
  return (
    <div className="flex-center full-screen">
      <Timer expiredMilliseconds={datesStartedMilliseconds} />
    </div>
  );
};
