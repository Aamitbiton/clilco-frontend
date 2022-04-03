import React, { useEffect, useState } from "react";
import "./videoDate.css";
import { go_available } from "../../store/video/videoFunctions";
import { useSelector } from "react-redux";
import { MyVideo } from "./components/myVideo/MyVideo";
import { Tips } from "./components/tips/Tips";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { VideoControllers } from "./components/videoControllers/VideoControllers";
import { webRTCConfiguration } from "./videoUtils";
import actionsCreator from "../../store/actionsCreator";
import VIDEO_CONSTANTS from "../../store/video/constants";
import * as videoService from "../../services/video";
const pc = new RTCPeerConnection(webRTCConfiguration);

export const VideoDate = () => {
  const room = useSelector((state) => state.video.room);
  const dateStarted = useSelector((state) => state.video.date_started);

  const handle_room_update = async () => {
    const room = getState().video.room;
    const myId = getState().user.user.private.id;
    const otherUserId = room?.userIds?.find((id) => id !== myId);
    if (room) {
      await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
      const id = room.id;
      const myData = room[myId];
      const otherUserData = room[otherUserId];

      if (!myData) await send_my_data(id);

      if (!pc.currentRemoteDescription && otherUserData?.offer) {
      }

      if (otherUserData?.candidate) {
      }
    }
  };

  const send_my_data = async (roomId) => {};

  useEffect(go_available, []);
  useEffect(handle_room_update, [room]);

  return (
    <>
      <div className="video-page">
        <MyVideo dateStarted={dateStarted} />
      </div>
    </>
  );
};

//https://github.com/fireship-io/webrtc-firebase-demo/blob/main/main.js
//https://www.youtube.com/watch?v=WmR9IMUD_CY
