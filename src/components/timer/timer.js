import React from "react";
import { useTimer } from "react-timer-hook";
import "./timer.scss";

export const Timer = ({ expiredMilliseconds, style, endAction }) => {
  const expiryTimestamp = new Date(expiredMilliseconds);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: endAction,
  });
  const fix_format = (digit) => {
    return digit > 9 ? digit : "0" + digit;
  };
  const timeArray = [
    { time: fix_format(days), title: "ימים" },
    { time: fix_format(hours), title: "שעות" },
    { time: fix_format(minutes), title: "דקות" },
    { time: fix_format(seconds), title: "שניות" },
  ];
  return (
    <div className="container  flex-center ltr" style={style}>
      {timeArray.map((stamp, index) => (
        <div className={"column text-center timer-container"}>
          <b className="timer-text"> {stamp.time}</b>
          <b className={"timer-title"}> {stamp.title}</b>
        </div>
      ))}
    </div>
  );
};
