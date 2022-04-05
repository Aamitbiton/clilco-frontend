import React, { useEffect, useState, useRef } from "react";
import "./myVideo.css";

export const MyVideo = ({ dateStarted, setLocalStream }) => {
  const videoRef = useRef();
  const init_my_video = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(localStream);
    videoRef.current.srcObject = localStream;
  };
  const handle_date_started = async () => {
    // insert video to pc
  };

  useEffect(init_my_video, []);
  useEffect(handle_date_started, [dateStarted]);

  return (
    <>
      <video
        className={dateStarted ? "my-video-in-date" : "my-video-before-date"}
        ref={videoRef}
        autoPlay={true}
        muted={true}
      />
    </>
  );
};
