import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lobby.scss";
import { watch_room, search_for_match } from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import { MyVideoInLobby } from "./components/myVideo/MyVideoInLobby";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppButton from "../../components/Buttons/AppButton";
import AppRoutes from "../../app/AppRoutes";

export const Lobby = () => {
  const [localStream, setLocalStream] = useState(null);
  const room = useSelector((state) => state.video.room);
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const navigate = useNavigate();

  const init_page = async () => {
    try {
      await watch_room();
      const res = await search_for_match(true);
      if (!res?.found) await handle_user_availability(true);
      window.addEventListener("beforeunload", handle_exit);
    } catch (e) {
      debugger;
      console.error(e);
    }
  };
  const handle_room_update = async () => {
    if (room) navigate(AppRoutes.VIDEO_DATE);
  };
  const handle_no_permissions = () => {
    try {
      alert("אין לך הרשאות למצלמה");
      //todo: Add here appModal
    } catch (e) {
      debugger;
      console.error(e);
    }
  };
  const stop_my_video = () => {
    try {
      let tracks = localStream?.getTracks();
      tracks?.forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      setLocalStream(null);
    } catch (e) {
      debugger;
      console.error(e);
    }
  };
  const handle_exit = () => {
    try {
      stop_my_video();
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  const handle_back_btn = async () => {
    try {
      await handle_exit();
      await handle_user_availability(false);
      navigate("/");
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  useEffect(init_page, []);
  useEffect(handle_room_update, [room]);

  return (
    <>
      <div className="full-screen">
        <MyVideoInLobby
          setLocalStream={setLocalStream}
          handle_no_permissions={handle_no_permissions}
        />

        <div className="back-btn">
          <AppButton
            borderColor="#db1b87"
            labelColor="white"
            onClick={handle_back_btn}
            label={translate("lobby.back")}
            children={
              <ChevronRightIcon
                style={{ marginRight: "10px", color: "#db1b87" }}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
