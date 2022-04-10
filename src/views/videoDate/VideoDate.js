import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./videoDate.scss";
import {
  watch_room,
  add_offer_or_answer,
  clean_room,
  unsubscribe_room_listener,
} from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import { MyVideo } from "./components/myVideo/MyVideo";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { VideoButtons } from "./components/videoButtons/VideoButtons";
import { OtherUserAborted } from "./components/otherUserAborted/OtherUserAborted";
import { webRTCConfiguration } from "./videoUtils";
import actionsCreator from "../../store/actionsCreator";
import VIDEO_CONSTANTS from "../../store/video/constants";
import Peer from "simple-peer";
import { Connecting } from "./components/connecting/Connecting";
import { infoLog } from "../../utils/logs";

export const VideoDate = () => {
  //todo: casses:
  // 1. user is waiting for room to be created
  // 2.room created but connection not yet happened
  // 3. connection inits and video comes here
  // 4. one user presses to exit
  // 5. one user refreshes
  // 6. one user exits

  const [peer, setPeer] = useState({});
  const [newProcess, setNewProcess] = useState(true);
  const [otherUserHasLeftRoom, setOtherUserHasLeftRoom] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const room = useSelector((state) => state.video.room);
  const dateStarted = useSelector((state) => state.video.date_started);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const init_page = async () => {
    await watch_room();
    await handle_user_availability(true);
    window.addEventListener("beforeunload", handle_exit);
  };
  const create_offer = async () => {
    setPeer(init_peer({ type: "offer" }));
  };
  const create_answer = (offer) => {
    setPeer(init_peer({ type: "answer", offer }));
  };
  const init_peer = ({ type, offer }) => {
    let peer = new Peer({
      initiator: type === "offer",
      stream: localStream,
      trickle: false,
      config: webRTCConfiguration,
    });
    peer.on("stream", handle_got_stream);
    if (offer) peer.signal(offer);
    peer.on("signal", handle_signal);
    return peer;
  };
  const handle_signal = async (offerOrAnswer) => {
    await add_offer_or_answer({
      offerOrAnswer,
      roomId: room.id,
      type: offerOrAnswer.type,
    });
  };
  const signal_answer = (answer) => {
    peer?.signal(answer);
  };
  const handle_got_stream = (stream) => {
    setRemoteStream(stream);
    set_remote_video_error_handler(stream);
  };
  const handle_caller = async ({ offer, answer }) => {
    if (!offer) await create_offer();
    else if (answer) await signal_answer(answer);
  };
  const handle_answerer = async ({ offer, answer }) => {
    if (offer && !answer) await create_answer(offer);
  };

  const set_remote_video_error_handler = (stream) => {
    stream.getTracks().forEach((track) => {
      if (track.kind === "video") {
        // track.addEventListener("mute", async () => {
        //   setOtherUserHasLeftRoom(true);
        // });
      }
    });
  };
  const handle_room_update = async () => {
    if (!room) return;
    const myId = user.private.id;
    const { caller, answerer, answer, offer } = room;
    await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true);
    if (newProcess && offer) await clean_room();
    setNewProcess(false);
    if (caller.id === myId) await handle_caller(room);
    else if (answerer.id === myId) await handle_answerer(room);
  };
  const next_question = () => {};
  const mute_questions = () => {};
  const stop_my_video = async () => {
    let tracks = localStream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    setLocalStream(null);
  };
  const end_video_date = async () => {
    await handle_exit();
    await unsubscribe_room_listener();
    navigate("/");
  };
  const handle_exit = () => {
    stop_my_video();
    peer?.destroy();
  };

  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);

  return (
    <>
      <div className="full-screen">
        <MyVideo dateStarted={dateStarted} setLocalStream={setLocalStream} />
        {!dateStarted && <>{/*timer for date*/}</>}

        {dateStarted && (
          <>
            {remoteStream.active ? (
              otherUserHasLeftRoom ? (
                <OtherUserAborted
                  remoteStream={remoteStream}
                  reset_connection={end_video_date}
                />
              ) : (
                <RemoteVideo remoteStream={remoteStream} />
              )
            ) : (
              <Connecting
                remoteStream={remoteStream}
                reset_connection={clean_room}
              />
            )}
            <VideoButtons
              end_video_date={end_video_date}
              next_question={next_question}
              mute_questions={mute_questions}
            />
          </>
        )}
      </div>
    </>
  );
};
