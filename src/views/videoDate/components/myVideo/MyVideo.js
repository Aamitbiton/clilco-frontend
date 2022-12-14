import React, { useEffect, useState, useRef } from "react";
import "./myVideo.scss";
// import { emotion_detector } from "../../../../store/video/videoFunctions";
// import EmotionsChart_pie from "../../../../components/charts/emotionsChart/EmotionsChart_pie";
// import EmotionsChart_inline from "../../../../components/charts/emotionsChart/EmotionsChart_inline";

export const MyVideo = ({
  dateStarted,
  setLocalStream,
  handle_no_permissions,
}) => {
  const [emotions, setEmotions] = useState({
    angry: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
  });
  const [intervalId, setIntervalId] = useState(null);
  const videoRef = useRef();
  const init_my_video = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(localStream);
      videoRef.current.srcObject = localStream;
      // const intervalId = await emotion_detector({
      //   video: videoRef.current,
      //   action: handle_emotion_results,
      // });
      // setIntervalId(intervalId);
    } catch (e) {
      handle_no_permissions();
    }
  };
  const handle_emotion_results = ({
    happy,
    angry,
    sad,
    surprised,
    neutral,
  }) => {
    setEmotions({
      happy: happy ? Math.floor(happy * 100) : 0,
      angry: angry ? Math.floor(angry * 100) : 0,
      sad: sad ? Math.floor(sad * 100) : 0,
      surprised: surprised ? Math.floor(surprised * 100) : 0,
      neutral: neutral ? Math.floor(neutral * 100) : 0,
    });
  };
  const handle_date_started = async () => {};
  useEffect(init_my_video, []);
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
  useEffect(handle_date_started, [dateStarted]);

  return (
    <>
      <div style={{ position: "absolute" }}>
        {/*<EmotionsChart_pie emotionsData={emotions} />*/}
        {/*<EmotionsChart_inline emotionsData={emotions} />*/}
      </div>

      <video
        playsInline
        className="reverse-video my-video-in-date"
        ref={videoRef}
        autoPlay={true}
        muted={true}
      />
    </>
  );
};
