import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./videoDate.scss";
import {
  update_question_in_room,
  watch_room,
  watch_remote_user,
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
import { LinearLoading } from "./components/linerLoading";
import { OtherUserPlaceHolder } from "./components/connecting/otherUserPlaceHolder";
import { toast } from "react-toastify";
import { infoLog } from "../../utils/logs";

export const VideoDate = () => {
  const [peer, setPeer] = useState(null);
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("questions-volume") || 1)
  );
  const [streamBlock, setStreamBlock] = useState(null);
  const [mute, setMute] = useState(true);
  const [doNotRefresh, setDoNotRefresh] = useState(true);
  const [showTimer, setShowTimer] = useState(null);
  const [startedTimer, setStartedTimer] = useState(false);
  const [videoStopped, setVideoStopped] = useState(false);
  const [newProcess, setNewProcess] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteUserOnline, setRemoteUserOnline] = useState(false);
  const [toastCounter, setToastCounter] = useState(0);
  const [dateEndInMilliseconds, setDateEndInMilliseconds] = useState(null);
  let state = useSelector((state) => state);
  let room = state.video.room;
  const user = state.user.user;
  const remoteUser = state.video.remote_user;
  const remoteUserPublic = state.video.remote_user_public;
  const room_unsubscribes = state.video.room_unsubscribes;
  const remote_user_unsubscribes = state.video.remote_user_unsubscribes;
  const navigate = useNavigate();
  const remoteStreamRef = useRef(remoteStream);
  const containerRef = useRef(null);
  remoteStreamRef.current = remoteStream;

  const init_page = async () => {
    try {
      make_sure_one_reload_before_start();
      handle_not_refresh();
      set_entry_time();
      if (!room_unsubscribes) await watch_room();
      window.addEventListener("beforeunload", handle_exit);
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

  const handle_not_refresh = async () => {
    setTimeout(() => {
      console.log("do not refresh");
      setDoNotRefresh(false);
    }, 7000);
  };
  const handler_mute_event = (stream) => {
    try {
      stream.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.addEventListener("mute", (e) => {
            infoLog("mute detected");
            e.stopImmediatePropagation();
            setMute(true);
          });
          track.addEventListener("unmute", (e) => {
            e.stopImmediatePropagation();
            infoLog("unmute detected");
            setMute(false);
          });
        }
      });
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
  const handle_got_stream = async (stream) => {
    try {
      setRemoteStream(new MediaStream(stream));
      setStreamBlock(stream);
      handler_mute_event(stream);
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
      else if (answer && !goToDecision) await signal_answer(answer);
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
  const handle_remote_user_update = async () => {
    setRemoteUserOnline(remoteUserPublic?.isOnline);
    if (!remoteUserPublic || check_if_just_entry_to_date()) return;
    if (!remoteUserPublic.isOnline && remoteStream) {
      await handle_remote_video_stopped();
    } else {
      handle_restarting_video();
    }
  };
  const handle_remote_video_stopped = async () => {
    try {
      setToastCounter(toastCounter + 1);
      if (window.location.href.includes("video-date") && toastCounter <= 1) {
        await toast(SNACK_BAR_TYPES.REMOTE_USER_LEFT_ROOM(remoteUser?.name), {
          type: "info",
        });
        setVideoStopped(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handle_room_update = async () => {
    try {
      if (!room) return;
      if (!remote_user_unsubscribes)
        await watch_remote_user(get_remote_user_id());
      const myId = user.private.id;
      debugger;
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
        await end_video_date();
        navigate(AppRoutes.AFTER_VIDEO);
      }
      if (!dateEndInMilliseconds)
        setDateEndInMilliseconds(room.startTime + 1000 * 60 * 7);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_no_permissions = async () => {
    await toast("חסרות הרשאות למצלמה", { type: "error" });
  };
  const handle_questions_volume = (val) => {
    setVolume(val / 100);
  };
  const handle_restarting_video = () => {
    setVideoStopped(false);
    if (streamBlock?.active) setRemoteStream(streamBlock);
    if (window.location.href.includes("video-date") && toastCounter <= 1) {
      toast(SNACK_BAR_TYPES.REMOTE_USER_JOINED_ROOM(remoteUser?.name), {
        type: "info",
      });
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
  const handle_exit = async (e) => {
    setDoNotRefresh(true);
    if (e) e.stopImmediatePropagation();
    try {
      await stop_my_video();
      peer?.destroy();
    } catch (e) {
      console.error(e);
    }
  };

  const check_if_just_entry_to_date = () => {
    let entryTime = JSON.parse(localStorage.getItem("entry_time"));
    return entryTime + 7000 > new Date().getTime();
  };
  const set_entry_time = () => {
    let date = new Date();
    localStorage.setItem("entry_time", JSON.stringify(date.getTime()));
  };
  const get_remote_user_id = () => {
    return room.answerer.id === user.private.id
      ? room.caller.id
      : room.answerer.id;
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
      console.log("im the offering");
      setPeer(init_peer({ type: "offer" }));
    } catch (e) {
      console.error(e);
    }
  };
  const create_answer = (offer) => {
    try {
      console.log("im the answerer");
      setPeer(init_peer({ type: "answer", offer }));
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
  const soft_refresh_page = async (data) => {
    console.log("checkIfRefresh");
    if (check_if_refresh(data)) {
      console.info("soft_refresh_page");
      if (window.rn_app?.OS === "ios") {
        setNewProcess(true);
        await clean_room();
      } else {
        document.location.reload(true);
      }
    }
  };
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
      debugger;
      if (doNotRefresh) return;
      await handle_exit();
      setRemoteStream(null);
      await unsubscribe_room_listener();
      await set_go_to_decision();
      navigate(AppRoutes.AFTER_VIDEO);
    } catch (e) {
      console.error(e);
    }
  };
  const check_if_refresh = (data) => {
    let res = () => {
      return (
        (data?.current_mute || !data?.current_remote_video) &&
        !check_if_just_entry_to_date() &&
        !data.current_do_Not_Refresh &&
        data.current_remote_user_online
      );
    };
    return res();
  };
  const now = () => new Date().getTime();

  useEffect(() => {
    init_page();
    return () => {
      handle_exit();
    };
  }, []);
  useEffect(handle_room_update, [room]);
  useEffect(handle_date_time, [dateEndInMilliseconds]);
  useEffect(soft_refresh_page, [remoteStream]);
  useEffect(handle_remote_user_update, [remoteUserPublic?.isOnline]);
  useEffect(() => {
    const timer = setInterval(() => {
      let current_remote_video;
      let current_mute;
      let current_do_Not_Refresh;
      let current_remote_user_online;
      setRemoteStream((value) => {
        current_remote_video = value;
        return value;
      });
      setMute((value) => {
        current_mute = value;
        return value;
      });
      setDoNotRefresh((value) => {
        current_do_Not_Refresh = value;
        return value;
      });
      setRemoteUserOnline((value) => {
        current_remote_user_online = value;
        return value;
      });

      let data = {
        current_remote_video,
        current_mute,
        current_do_Not_Refresh,
        current_remote_user_online,
      };
      soft_refresh_page(data);
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="full-screen" data_cy="video-date-page">
        <MyVideo
          dateStarted={remoteStream}
          setLocalStream={setLocalStream}
          handle_no_permissions={handle_no_permissions}
        />

        {remoteStream && !videoStopped ? (
          <>
            {showTimer && (
              <LinearLoading
                endAction={() => {
                  end_video_date();
                }}
              />
            )}
            <RemoteVideo remoteStream={remoteStream} />
            <CurrentQuestion questionIndexes={room.questions} volume={volume} />
          </>
        ) : (
          <div className=" full-screen flex-center">
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
