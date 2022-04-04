import React, { useEffect, useState } from "react";
import "./videoDate.css";
import {
  watch_room,
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
import Peer from "simple-peer";

export const VideoDate = () => {
  const [client, setClient] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const room = useSelector((state) => state.video.room);

  const makePeer = async () => {
    setClient({
      ...client,
      gotAnswer: false,
      peer: initPeer("init"),
      init: true,
    });
  };
  const initPeer = (type) => {
    let peer = new Peer({
      initiator: type === "init",
      stream: localStream,
      trickle: false,
      config: webRTCConfiguration,
    });
    peer.on("stream", setRemoteStream);
    return peer;
  };
  const frontAnswer = (offer) => {
    setClient({ ...client, peer: initPeer("notInit"), notInit: true, offer });
  };
  const signalAnswer = (answer) => {
    setClient({ ...client, gotAnswer: true, answer });
  };

  const dateStarted = useSelector((state) => state.video.date_started);
  const user = useSelector((state) => state.user.user);

  const init_page = async () => {
    await watch_room();
    await set_user_available();
  };
  const handle_room_update = async () => {
    const myId = user.private.id;
    if (room) {
      const { caller, answerer, answer, offer } = room;
      await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
      if (caller === myId) await handle_caller({ offer, answer });
      if (answerer === myId) await handle_answerer({ offer, answer });
    }
  };
  const handle_caller = async ({ offer, answer }) => {
    if (!offer) await makePeer();
    if (answer) await signalAnswer(answer);
  };
  const handle_answerer = async ({ offer, answer }) => {
    if (offer) {
      if (!answer) {
        await frontAnswer(offer);
      }
    }
  };

  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);
  useEffect(() => {
    if (client.init) {
      client.peer.on("signal", async (offer) => {
        if (!client.gotAnswer) {
          await add_offer({ offer, roomId: room.id, type: "offer" });
        }
      });
      setClient({ ...client, init: false });
    }

    if (client.offer) {
      setClient({ ...client, offer: null });
      client.peer.signal(client.offer);
      client.peer.on("signal", async (answer) => {
        await add_answer({ answer, roomId: room.id, type: "answer" });
      });
    }
    if (client.answer) {
      client.peer.signal(client.answer);
      setClient({ ...client, answer: null });
    }
  }, [client]);

  return (
    <>
      <div className="video-page">
        <MyVideo dateStarted={dateStarted} setLocalStream={setLocalStream} />
        <RemoteVideo remoteStream={remoteStream} />
      </div>
    </>
  );
};
