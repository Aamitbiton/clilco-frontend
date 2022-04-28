import React from "react";
import { useTimer } from "react-timer-hook";
import "./timer.scss";

export const Timer = ({ expiredMilliseconds, style, endAction }) => {
  const expiryTimestamp = new Date(expiredMilliseconds);
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: endAction,
  });
  const fix_format = (digit) => {
    return digit > 9 ? digit : "0" + digit;
  };
  return (
    <div className="container  flex-center ltr" style={style}>
      <b className="text">
        {fix_format(hours)} : {fix_format(minutes)} : {fix_format(seconds)}
      </b>
    </div>
  );
};
