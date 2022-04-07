import React, { useEffect, useRef, useState } from "react";
import "./remoteVideo.scss";
import { useSelector } from "react-redux";

export const RemoteVideo = ({ remoteStream }) => {
  const remoteVideoRef = useRef();
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
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
    }
  }, [remoteStream]);
  useEffect(() => {
    if (isMobile && videoSize.width > 450) {
      //  mobile he is desktop
    }
    if (isMobile && videoSize.width < 450) {
      // both mobile
    }
    if (!isMobile && videoSize.width < 450) {
      // im  desktop he is mobile
    }
    if (!isMobile && videoSize.width > 450) {
      // both  desktop
    }
  }, [videoSize]);

  return (
    <>
      {remoteStream && (
        <>
          {/*<h1>{videoSize.width}</h1>*/}
          {/*<h1>{videoSize.height}</h1>*/}
          <video
            onLoadedData={set_video_size}
            playsInline
            ref={remoteVideoRef}
            autoPlay={true}
            className={`remote-video ${
              isMobile && videoSize.width < videoSize.height
                ? "both-mobile-video-style "
                : ""
            }`}
            muted={true}
          />
        </>
      )}
    </>
  );
};
