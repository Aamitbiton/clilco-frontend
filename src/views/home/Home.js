import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";
import { StartDate } from "./components/startDate/StartDate";
import { NotDateTime } from "./components/notDateTime/NotDateTime";
import { Header } from "./components/header/header";
import { APP_ROUTS } from "../constants";
import Title from "../../components/title/title";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const navigate = useNavigate();
  const videoState = useSelector((state) => state.video);
  const [isVideoTime, setIsVideoTime] = useState(false);

  useEffect(() => {
    setIsVideoTime(check_if_speed_dating_time());
  }, [videoState]);

  const check_if_speed_dating_time = () => {
    let { start, end } = videoState.speed_date_time;
    start = new Date(start).toString();
    end = new Date(end).toString();
    let currentTime = new Date().toString();
    if (
      start.localeCompare(currentTime) <= 0 &&
      end.localeCompare(currentTime) >= 0
    ) {
      setIsVideoTime(true);
    } else {
      setIsVideoTime(false);
    }
  };

  const handle_start_date_click = () => {
    navigate(APP_ROUTS.VIDEO_DATE);
  };
  return (
    <>
      <div className="home full-screen ">
        <Header />

        <Title title={"חווית ספיד דייט חכם"} />
        <Typography className={"flex-center"} color={"white"} variant={"h5"}>
          מוכנים?
        </Typography>
        <div className="content">
          {isVideoTime ? (
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
