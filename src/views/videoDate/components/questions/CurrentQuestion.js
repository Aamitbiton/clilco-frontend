import React, { useEffect, useRef, useState } from "react";
import "./currentQuestion.scss";
import { get_question_audio } from "../../../../store/video/videoFunctions";
import { question_texts } from "./question_texts";
import { send_message_to_rn } from "../../../../store/reactNative/rnFunctions";

export const CurrentQuestion = ({ questionIndexes, volume }) => {
  // const [src, setSrc] = useState(null);

  const handle_next_question = async () => {
    const currentIndex = [...questionIndexes].pop();
    await handle_question_url({ index: currentIndex });
  };
  const audioRef = useRef();
  const handle_question_url = async ({ index }) => {
    window.my_audio_src = await get_question_audio({ index: index.toString() });
    play_question();
  };
  const play_question = () => {
    audioRef.current?.play();
    console.log("play quest");
  };
  const handle_volume_change = async () => {
    if (volume && audioRef?.current?.volume) {
      audioRef.current.volume = volume;
      localStorage.setItem("questions-volume", JSON.stringify(volume));
    }
  };
  const created = async () => {
    if (questionIndexes?.length < 2) await handle_question_url({ index: "0" });
    const vol = JSON.parse(localStorage.getItem("questions-volume"));
    if (vol && audioRef?.current?.volume) audioRef.current.volume = vol;
  };

  useEffect(handle_next_question, [questionIndexes]);
  useEffect(created, []);
  useEffect(handle_volume_change, [volume]);
  return (
    <>
      <div className="question-area">
        <div className="question-text">
          <span>
            {question_texts[questionIndexes[questionIndexes.length - 1]]}
          </span>
        </div>
        <audio
          playsInline={true}
          ref={audioRef}
          src={window.my_audio_src}
          style={{ visibility: "hidden" }}
        />
      </div>
    </>
  );
};
