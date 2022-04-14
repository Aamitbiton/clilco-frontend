import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import { StartDate } from "./components/startDate/StartDate";
import { NotDateTime } from "./components/notDateTime/NotDateTime";
import { Header } from "./components/header/header";
import { APP_ROUTS } from "../constants";
import Title from "../../components/title/title";

export const Home = () => {
  const navigate = useNavigate();
  const videoState = useSelector((state) => state.video);

  const handle_start_date_click = () => {
    navigate(APP_ROUTS.VIDEO_DATE);
  };
  return (
    <>
      <div className="home full-screen ">
        <Header />
        <Title title={"חווית ספיד דייט חכם"} />
        <div className="content">
          {videoState.its_dating_time ? (
            <StartDate handle_start_date_click={handle_start_date_click} />
          ) : (
            <NotDateTime
              datesStartedMilliseconds={videoState.speed_date_time.start}
            />
          )}
        </div>
      </div>
    </>
  );
};
