import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import { StartDate } from "./components/startDate/StartDate";
import { NotDateTime } from "./components/notDateTime/NotDateTime";
import { Header } from "./components/header/header";
import { APP_ROUTS } from "../constants";
import Title from "../../components/title/title";
import { Route } from "react-router-dom";

export const Home = () => {
  const videoState = useSelector((state) => state.video);
  const navigate = useSelector((state) => state.app.global_hooks.navigator);
  return (
    <div className="home full-screen ">
      <Header />
      <div className="content">
        <Title title={"חווית ספיד דייט חכם"} />
        {videoState.speed_date_time.its_dating_time ? (
          <StartDate navigate={navigate} />
        ) : (
          <NotDateTime
            navigate={navigate}
            datesStartedMilliseconds={videoState.speed_date_time.start}
          />
        )}
      </div>
    </div>
  );
};
