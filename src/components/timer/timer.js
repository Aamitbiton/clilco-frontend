import React from "react";
import { useTimer } from "react-timer-hook";
import "./timer.scss";
import { set_its_dating_time } from "../../store/video/videoFunctions";

export const Timer = ({ expiredMilliseconds }) => {
  const expiryTimestamp = new Date(expiredMilliseconds);
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => set_its_dating_time(true),
  });

  return (
    <div className="container  flex-center ltr">
      <b className="text">
        {hours} : {minutes} : {seconds}
      </b>
    </div>
  );
};
