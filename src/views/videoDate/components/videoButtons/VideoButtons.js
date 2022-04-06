import React, { useEffect } from "react";
import "./videoButtons.css";

export const VideoButtons = ({ end_video_date }) => {
  return (
    <>
      <div className={"buttons-container"}>
        <div className="end-btn" onClick={end_video_date}>
          End Call
        </div>
      </div>
    </>
  );
};
