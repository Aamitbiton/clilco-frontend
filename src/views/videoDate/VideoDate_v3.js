import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  watch_room,
  add_offer_or_answer,
  clean_room,
  unsubscribe_room_listener,
  set_go_to_decision,
} from "../../store/video/videoFunctions";
import { useEffect, useMemo, useRef, useState } from "react";
import "./v3Css.scss";
import firestore from "../../firebase/firestore";
import AppRoutes from "../../app/AppRoutes";

export const VideoDate_v3 = () => {
  const [answerGiven, setAnswerGiven] = useState(false);
  const [offerGiven, setOfferGiven] = useState(false);
  const [remoteDescriptionRun, setRemoteDescriptionRun] = useState(false);
  let state = useSelector((state) => state);
  const user = state.user.user;
  let room = state.video.room;
  const roomRef = useRef(room);
  roomRef.current = room;
  const room_unsubscribes = state.video.room_unsubscribes;
  const localRef = useRef();
  const remoteRef = useRef();

  const navigate = useNavigate();
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const pc = useMemo(() => new RTCPeerConnection(servers), []);

  const init_page = async () => {
    try {
      if (!room_unsubscribes) await watch_room();
      await setupSources();
      window.addEventListener("beforeunload", () => {
        console.log("unload detected");
      });
    } catch (e) {
      console.error(e);
    }
  };
  const peer_connection_events = async () => {
    pc.onconnectionstatechange = (event) => {
      console.log("pc state:", pc.signalingState);

      if (pc.connectionState === "disconnected") {
        console.log("detected disconnect");
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

    await peer_connection_events();
  };
  const handler_caller = async () => {
    console.log("im the caller");
    await start_caller_event();
    setOfferGiven(true);
    const offerDescription = await pc.createOffer();
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
  const handler_answer = async () => {
    if (!room.offer) return;
    console.log("im the answer");
    await start_answer_event();
    setAnswerGiven(true);
    const offerDescription = room.offer;
    pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    pc.setLocalDescription(answerDescription);

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
  const handle_questions_or_answer = async () => {
    if (!room) return;
    const im_the_caller = room?.caller.id === user.private.id;
    if (!im_the_caller && !answerGiven && localRef.current && room.offer)
      await handler_answer();
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
      pc.setRemoteDescription(answerDescription);
    }
  };
  const updateAnswerCandidates = async (candidates) => {
    console.log("write answer candidates");
    await firestore.createDoc(
      `clilco_rooms/${roomRef.current.id}/answerCandidates`,
      {
        answerCandidates: candidates,
      }
    );
  };
  const updateOfferCandidates = async (candidates) => {
    console.log("write offer candidates");

    await firestore.createDoc(
      `clilco_rooms/${roomRef.current.id}/offerCandidates`,
      {
        offerCandidates: candidates,
      }
    );
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
          console.log("add answerCandidates to pc");
        }
      });
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
          console.log("add offerCandidates to pc");
        }
      });
    });
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
  const handle_exit = async (e) => {
    if (e) e.stopImmediatePropagation();
    try {
      pc?.close();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init_page();
    return () => {
      console.log("unload detected");
    };
  }, []);
  useEffect(handle_questions_or_answer, [room?.answer, room?.offer]);
  useEffect(handle_room_update, [room]);

  return (
    <div className="videos">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button style={{ marginTop: "200px" }} onClick={() => clean_room()}>
          clean room
        </button>
        <div tabIndex={0} role="button" className="more button">
          <div className="popover">
            <button onClick={() => end_video_date()}>end call</button>
          </div>
        </div>
      </div>
    </div>
  );
};
