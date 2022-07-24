import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  watch_room,
  add_offer_or_answer,
  clean_room,
  unsubscribe_room_listener,
  set_go_to_decision,
  update_question_in_room,
  update_call_answer,
} from "../../store/video/videoFunctions";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./videoDate.scss";

import firestore from "../../firebase/firestore";
import AppRoutes from "../../app/AppRoutes";
import CounterAnimation from "../../components/animations/counterAnimation/CounterAnimation";
import AppLoader from "../../components/AppLoader/AppLoader";
import { MyVideo } from "./components/myVideo/MyVideo";
import { LinearLoading } from "./components/linerLoading";
import { RemoteVideo } from "./components/remoteVideo/RemoteVideo";
import { CurrentQuestion } from "./components/questions/CurrentQuestion";
import { ReconnectView } from "./components/reconnectView/ReconnectView";
import { VideoButtons } from "./components/videoButtons/VideoButtons";
import { infoLog } from "../../utils/logs";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import { SNACK_BAR_TYPES } from "../../store/app/snackBarTypes";
import { question_texts } from "./components/questions/question_texts";

export const VideoDate_v3 = () => {
  const [startedTimer, setStartedTimer] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const [videoClass, setVideoClass] = useState("remote-video");
  const [setupSourcesDone, setSetupSourcesDone] = useState(false);
  const [showTimer, setShowTimer] = useState(null);
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("questions-volume") || 1)
  );
  const [counterAnimation, setCounterAnimation] = useState(false);
  const [answerGiven, setAnswerGiven] = useState(false);
  const [dateEndInMilliseconds, setDateEndInMilliseconds] = useState(null);
  const [offerGiven, setOfferGiven] = useState(false);
  const [remoteDescriptionRun, setRemoteDescriptionRun] = useState(false);
  let state = useSelector((state) => state);
  const isMobile = state.app.isMobile;
  const user = state.user.user;
  let room = state.video.room;
  const roomRef = useRef(room);
  roomRef.current = room;
  const room_unsubscribes = state.video.room_unsubscribes;
  const localRef = useRef();
  const remoteRef = useRef();
  const navigate = useNavigate();
  const mediaConstraints = {
    mandatory: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    },
  };
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
      {
        urls: "turn:52.48.207.110:3478",
        username: "chaim",
        credential: "itserious123",
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const pc = useMemo(() => new RTCPeerConnection(servers), []);

  const init_page = async () => {
    try {
      await setupSources();
      if (!room_unsubscribes) await watch_room();
      setCounterAnimation(true);
    } catch (e) {
      console.error(e);
    }
  };
  const peer_connection_events = async () => {
    pc.onconnectionstatechange = (event) => {

      if (pc.connectionState === "disconnected") {
        console.log("detected disconnect");
        end_video_date()
      }
    };
    const im_the_caller = roomRef.current?.caller.id === user.private.id;
    if (!roomRef.current.offer && !offerGiven && im_the_caller)
      await handler_caller();
  };
  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;
    setSetupSourcesDone(true);
    console.log("this is need to be the first");
    await peer_connection_events();
  };
  const set_video_size = () => {
    setVideoSize({
      width: remoteRef.current.videoWidth,
      height: remoteRef.current.videoHeight,
    });
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
  const handle_room_update = async () => {
    if (!room) return;
    if (room.goToDecision) {
      await handle_exit();
      navigate(AppRoutes.AFTER_VIDEO);
    }
    const im_the_caller = room?.caller.id === user.private.id;
    if (
      !pc.currentRemoteDescription &&
      room?.answer &&
      im_the_caller &&
      pc.signalingState === "have-local-offer" &&
      !remoteDescriptionRun
    ) {
      setRemoteDescriptionRun(true);
      const answerDescription = new RTCSessionDescription(room.answer);
      await pc.setRemoteDescription(answerDescription);
    }
    check_if_handle_answer();
  };
  const handle_questions_volume = (val) => {
    setVolume(val / 100);
  };
  const handle_counter_animation_end = async () => {
    infoLog("animation end");
    setCounterAnimation(false);
    let callAnswer = remoteRef?.current?.srcObject.active;
    console.log("call answer:", callAnswer);
    await set_call_answer(!!callAnswer);
  };
  const set_call_answer = async (value) => {
    if (!room) return;
    await update_call_answer({ roomId: room.id, value: value });
  };
  const now = () => new Date().getTime();


  //only answerer functions
  const handler_answer = async () => {
    if (!room.offer) return;
    setAnswerGiven(true);
    await start_answer_event();
    const offerDescription = room.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    await add_offer_or_answer({
      offerOrAnswer: answer,
      roomId: room.id,
      type: "answer",
    });
  };
  const start_answer_event = async () => {
    pc.onicecandidate = (event) => {
      event.candidate && updateAnswerCandidates(event.candidate.toJSON());
    };
    let q = await firestore.getQuery(`clilco_rooms/${room.id}/offerCandidates`);
    firestore.onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data.offerCandidates));
        }
      });
    });
  };
  const updateAnswerCandidates = async (candidates) => {
    await firestore.createDoc(
      `clilco_rooms/${roomRef.current.id}/answerCandidates`,
      {
        answerCandidates: candidates,
      }
    );
  };
  const check_if_handle_answer = async () => {
    if (!roomRef.current) return false;
    const im_the_answer = roomRef.current?.answerer.id === user.private.id;
    if (
      im_the_answer &&
      !answerGiven &&
      setupSourcesDone &&
      roomRef.current?.offer
    ) {
      console.log("this is need to be second");
      await handler_answer();
    }
  };

  //only caller functions
  const handler_caller = async () => {
    await start_caller_event();
    setOfferGiven(true);
    const offerDescription = await pc.createOffer(mediaConstraints);
    pc.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    await add_offer_or_answer({
      offerOrAnswer: offer,
      roomId: room.id,
      type: "offer",
    });
  };
  const start_caller_event = async () => {
    pc.onicecandidate = (event) => {
      event.candidate && updateOfferCandidates(event.candidate.toJSON());
    };
    let q = await firestore.getQuery(
      `clilco_rooms/${room.id}/answerCandidates`
    );
    firestore.onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          const candidate = new RTCIceCandidate(data.answerCandidates);
          pc.addIceCandidate(candidate);
        }
      });
    });
  };
  const updateOfferCandidates = async (candidates) => {
    await firestore.createDoc(
      `clilco_rooms/${roomRef.current.id}/offerCandidates`,
      {
        offerCandidates: candidates,
      }
    );
  };

  const end_video_date = async () => {
    try {
      await handle_exit();
      await unsubscribe_room_listener();
      await set_go_to_decision();
      navigate(AppRoutes.AFTER_VIDEO);
    } catch (e) {
      console.error(e);
    }
  };
  const handle_room_time_update = async () => {
    if (dateEndInMilliseconds || !room) return;
    setDateEndInMilliseconds(room.startTime + 1000 * 60 * 7);
  };
  const handle_exit = async (e) => {
    if (e) e.stopImmediatePropagation();
    try {
      pc?.close();
      localRef?.current?.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
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


  useEffect(() => {
    init_page();
    return () => {
      console.log("unload detected");
      handle_exit()
    };
  }, []);
  useEffect(handle_room_update, [room]);
  useEffect(handle_date_time, [dateEndInMilliseconds]);
  useEffect(handle_room_time_update, [room?.startTime]);
  useEffect(() => {
    let video_class = "remote-video ";
    if (isMobile && videoSize.width < videoSize.height)
      video_class += "both-mobile-video-style ";
    if (isMobile && videoSize.width > videoSize.height)
      video_class += "local-mobile-remote-desktop-video-style ";
    setVideoClass(video_class);
  }, [videoSize]);

  return (
    <>
      {counterAnimation && (
        <CounterAnimation
          onEnd={() => handle_counter_animation_end()}
          onMiddle={() => {
            check_if_handle_answer();
          }}
        />
      )}

      <div className="full-screen" data_cy="video-date-page">
        {showTimer && (
            <LinearLoading
                endAction={() => {
                  end_video_date();
                }}
            />
        )}
        <video
          onLoadedData={set_video_size}
          ref={remoteRef}
          autoPlay
          playsInline
          className={videoClass}
        />
        <video
          ref={localRef}
          autoPlay
          playsInline
          className="reverse-video my-video-in-date"
        />

        {room && (
          <CurrentQuestion questionIndexes={room?.questions} volume={volume} />
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
