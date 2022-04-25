import React, { useEffect, useState } from "react";
import "./videoButtons.css";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const VideoButtons = ({
  end_video_date,
  next_question,
  mute_questions,
}) => {
  const translate = useSelector((s) => s.app.global_hooks.translate);
  const isMobile = useSelector((s) => s.app.isMobile);
  const [disable, setDisable] = useState(false);
  const handle_next_question_btn = () => {
    if (disable) return;
    setDisable(true);
    next_question();
    setTimeout(() => {
      setDisable(false);
    }, 1000);
  };

  return (
    <>
      <div
        className={`buttons-container ${
          isMobile ? "justify-mobile" : "justify-desktop"
        } `}
      >
        <div>
          <div className="video-btn end-call" onClick={mute_questions}>
            <VolumeOffIcon fontSize="large" color="turquoise" />
          </div>
          <div className="icon-text"> {translate("video_page.mute")}</div>
        </div>

        <div>
          <div
            className="video-btn end-call"
            onClick={handle_next_question_btn}
          >
            <ArrowBackIcon fontSize="large" color="turquoise" />
          </div>
          <div className="icon-text">
            {translate("video_page.next-question")}
          </div>
        </div>

        <div>
          <div className="video-btn end-call" onClick={end_video_date}>
            <CloseIcon fontSize="large" color="turquoise" />
          </div>
          <div className="icon-text">{translate("video_page.end-call")}</div>
        </div>
      </div>
    </>
  );
};
