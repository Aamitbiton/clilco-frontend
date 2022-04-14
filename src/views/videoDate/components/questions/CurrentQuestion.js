import React, { useEffect, useRef, useState } from "react";
import "./currentQuestion.scss";
import { get_first_question } from "../../../../store/video/videoFunctions";
import { useSelector } from "react-redux";
import { question_texts } from "./question_texts";

export const CurrentQuestion = () => {
  const currentQuestion = useSelector((state) => state.video.current_question);
  const handle_next_question = async () => {};
  useEffect(handle_next_question, [currentQuestion]);
  useEffect(async () => {
    await get_first_question();
  }, []);

  return (
    <>
      <div className="question-area">
        <div className="question-text">
          <span>{question_texts[currentQuestion.index]}</span>
        </div>
        <audio autoPlay={true} src={currentQuestion.url}></audio>
      </div>
    </>
  );
};
