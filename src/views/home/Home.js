import React, { useState } from "react";
import "./home.css";
import { Header } from "./components/header/header";
import MainView from "./components/MainView";
import AppModal from "../../components/AppModal";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <div className="home full-screen ">
      <Header />
      <div className="content">
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
        >
          <Typography>HELLO SASSI!!!!</Typography>
        </AppModal>
        <MainView />
      </div>
    </div>
  );
};
