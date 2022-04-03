import React, { useEffect, useState } from "react";
import "./videoDate.css";
import {
  watch_room,
  add_candidate,
  add_offer,
  add_answer,
} from "../../store/video/videoFunctions";
import { set_user_available } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import { MyVideo } from "./components/myVideo/MyVideo";
import { Tips } from "./components/tips/Tips";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { VideoControllers } from "./components/videoControllers/VideoControllers";
import { webRTCConfiguration } from "./videoUtils";
import actionsCreator from "../../store/actionsCreator";
import VIDEO_CONSTANTS from "../../store/video/constants";
const pc = new RTCPeerConnection(webRTCConfiguration);

export const VideoDate = () => {
  const room = useSelector((state) => state.video.room);
  const dateStarted = useSelector((state) => state.video.date_started);
  const user = useSelector((state) => state.user.user);
  const remoteStream = new MediaStream();
  const [lastCandidates, setLastCandidates] = useState([]);

  const init_page = async () => {
    await watch_room();
    await set_user_available();
    await subscribe_for_remote_video();
  };
  const handle_room_update = async () => {
    const myId = user.private.id;
    if (room) {
      const {
        caller,
        answerer,
        answer,
        offer,
        answerCandidates,
        offerCandidates,
      } = room;
      await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
      if (caller === myId) {
        if (!offer) await send_offer();
        else {
          if (answerCandidates)
            await handle_answer_candidates(answerCandidates);
          if (!pc.currentRemoteDescription && answer)
            await handle_answer(answer);
        }
      }
      if (answerer === myId) {
        if (offer) {
          if (!pc.currentRemoteDescription && offer) await handle_offer(offer);
          if (offerCandidates) await handle_offer_candidates(offerCandidates);
          if (!answer) await send_answer();
        }
      }
    }
  };
  const subscribe_for_remote_video = () => {
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  };
  const handle_offer = async (offer) => {
    const offerDescription = new RTCSessionDescription(offer);
    await pc.setRemoteDescription(offerDescription);
  };
  const handle_offer_candidates = async (candidates) => {
    if (candidates?.length > lastCandidates?.length) {
      const candidate = new RTCIceCandidate(candidates[candidates.length - 1]);
      setLastCandidates(candidates);
      await pc.addIceCandidate(candidate);
    }
  };
  const handle_answer = async (answer) => {
    const answerDescription = new RTCSessionDescription(answer);
    await pc.setRemoteDescription(answerDescription);
  };
  const handle_answer_candidates = async (candidates) => {
    try {
      if (candidates?.length > lastCandidates?.length) {
        const candidate = new RTCIceCandidate(
          candidates[candidates.length - 1]
        );
        setLastCandidates(candidates);

        await pc.addIceCandidate(candidate);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const send_offer = async () => {
    try {
      await send_candidate("offer");
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
      await add_offer({ offer, roomId: room.id, type: "offer" });
    } catch (e) {
      console.log(e);
    }
  };
  const send_answer = async () => {
    await send_candidate("answer");
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    await add_answer({ answer, roomId: room.id, type: "answer" });
  };
  const send_candidate = async (type) => {
    pc.onicecandidate = async (event) => {
      event.candidate &&
        (await add_candidate({
          candidate: event.candidate.toJSON(),
          roomId: room.id,
          type,
        }));
    };
  };
  const add_my_tracks_to_pc = ({ track, localStream }) => {
    pc.addTrack(track, localStream);
  };

  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);

  return (
    <>
      <div className="video-page">
        <MyVideo
          dateStarted={dateStarted}
          add_my_tracks_to_pc={add_my_tracks_to_pc}
        />

        <RemoteVideo remoteStream={remoteStream} />
      </div>
    </>
  );
};

//https://github.com/fireship-io/webrtc-firebase-demo/blob/main/main.js
//https://www.youtube.com/watch?v=WmR9IMUD_CY
