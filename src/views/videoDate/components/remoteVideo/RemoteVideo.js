import React, { useEffect, useRef, useState } from "react";
import "./remoteVideo.scss";
import { useSelector } from "react-redux";

export const RemoteVideo = ({ remoteStream }) => {
  const remoteVideoRef = useRef();
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const [videoClass, setVideoClass] = useState("remote-video");
  const isMobile = useSelector((state) => state.app.isMobile);
  const set_video_size = () => {
    setVideoSize({
      width: remoteVideoRef.current.videoWidth,
      height: remoteVideoRef.current.videoHeight,
    });
  };
  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.addEventListener("", () => {});
    }
  }, [remoteStream]);
  useEffect(() => {
    let video_class = "remote-video ";
    if (isMobile && videoSize.width < videoSize.height)
      video_class += "both-mobile-video-style ";
    if (isMobile && videoSize.width > videoSize.height)
      video_class += "local-mobile-remote-desktop-video-style ";
    setVideoClass(video_class);
  }, [videoSize]);

  return (
    <>
      {remoteStream && (
        <>
          <video
            data_cy="remote-video"
            onLoadedData={set_video_size}
            playsInline
            ref={remoteVideoRef}
            autoPlay={true}
            className={videoClass}
            // muted={true}
          />
        </>
      )}
    </>
  );
};
