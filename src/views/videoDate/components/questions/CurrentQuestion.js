import React, { useEffect, useRef, useState } from "react";
import "./currentQuestion.scss";
import { get_first_question } from "../../../../store/video/videoFunctions";
import { question_texts } from "./question_texts";

export const CurrentQuestion = ({ questionIndexes }) => {
  const [src, setSrc] = useState(null);

  const handle_next_question = async () => {
    const questionUrl = ""; // get the question from storage
    setSrc(questionUrl);
  };
  useEffect(handle_next_question, [questionIndexes]);
  useEffect(async () => {
    await get_first_question();
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
