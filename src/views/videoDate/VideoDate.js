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
import { question_texts } from "./components/questions/question_texts";
import { Timer } from "../../components/timer/timer";
import { OtherUserPlaceHolder } from "./components/connecting/otherUserPlaceHolder";

export const VideoDate = () => {
  const [peer, setPeer] = useState(null);
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("questions-volume") || 1)
  );
  const [showTimer, setShowTimer] = useState(null);
  const [startedTimer, setStartedTimer] = useState(false);
  const [newProcess, setNewProcess] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [dateEndInMilliseconds, setDateEndInMilliseconds] = useState(null);
  const room = useSelector((state) => state.video.room);
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const user = useSelector((state) => state.user.user);
  const remoteUser = useSelector((state) => state.video.remote_user);
  const room_unsubscribes = useSelector(
    (state) => state.video.room_unsubscribes
  );
  const navigate = useNavigate();

  const init_page = async () => {
    try {
      make_sure_one_reload_before_start();
      if (!room_unsubscribes) await watch_room();
      window.addEventListener("beforeunload", handle_exit);
    } catch (e) {
      console.error(e);
    }
  };
  const make_sure_one_reload_before_start = () => {
    const wasHereOnce = JSON.parse(localStorage.getItem("video-date-once"));
    localStorage.setItem("video-date-once", "false");
    if (!wasHereOnce) {
      localStorage.setItem("video-date-once", "true");
      window.location.reload(true);
    }
  };
  const create_offer = async () => {
    try {
      setPeer(init_peer({ type: "offer" }));
    } catch (e) {
      console.error(e);
    }
  };
  const init_peer = ({ type, offer }) => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  };
  const create_answer = (offer) => {
    try {
      setPeer(init_peer({ type: "answer", offer }));
    } catch (e) {
      console.error(e);
    }
  };
  const handle_signal = async (offerOrAnswer) => {
    try {
      await add_offer_or_answer({
        offerOrAnswer,
        roomId: room.id,
        type: offerOrAnswer.type,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const signal_answer = (answer) => {
    try {
      peer?.signal(answer);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_got_stream = async (stream) => {
    try {
      setRemoteStream(new MediaStream(stream));
      set_remote_video_error_handler(stream);
      await create_snackBar({
        message: SNACK_BAR_TYPES.REMOTE_USER_JOINED_ROOM(remoteUser?.name),
        action: reset_snackBar,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handle_caller = async ({ offer, answer, goToDecision }) => {
    try {
      if (!offer) await create_offer();
      else if (answer && !remoteStream && !goToDecision)
        await signal_answer(answer);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_answerer = async ({ offer, answer }) => {
    try {
      if (offer && !answer) await create_answer(offer);
    } catch (e) {
      console.error(e);
    }
  };

  const set_remote_video_error_handler = (stream) => {
    try {
      stream.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.addEventListener("mute", handle_remote_video_stopped);
          track.addEventListener("unmute", () =>
            handle_remote_video_restarted(stream)
          );
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handle_remote_video_stopped = async () => {
    try {
      if (window.location.href.includes("video-date")) {
        await create_snackBar({
          message: SNACK_BAR_TYPES.REMOTE_USER_LEFT_ROOM(remoteUser?.name),
          action: reset_snackBar,
        });
        setRemoteStream(null);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handle_remote_video_restarted = async (stream) => {
    try {
      await handle_got_stream(stream);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_room_update = async () => {
    try {
      if (!room) return;
      const myId = user.private.id;
      const { caller, answerer, offer, goToDecision } = room;
      if (newProcess && offer) await clean_room();
      setNewProcess(false);
      if (caller.id === myId) await handle_caller(room);
      else if (answerer.id === myId) await handle_answerer(room);
      if (!remoteUser)
        await get_remote_user_data(
          caller.id === myId ? answerer.id : caller.id
        );
      if (goToDecision) {
        handle_exit();
        navigate(AppRoutes.AFTER_VIDEO);
      }
      if (!dateEndInMilliseconds)
        setDateEndInMilliseconds(room.startTime + 1000 * 60 * 10);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_date_time = () => {
    try {
      if (startedTimer || !dateEndInMilliseconds) return;
      setStartedTimer(true);
      const secondsLeftForDate = Math.floor(
        (dateEndInMilliseconds - now()) / 1000
      );
      Array.apply(null, Array(secondsLeftForDate)).forEach((item, i) => {
        setTimeout(
          () => secondsLeftForDate - i === 60 && setShowTimer(true),
          1000 * i
        );
      });
    } catch (e) {
      console.error(e);
    }
  };
  const now = () => new Date().getTime();
  const go_to_next_question_local = async () => {
    try {
      const index = calculate_next_question();
      if (!Number.isNaN(index)) {
        const questions = [...room.questions, index];
        await update_question_in_room({ questions, roomId: room.id });
      } else {
        create_snackBar({
          message: SNACK_BAR_TYPES.NO_MORE_QUESTIONS,
          action: reset_snackBar,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const calculate_next_question = () => {
    try {
      const options = Object.keys(question_texts).filter(
        (i) => !room.questions.includes(Number(i))
      );
      const num = Math.floor(Math.random() * (options.length - 1));
      return Number(options[num]);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_no_permissions = () => {
    try {
      alert("אין לך הרשאות למצלמה");
      //todo: Add here appModal
    } catch (e) {
      console.error(e);
    }
  };
  const handle_questions_volume = (val) => {
    setVolume(val / 100);
  };
  const stop_my_video = async () => {
    try {
      let tracks = localStream?.getTracks();
      tracks?.forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      setLocalStream(null);
    } catch (e) {
      console.error(e);
    }
  };
  const end_video_date = async () => {
    try {
      await handle_exit();
      setRemoteStream(null);
      await unsubscribe_room_listener();
      await set_go_to_decision();
      navigate(AppRoutes.AFTER_VIDEO);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_exit = () => {
    try {
      stop_my_video();
      peer?.destroy();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);
  useEffect(handle_date_time, [dateEndInMilliseconds]);

  return (
    <>
      <div className="full-screen">
        <MyVideo
          dateStarted={remoteStream}
          setLocalStream={setLocalStream}
          handle_no_permissions={handle_no_permissions}
        />

        {remoteStream ? (
          <>
            {showTimer && (
              <Timer
                endAction={end_video_date}
                style={{ position: "absolute", zIndex: 3, width: "100%" }}
                expiredMilliseconds={room.startTime + 1000 * 60 * 10}
              />
            )}
            <RemoteVideo remoteStream={remoteStream} />
            <CurrentQuestion questionIndexes={room.questions} volume={volume} />
          </>
        ) : (
          <div className="full-screen flex-center">
            {remoteUser && <OtherUserPlaceHolder user={remoteUser} />}
          </div>
        )}
        <VideoButtons
          end_video_date={end_video_date}
          next_question={go_to_next_question_local}
          handle_questions_volume={handle_questions_volume}
          volume={volume * 100}
        />
      </div>
    </>
  );
};
