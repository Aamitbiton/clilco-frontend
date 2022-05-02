import React, { useEffect, useState } from "react";
import "./videoButtons.css";
import { useSelector } from "react-redux";
import PhoneDisabledSharpIcon from "@mui/icons-material/PhoneDisabledSharp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VolumeBar } from "../../../../components/sliders/volumeBar/VolumeBar";

export const VideoButtons = ({
  end_video_date,
  next_question,
  handle_questions_volume,
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
          <div className="video-btn">
            <VolumeBar handle_questions_volume={handle_questions_volume} />
          </div>
          <div className="icon-text">{translate("video_page.volume")}</div>
        </div>

        <div>
          <div className="video-btn" onClick={handle_next_question_btn}>
            <ArrowBackIcon fontSize="large" color="turquoise" />
          </div>
          <div className="icon-text">
            {translate("video_page.next-question")}
          </div>
        </div>

        <div>
          <div className="video-btn" onClick={end_video_date}>
            <PhoneDisabledSharpIcon fontSize="large" color="turquoise" />
          </div>
          <div className="icon-text">{translate("video_page.end-call")}</div>
        </div>
      </div>
    </>
  );
};
