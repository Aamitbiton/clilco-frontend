import React, { useState } from "react";
import "./OtherUserPlaceHolder.scss";
import { useSelector } from "react-redux";

export const OtherUserPlaceHolder = ({ user }) => {
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      <div
        style={{ visibility: imgLoaded ? "visible" : "hidden" }}
        className="full-screen flex-column-center"
      >
        <img
          onLoad={() => setImgLoaded(true)}
          className="date-place-holder-image"
          src={user.imgUrl.url}
        />
        <h1 className="date-place-holder-title">
          {translate(`video_page.waiting_for_video`) + user.name}
        </h1>
      </div>
    </>
  );
};
