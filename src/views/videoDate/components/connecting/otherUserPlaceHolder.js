import React, { useEffect, useRef, useState } from "react";
import "./OtherUserPlaceHolder.scss";

export const OtherUserPlaceHolder = ({ user }) => {
  return (
    <>
      <div className="full-screen flex-center">
        <img className="date-place-holder-image" src={user.imgUrl.url} />
      </div>
    </>
  );
};
