import React, { useEffect, useRef, useState } from "react";
import "./OtherUserPlaceHolder.scss";
import Title from "../../../../components/title/title";
import { useSelector } from "react-redux";

export const OtherUserPlaceHolder = ({ user }) => {
  //todo:  להוסיף פה איזה טיימר פנימי שבודק אם עוד לא קיבל וידאו מהמשתמש השני, מרענן את הדף כל ארבע שניות או משהו כזה
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
