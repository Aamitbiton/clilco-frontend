import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./videoDate.scss";
import {
  update_question_in_room,
  watch_room,
  add_offer_or_answer,
  clean_room,
  get_remote_user_data,
  unsubscribe_room_listener,
  set_go_to_decision,
} from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import { SNACK_BAR_TYPES } from "../../store/app/snackBarTypes";
import { useSelector } from "react-redux";
import { MyVideo } from "./components/myVideo/MyVideo";
import { CurrentQuestion } from "./components/questions/CurrentQuestion.js";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { VideoButtons } from "./components/videoButtons/VideoButtons";
import { webRTCConfiguration } from "./videoUtils";
import Peer from "simple-peer";
import AppRoutes from "../../app/AppRoutes";

export const VideoDate = () => {
  const [peer, setPeer] = useState(null);
  const [newProcess, setNewProcess] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [questionIndexes, setQuestionIndexes] = useState([0]);
  const room = useSelector((state) => state.video.room);
  const user = useSelector((state) => state.user.user);
  const remoteUser = useSelector((state) => state.video.remote_user);
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
  const handle_got_stream = async (stream) => {
    setRemoteStream(new MediaStream(stream));
    set_remote_video_error_handler(stream);
    create_snackBar({
      message: SNACK_BAR_TYPES.REMOTE_USER_JOINED_ROOM(remoteUser?.name),
      action: reset_snackBar,
    });
  };
  const handle_caller = async ({ offer, answer }) => {
    if (!offer) await create_offer();
    else if (answer && !remoteStream) await signal_answer(answer);
  };
  const handle_answerer = async ({ offer, answer }) => {
    if (offer && !answer) await create_answer(offer);
  };

  const set_remote_video_error_handler = (stream) => {
    stream.getTracks().forEach((track) => {
      if (track.kind === "video") {
        track.addEventListener("mute", handle_remote_video_stopped);
        track.addEventListener("unmute", () =>
          handle_remote_video_restarted(stream)
        );
      }
    });
  };
  const handle_remote_video_stopped = async () => {
    setRemoteStream(null);
    peer?.destroy();
    await create_snackBar({
      message: SNACK_BAR_TYPES.REMOTE_USER_LEFT_ROOM(remoteUser?.name),
      action: reset_snackBar,
    });
  };
  const handle_remote_video_restarted = async (stream) => {
    handle_got_stream(stream);
  };
  const handle_room_update = async () => {
    if (!room) return;
    const myId = user.private.id;
    const { caller, answerer, answer, offer, goToDecision, questions } = room;
    if (newProcess && offer) await clean_room();
    setNewProcess(false);
    if (caller.id === myId) await handle_caller(room);
    else if (answerer.id === myId) await handle_answerer(room);
    if (!remoteUser)
      await get_remote_user_data(caller.id === myId ? answerer.id : caller.id);
    if (goToDecision) {
      handle_exit();
      navigate(AppRoutes.AFTER_VIDEO);
    }
    if (questions.length > questionIndexes.length) await next_question({});
  };

  const next_question = async ({ local }) => {
    //todo : לשמור איזשהו מערך של האינדקסים, ולמחוק ממנו את השאלות שכבר נשאלו, כדי למנוע את הרקורסיה
    const index = local
      ? calculate_next_question()
      : room.questions[room.questions.length - 1];
    const questions = [...questionIndexes, index];
    setQuestionIndexes(questions);
    if (local) await update_question_in_room({ questions, roomId: room.id });
  };
  const calculate_next_question = () => {
    const num = Math.floor(Math.random() * 125);
    if (questionIndexes.includes(num)) {
      console.log("recalculate");
      return calculate_next_question();
    } else return num;
  };
  const handle_no_permissions = () => {
    alert("אין לך הרשאות למצלמה");
    //todo: Add here appModal
  };
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
    setRemoteStream(null);
    await unsubscribe_room_listener();
    await set_go_to_decision();
    navigate(AppRoutes.AFTER_VIDEO);
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
        <MyVideo
          dateStarted={remoteStream}
          setLocalStream={setLocalStream}
          handle_no_permissions={handle_no_permissions}
        />
        {remoteStream && <>{/*timer for date*/}</>}

        {remoteStream && (
          <>
            <RemoteVideo remoteStream={remoteStream} />
            <CurrentQuestion questionIndexes={questionIndexes} />
            <VideoButtons
              end_video_date={end_video_date}
              next_question={() => next_question({ local: true })}
              mute_questions={mute_questions}
            />
          </>
        )}
      </div>
    </>
  );
};
