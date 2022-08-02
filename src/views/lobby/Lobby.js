import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./lobby.scss";
import {
  watch_room,
  search_for_match,
  get_num_of_rooms_today,
} from "../../store/video/videoFunctions";
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
import useUserTracking from "../../hooks/useUserTracking";
import InternetSpeed from "./components/internetSpeed/InternetSpeed";
import { Users } from "./components/users/Users";
const WRTC_PERMISSION_DENIED_MESSAGE = "Permission denied";

export const Lobby = () => {
  const [loader, setLoader] = useState(true);
  const [internetSpeed, setInternetSpeed] = useState(false);
  const [note, setNote] = useState(
    NotesInstances.lobby_information_message(0, 0, false)
  );
  const [counterInternetSpeed, setCounterInternetSpeed] = useState(0);
  const [localStream, setLocalStream] = useState(null);
  const [video_is_ready, set_video_is_ready] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const room = useSelector((state) => state.video.room);
  const translate = useSelector((state) => state.app.global_hooks.translate);
  const speed_date_time = useSelector((state) => state.video.speed_date_time);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();


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
      console.log('init page running')
      await watch_room();
      const res = await search_for_match();
      if (!res?.found) await handle_user_availability(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handle_not_dating_time = () => {
    if (speed_date_time.its_dating_time || user.public.testUser) return;
    setModalVisible(true);
    setTimeout(() => {
      handle_back_btn();
    }, 5000);
  };
  const go_to_date = () => {
    if (!room) return;
    navigate(AppRoutes.VIDEO_DATE);
  };
  const handle_no_permissions = async (e) => {
    if (e.message === WRTC_PERMISSION_DENIED_MESSAGE) {
      navigate(AppRoutes.ROOT);
      await toast("חסרות הרשאות למצלמה. אנא אפשר גישה למצלמה.", {
        type: "error",
      });
      return;
    }
    alert(e.message);
    console.error("LOCAL VIDEO ERROR: ", e.message);
    navigate(AppRoutes.ROOT);
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
  const handle_internet_speed = async () => {
    if (!internetSpeed) return;
    else if (internetSpeed < 5) {
      if (counterInternetSpeed < 3)
        setCounterInternetSpeed(counterInternetSpeed + 1);
      else {
        toast("אינטרנט חלש לא ניתן להתחבר לשיחה", { type: "error" });
        await handle_back_btn();
      }
    } else setCounterInternetSpeed(0);
    console.log("speed change", internetSpeed);
  };
  const handle_video_ready = () => {
    if (localStream?.active && !video_is_ready) {
      set_video_is_ready(true);
    }
  };
  const handle_rooms_today = async (flag) => {
    let startDate = new Date();
    startDate.setHours("19");
    const rooms = await get_num_of_rooms_today({ startDate, isSucceed: true });
    if (rooms.rooms > 0) {
      const successRate = Math.ceil(rooms?.succeed_dates / rooms?.rooms);
      if (successRate > 0)
        setNote(
          NotesInstances.lobby_information_message(
            rooms?.rooms,
            `${successRate}%`,
            flag
          )
        );
    }
  };

  useEffect(() => {
    if (!video_is_ready) return;
    init_page();
    let flag = false;
    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "visible") {
        console.log("from the listener");
        await init_page();
      }
    });
    const interval = setInterval(async () => {
      flag = !flag;
      await handle_rooms_today(flag);
    }, 10000);

    return () => {
      document.removeEventListener("visibilitychange", () => {
        console.log("visibilitychange removed.");
      });
      clearInterval(interval);
      handle_exit();
    };
  }, [video_is_ready]);
  useEffect(handle_not_dating_time, [speed_date_time.its_dating_time]);
  useEffect(() => {
    if (!localStream) return;
    handle_video_ready();
  }, [localStream]);
  useEffect(go_to_date, [room]);
  useEffect(handle_internet_speed, [internetSpeed]);

  return (
    <>
      <InternetSpeed
        setInternetSpeed={(val) => {
          setInternetSpeed(val);
        }}
      />
      {loader && <AppLoader />}
      <div className="full-screen">
        {!room && !loader && <Note note={note} />}
        {!room && !loader && <LobbyLoader />}
        {!is_suspended() && !loader && (
          <MyVideoInLobby
            setLocalStream={setLocalStream}
            handle_no_permissions={handle_no_permissions}
          />
        )}
        {!room && <Users setLoader={setLoader} />}

        {!room && !loader && (
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
