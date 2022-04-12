import React, { useEffect } from "react";
import "./afterVideo.css";
import { end_date } from "../../store/video/videoFunctions";

export const AfterVideo = () => {
  const created = async () => {
    await end_date();
  };
  useEffect(created, []);
  return (
    <>
      <h1>AfterVideo</h1>
    </>
  );
};
