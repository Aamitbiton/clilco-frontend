import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lobby.scss";
import { watch_room, search_for_match } from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import { MyVideoInLobby } from "./components/myVideo/MyVideoInLobby";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import AppButton from "../../components/Buttons/AppButton";
import AppRoutes from "../../app/AppRoutes";
import { toast } from "react-toastify";
import CounterAnimation from "../../components/animations/counterAnimation/CounterAnimation";

export const Lobby = () => {
  const [localStream, setLocalStream] = useState(null);
  const room = useSelector((state) => state.video.room);
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const isMobile = useSelector((state) => state.app.isMobile);

  const navigate = useNavigate();

  const init_page = async () => {
    try {
      await watch_room();
      const res = await search_for_match();
      if (!res?.found) await handle_user_availability(true);
      handle_page_leaving();
    } catch (e) {
      console.error(e);
    }
  };
  const handle_page_leaving = () => {
    ["beforeunload", "popstate"].forEach((eventType) =>
      window.addEventListener(eventType, handle_exit)
    );
    if (isMobile)
      window.addEventListener("visibilitychange", (event) => {
        if (document.visibilityState === "hidden") handle_exit();
        else if (document.visibilityState === "visible")
          handle_user_availability(true);
        console.log(document.visibilityState);
      });
  };

  const go_to_date = () => {
    navigate(AppRoutes.VIDEO_DATE);
  };
  const handle_no_permissions = async () => {
    await toast("חסרות הרשאות למצלמה", { type: "error" });
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
      handle_user_availability(false);
      stop_my_video();
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  const handle_back_btn = async () => {
    try {
      await handle_exit();
      navigate(AppRoutes.ROOT);
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  useEffect(init_page, []);

  return (
    <>
      <div className="full-screen">
        {room && <CounterAnimation onEnd={go_to_date} />}
        <MyVideoInLobby
          setLocalStream={setLocalStream}
          handle_no_permissions={handle_no_permissions}
        />

        {!room && (
          <div className="back-btn-from-lobby-to-home flex-center">
            <AppButton
              data_cy="lobby-btn"
              variant="contained"
              width="250"
              backgroundColor="#db1b87"
              labelColor="white"
              onClick={handle_back_btn}
              label={translate("lobby.back")}
              children={
                <ChevronLeftOutlined
                  style={{ marginRight: "10px", color: "white" }}
                />
              }
            />
          </div>
        )}
      </div>
    </>
  );
};
