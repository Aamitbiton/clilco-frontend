import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./videoDate.css";
import {
  watch_room,
  add_offer,
  add_answer,
  clean_room,
  unsubscribe_room_listener,
} from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import { MyVideo } from "./components/myVideo/MyVideo";
import { Tips } from "./components/tips/Tips";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { VideoControllers } from "./components/videoControllers/VideoControllers";
import { webRTCConfiguration } from "./videoUtils";
import actionsCreator from "../../store/actionsCreator";
import VIDEO_CONSTANTS from "../../store/video/constants";
import Peer from "simple-peer";
import AppButton from "../../components/AppButton";

export const VideoDate = () => {
  const [client, setClient] = useState({});
  const [newProcess, setNewProcess] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const room = useSelector((state) => state.video.room);
  const dateStarted = useSelector((state) => state.video.date_started);
  const user = useSelector((state) => state.user.user);

  const init_page = async () => {
    await watch_room();
    await handle_user_availability(true);
  };
  const create_offer = async () => {
    setClient({
      ...client,
      gotAnswer: false,
      peer: init_peer({ type: "offer" }),
      init: true,
    });
  };
  const init_peer = ({ type }) => {
    let peer = new Peer({
      initiator: type === "offer",
      stream: localStream,
      trickle: false,
      config: webRTCConfiguration,
    });
    peer.on("stream", setRemoteStream);
    return peer;
  };
  const create_answer = (offer) => {
    setClient({
      ...client,
      peer: init_peer({ type: "answer" }),
      notInit: true,
      offer,
    });
  };
  const signal_answer = (answer) => {
    client.peer?.signal(answer);
  };
  const handle_room_update = async () => {
    if (!room) return;
    const myId = user.private.id;
    const { caller, answerer, answer, offer } = room;
    await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
    if (newProcess && offer) await clean_room();
    setNewProcess(false);
    if (caller.id === myId) await handle_caller({ offer, answer });
    else if (answerer.id === myId) await handle_answerer({ offer, answer });
  };
  const handle_caller = async ({ offer, answer }) => {
    if (!offer) await create_offer();
    else if (answer) await signal_answer(answer);
  };
  const handle_answerer = async ({ offer, answer }) => {
    if (offer && !answer) await create_answer(offer);
  };
  const close_connection = async () => {
    debugger;
    client.peer?.destroy();
    let tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    setLocalStream(null);
  };
  const end_video_date = async () => {
    await close_connection();
    await handle_user_availability(false);
    await unsubscribe_room_listener();
    //todo: rout out of here
  };
  const unMount = async () => {
    await handle_user_availability(false);
  };

  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);
  useEffect(() => {
    if (client.init) {
      client.peer.on("signal", async (offer) => {
        await add_offer({ offer, roomId: room.id, type: "offer" });
      });
      client.peer.on("error", () => {
        alert("closed1");
      });
      setClient({ ...client, init: false });
    }
    if (client.offer) {
      client.peer?.signal(client.offer);
      setClient({ ...client, offer: null });
      client.peer.on("signal", async (answer) => {
        await add_answer({ answer, roomId: room.id, type: "answer" });
      });
      client.peer.on("error", () => {
        alert("closed2");
      });
    }
  }, [client]);
  useEffect(() => {
    return unMount;
  }, []);
  return (
    <>
      <div className="video-page">
        <MyVideo dateStarted={dateStarted} setLocalStream={setLocalStream} />
        <RemoteVideo remoteStream={remoteStream} />
      </div>
      <AppButton onClick={end_video_date} label={"out"} />
    </>
  );
};
