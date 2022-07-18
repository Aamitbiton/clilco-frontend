import { useSelector } from "react-redux";

import {
  watch_room,
  add_offer_or_answer,
  clean_room,
} from "../../store/video/videoFunctions";
import { useEffect, useMemo, useRef, useState } from "react";
import "./v3Css.scss";
import firestore from "../../firebase/firestore";

export const VideoDate_v3 = () => {
  const [answerGiven, setAnswerGiven] = useState(false);
  const [offerGiven, setOfferGiven] = useState(false);
  let state = useSelector((state) => state);
  const user = state.user.user;
  let room = state.video.room;
  const roomRef = useRef(room);
  roomRef.current = room;
  const room_unsubscribes = state.video.room_unsubscribes;
  const localRef = useRef();
  const remoteRef = useRef();

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
  const peer_connection_events = () => {
    const im_the_caller = roomRef.current?.caller.id === user.private.id;
    if (im_the_caller) {
      pc.onicecandidate = (event) => {
        event.candidate && updateOfferCandidates(event.candidate.toJSON());
      };
    } else {
      pc.onicecandidate = (event) => {
        event.candidate && updateAnswerCandidates(event.candidate.toJSON());
      };
    }
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

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        console.log("detected disconnect");
      }
    };
  };
  const handler_caller = async () => {
    console.log("im the caller");
    setOfferGiven(true);
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    await add_offer_or_answer({
      offerOrAnswer: offer,
      roomId: room.id,
      type: "offer",
    });

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
  const handler_answer = async () => {
    if (!room.offer) return;
    console.log("im the answer");
    setAnswerGiven(true);

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
  const handle_questions_or_answer = () => {
    if (!room) return;
    const im_the_caller = room?.caller.id === user.private.id;

    if (!pc.currentRemoteDescription && room?.answer && im_the_caller) {
      const answerDescription = new RTCSessionDescription(room.answer);
      pc.setRemoteDescription(answerDescription);
    }
  };
  const handle_room_update = async () => {
    if (!room) return;
    peer_connection_events();
    const im_the_caller = room?.caller.id === user.private.id;
    if (im_the_caller && !room.offer && !offerGiven && localRef.current)
      await handler_caller();
    else if (!im_the_caller && !answerGiven && localRef.current)
      await handler_answer();
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
  const print_val = () => {
    console.log(remoteRef?.current?.srcObject?.active);
  };
  useEffect(() => {
    init_page();
    return () => {
      console.log("unload detected");
    };
  }, []);
  useEffect(handle_questions_or_answer, [room?.answer, room?.offer]);
  useEffect(handle_room_update, [room]);
  useEffect(print_val, [remoteRef]);

  return (
    <div className="videos">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button style={{ marginTop: "200px" }} onClick={() => clean_room()}>
          clean room
        </button>
        <button className="hangup button"></button>
        <div tabIndex={0} role="button" className="more button">
          <div className="popover">
            <button>Copy joining code</button>
          </div>
        </div>
      </div>
    </div>
  );
};
