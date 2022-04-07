import React, { useEffect, useRef } from "react";
import "./remoteVideo.scss";
import { useSelector } from "react-redux";

export const RemoteVideo = ({ remoteStream }) => {
  const remoteVideoRef = useRef();
  const isMobile = useSelector((state) => state.app.isMobile);
  const get_video_class = () => {};
  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <>
      {remoteStream && (
        <>
          <video
            playsInline
            ref={remoteVideoRef}
            autoPlay={true}
            className={`remote-video ${
              isMobile ? "mobile-addons" : "desktop-addons"
            }`}
            muted={true}
          />
        </>
      )}
    </>
  );
};
