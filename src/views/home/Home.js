import React, { useEffect } from "react";
import "./home.css";
import { Header } from "./components/header/header";
import MainView from "./components/MainView";
import useUserTracking from "../../hooks/useUserTracking";

export const Home = () => {
  useUserTracking();
  return (
    <div className="home full-screen ">
      <Header />
      <div className="content">
        <MainView />
      </div>
    </div>
  );
};
