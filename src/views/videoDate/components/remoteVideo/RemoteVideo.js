import React, { useEffect, useRef } from "react";
import "./remoteVideo.css";

export const RemoteVideo = ({ remoteStream }) => {
  const remoteVideoRef = useRef();
  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  return (
    <>
      <video
        ref={remoteVideoRef}
        autoPlay={true}
        className="remote-video"
        muted={true}
      />
    </>
  );
};
