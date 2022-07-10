import React, { useEffect, useState } from "react";
import { MyVideo } from "./components/myVideo/MyVideo";
import { LinearLoading } from "./components/linerLoading";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { CurrentQuestion } from "./components/questions/CurrentQuestion";
import { OtherUserPlaceHolder } from "./components/connecting/otherUserPlaceHolder";
import { VideoButtons } from "./components/videoButtons/VideoButtons";
import { useSelector } from "react-redux";
import "./videoDate.scss";

import {
  add_offer_or_answer,
  clean_room,
  get_remote_user_data,
  set_go_to_decision,
  unsubscribe_room_listener,
  update_question_in_room,
  watch_remote_user,
  watch_room,
  update_reload_counter_in_room,
  update_yourself_in_the_room,
  update_reloaded_in_room,
} from "../../store/video/videoFunctions";
import Peer from "simple-peer";
import { webRTCConfiguration } from "./videoUtils";
import AppRoutes from "../../app/AppRoutes";
import { toast } from "react-toastify";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import { SNACK_BAR_TYPES } from "../../store/app/snackBarTypes";
import { question_texts } from "./components/questions/question_texts";
import { useNavigate } from "react-router-dom";
import { infoLog } from "../../utils/logs";
import CounterAnimation from "../../components/animations/counterAnimation/CounterAnimation";
import AppLoader from "../../components/AppLoader/AppLoader";
import * as videoService from "../../services/video";

export const NewVideoDate = () => {
  const [peer, setPeer] = useState(null);
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("questions-volume") || 1)
  );
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [showTimer, setShowTimer] = useState(null);
  const [dateEndInMilliseconds, setDateEndInMilliseconds] = useState(null);
  const [streamBlock, setStreamBlock] = useState(null);
  const [newProcess, setNewProcess] = useState(true);
  const [startedTimer, setStartedTimer] = useState(false);
  const [mute, setMute] = useState(true);
  const [waitingForRefresh, setWaitingForRefresh] = useState(false);
  const [counterAnimation, setCounterAnimation] = useState(false);

  let state = useSelector((state) => state);
  let room = state.video.room;
  const room_unsubscribes = state.video.room_unsubscribes;
  const remoteUser = state.video.remote_user;
  const navigate = useNavigate();
  const user = state.user.user;

  /***created*/
  const init_page = async () => {
    try {
      if (!room_unsubscribes) await watch_room();
      await register_yourself_in_the_room();
      window.addEventListener("beforeunload", handle_exit);
    } catch (e) {
      console.error(e);
    }
  };

  /***webRtc connection and handler*/
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
  const create_offer = async () => {
    try {
      console.log("create offer");
      setPeer(init_peer({ type: "offer" }));
    } catch (e) {
      console.error(e);
    }
  };
  const create_answer = (offer) => {
    try {
      console.log("create answerer");
      setPeer(init_peer({ type: "answer", offer }));
    } catch (e) {
      console.error(e);
    }
  };
  const signal_answer = (answer) => {
    try {
      console.log("signal answer");
      console.log("peer destroyed", peer.destroyed);
      peer?.signal(answer);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_signal = async (offerOrAnswer) => {
    try {
      console.log("handle signal ");

      await add_offer_or_answer({
        offerOrAnswer,
        roomId: room.id,
        type: offerOrAnswer.type,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handle_caller = async ({ offer, answer, goToDecision }) => {
    try {
      console.log("handle caller");

      if (!offer) await create_offer();
      else if (answer && !goToDecision) await signal_answer(answer);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_answerer = async ({ offer, answer }) => {
    try {
      console.log("handle answerer");
      if (offer && !answer) await create_answer(offer);
    } catch (e) {
      console.error(e);
    }
  };
  const handler_mute_event = (stream) => {
    try {
      stream.getTracks().forEach((track) => {
        if (!window.location.href.includes("video-date")) track.stop();

        if (track.kind === "video") {
          track.addEventListener("mute", (e) => {
            setMute(true);
            e.stopImmediatePropagation();
            infoLog("mute detected");
          });
          track.addEventListener("unmute", (e) => {
            setMute(false);
            e.stopImmediatePropagation();
            infoLog("unmute detected");
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handle_counter_animation_end = () => {
    setCounterAnimation(false);
    let currentMute = get_current_value_from_state("Mute");
    if (currentMute && !remoteStream) {
      console.log("want to refresh");
      // register_yourself_in_the_room({ update: true, value: false });
    }
  };

  /**page managment functions*/
  const get_current_value_from_state = (stateName) => {
    let current_value;
    let string = `set${stateName}`;
    console.log(string);
    eval(string)((value) => {
      current_value = value;
      return value;
    });
    return current_value;
  };
  const register_yourself_in_the_room = async () => {
    try {
      if (room?.reloaded || !room) return;
      await update_yourself_in_the_room({
        roomId: room?.id,
        userId: user?.public.id,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const run_update_reloaded_in_room = async (value) => {
    try {
      if (!room) return;
      let roomId = room.id;
      update_reloaded_in_room({ roomId, value });
    } catch (e) {}
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
      await handle_exit();
      setRemoteStream(null);
      await unsubscribe_room_listener();
      await set_go_to_decision();
      navigate(AppRoutes.AFTER_VIDEO);
    } catch (e) {
      console.error(e);
    }
  };
  const returnToLobby = async () => {
    if (room) await videoService.end_date({ roomId: room.id });
    navigate(AppRoutes.LOBBY);
  };
  const now = () => new Date().getTime();

  /**handler functions*/
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
  const handle_got_stream = async (stream) => {
    try {
      setRemoteStream(new MediaStream(stream));
      setStreamBlock(stream);
      handler_mute_event(stream);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_questions_volume = (val) => {
    setVolume(val / 100);
  };
  const handle_no_permissions = async () => {
    // await toast("חסרות הרשאות למצלמה", { type: "error" });
  };
  const handle_exit = async (e) => {
    if (e) e.stopImmediatePropagation();
    try {
      await stop_my_video();
      peer?.destroy();
    } catch (e) {
      console.error(e);
    }
  };
  const handle_room_update = async () => {
    try {
      if (!room || !room?.reloaded || waitingForRefresh) return;
      if (!room.answer && !room.offer) setCounterAnimation(true);
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
        await end_video_date();
        navigate(AppRoutes.AFTER_VIDEO);
      }
      if (!dateEndInMilliseconds)
        setDateEndInMilliseconds(room.startTime + 1000 * 60 * 7);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_refresh_room_update = async () => {
    if (!room) return;
    const myId = user.private.id;
    if (room.reloadManagement && !room.reloaded) {
      let myUser = room.reloadManagement.filter((user) => user.userId === myId);
      if (myUser[0]?.reload) {
        setWaitingForRefresh(true);
        //need to be reloaded true
        await run_update_reloaded_in_room(true);

        window.location.reload(true);
      }
    }
  };

  useEffect(() => {
    init_page();
    return () => {
      handle_exit();
    };
  }, []);
  useEffect(handle_room_update, [room]);
  useEffect(handle_refresh_room_update, [room?.reloadManagement]);
  useEffect(handle_date_time, [dateEndInMilliseconds]);

  return (
    <>
      {counterAnimation && (
        <CounterAnimation onEnd={() => handle_counter_animation_end()} />
      )}
      {!room?.reloaded || !room || waitingForRefresh ? (
        <AppLoader
          props={{
            text: "אתה מועבר לדייט, אנא המתן...",
            timeOut: 8000,
            goBack: returnToLobby,
          }}
        />
      ) : (
        <div className="full-screen" data_cy="video-date-page">
          <MyVideo
            dateStarted={remoteStream}
            setLocalStream={setLocalStream}
            handle_no_permissions={handle_no_permissions}
          />

          {remoteStream ? (
            <>
              {showTimer && (
                <LinearLoading
                  endAction={() => {
                    end_video_date();
                  }}
                />
              )}
              <RemoteVideo remoteStream={remoteStream} />
              <CurrentQuestion
                questionIndexes={room.questions}
                volume={volume}
              />
            </>
          ) : (
            <div className=" full-screen flex-center">
              {/*{remoteUser && <OtherUserPlaceHolder user={remoteUser} />}*/}
              no remote video
            </div>
          )}
          <VideoButtons
            end_video_date={end_video_date}
            next_question={go_to_next_question_local}
            handle_questions_volume={handle_questions_volume}
            volume={volume * 100}
          />
        </div>
      )}
    </>
  );
};
