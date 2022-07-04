import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lobby.scss";
import { watch_room, search_for_match } from "../../store/video/videoFunctions";
import { handle_user_availability } from "../../store/user/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import { MyVideoInLobby } from "./components/myVideo/MyVideoInLobby";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import NotesInstances from "./components/notes/NotesInstances";
import AppButton from "../../components/Buttons/AppButton";
import AppRoutes from "../../app/AppRoutes";
import { toast } from "react-toastify";
import CounterAnimation from "../../components/animations/counterAnimation/CounterAnimation";
import Note from "./components/notes/Note";
import { SECOND, day_month_year } from "../../utils/dates";
import NotesContainer from "./components/notes/NotesContainer";
import AppLoader from "../../components/AppLoader/AppLoader";
import LobbyLoader from "./components/lobbyLoader/LobbyLoader";
import AppModal from "../../components/AppModal";
import Title from "../../components/title/title";

export const Lobby = () => {
  const [localStream, setLocalStream] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const room = useSelector((state) => state.video.room);
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const speed_date_time = useSelector((state) => state.video.speed_date_time);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const reject_suspended_user = () => {
    if (is_suspended()) {
      alert("הנך מושהה מן הדייטים עקב דיווח לרעה. נסה להתחבר בפעם הבאה.");
      navigate(AppRoutes.ROOT);
      return true;
    }
  };

  const is_suspended = () => {
    const suspended = user.private.suspended;
    if (!suspended) return;
    return (
      day_month_year(new Date()) === day_month_year(suspended.slice(-1)[0])
    );
  };

  const init_page = async () => {
    if (reject_suspended_user()) return;
    try {
      await watch_room();
      const res = await search_for_match();
      if (!res?.found) await handle_user_availability(true);
      // handle_page_leaving();
    } catch (e) {
      console.error(e);
    }
  };
  // const handle_page_leaving = () => {
  //   ["beforeunload", "popstate"].forEach((eventType) =>
  //     window.addEventListener(eventType, handle_exit)
  //   );
  //   if (isMobile)
  //     window.addEventListener("visibilitychange", (event) => {
  //       if (document.visibilityState === "hidden") handle_exit();
  //       else if (document.visibilityState === "visible")
  //         handle_user_availability(true);
  //       console.log(document.visibilityState);
  //     });
  // };
  const handle_not_dating_time = () => {
    debugger;
    if (speed_date_time.its_dating_time || user.testUser) return;
    setModalVisible(true);
    setTimeout(() => {
      handle_back_btn();
    }, 5000);
  };

  const go_to_date = () => {
    navigate(AppRoutes.VIDEO_DATE);
  };
  const handle_no_permissions = async () => {
    if (is_suspended()) return;
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
      console.error(e);
    }
  };
  const handle_exit = () => {
    try {
      handle_user_availability(false);
      stop_my_video();
    } catch (e) {
      console.error(e);
    }
  };
  const handle_back_btn = async () => {
    try {
      await handle_exit();
      navigate(AppRoutes.ROOT);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(init_page, []);
  useEffect(handle_not_dating_time, [speed_date_time.its_dating_time]);

  return (
    <>
      <div className="full-screen">
        {!room && <NotesContainer />}
        {!room && <LobbyLoader />}
        {room && <CounterAnimation onEnd={go_to_date} />}
        {!is_suspended() && (
          <MyVideoInLobby
            setLocalStream={setLocalStream}
            handle_no_permissions={handle_no_permissions}
          />
        )}

        {!room && (
          <div className="back-btn-from-lobby-to-home flex-center">
            <AppButton
              id="lobby-back-btn"
              data_cy="lobby-back-btn"
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
      <AppModal modalVisible={modalVisible} lockBackdrop={true}>
        <Title
          fontSize={"20px"}
          textAlign={"center"}
          color={"white"}
          title={"הדייטים הסתיימו! נתראה מחר ב21:00"}
        />
      </AppModal>
    </>
  );
};
