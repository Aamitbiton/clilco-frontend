import React, { useEffect, useRef, useState } from "react";
import "./currentQuestion.scss";
import { get_question_audio } from "../../../../store/video/videoFunctions";
import { question_texts } from "./question_texts";

export const CurrentQuestion = ({ questionIndexes }) => {
  const [src, setSrc] = useState(null);

  const handle_next_question = async () => {
    const currentIndex = [...questionIndexes].pop();
    await handle_question_url({ index: currentIndex });
  };
  const handle_question_url = async ({ index }) => {
    const url = await get_question_audio({ index: index.toString() });
    setSrc(url);
  };
  useEffect(handle_next_question, [questionIndexes]);
  useEffect(async () => {
    await handle_question_url({ index: "0" });
  }, []);

  return (
    <>
      <div className="question-area">
        <div className="question-text">
          <span>
            {question_texts[questionIndexes[questionIndexes.length - 1]]}
          </span>
        </div>
        <audio autoPlay={true} src={src}></audio>
      </div>
    </>
  );
};
