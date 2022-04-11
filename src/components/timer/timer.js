import React from "react";
import { useTimer } from "react-timer-hook";
import "./timer.scss";

export const Timer = ({ expiredMilliseconds }) => {
  const expiryTimestamp = new Date(expiredMilliseconds);
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="container  flex-center ltr">
      <b className="text">
        {hours} : {minutes} : {seconds}
      </b>
    </div>
  );
};
