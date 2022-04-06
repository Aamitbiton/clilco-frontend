import React, { useEffect, useState } from "react";
import "./timerUntilDate.css";

export const TimerUntilDate = () => {
  const [secondsToDate, setSecondsToDate] = useState(156);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const minutes = Math.floor(secondsToDate / 60);
    const seconds = (secondsToDate / 60 + "").split(".")[1];
    setSeconds(seconds);
    setMinutes(minutes);
  }, []);
  return (
    <>
      <div className="timer">
        <span>00:</span>
        <span>{minutes}:</span>
        <span>{seconds}:</span>
      </div>
    </>
  );
};
