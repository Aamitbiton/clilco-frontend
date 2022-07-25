import React, { useEffect, useRef, useState } from "react";
import "./callsHistory.scss";
import { get_calls } from "../../store/video/videoFunctions";
import { SingleCall } from "./components/singleCall/SingleCall";
import { Header } from "../home/components/header/header";
import { useSelector } from "react-redux";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import LoadingButton from "@mui/lab/LoadingButton";
import AppStack from "../../components/AppStack";
import Title from "../../components/title/title";
import FadeAnimation from "../../components/animations/Fade/FadeAnimation";
import AppLoader from "../../components/AppLoader/AppLoader";
import ZoomAnimation from "../../components/animations/Zoom/ZoomAnimation";
import CallsBadge from "./components/CallsBadge";

export const CallsHistory = () => {
  const [calls, setCalls] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const created = async () => {
    localStorage.setItem("last_visited_calls", Date.now().toString());
    await get_more_calls();
  };

  const get_more_calls = async () => {
    setShowLoading(true);
    const new_calls = await get_calls();
    if (are_all_users_new(new_calls)) {
      setCalls([...calls, ...new_calls]);
    } else await handle_duplication();
    setShowLoading(false);
  };
  const are_all_users_new = (new_calls) => {
    return !new_calls.some((call1) =>
      calls.some((call2) => call2.id === call1.id)
    );
  };

  const handle_duplication = async () => {
    await create_snackBar({
      message: "אין עוד שיחות",
      action: reset_snackBar,
    });
    setEnabled(false);
  };

  const translate = useSelector((s) => s.app.global_hooks.translate);
  useEffect(created, []);
  if (showLoading) return <AppLoader />;
  return (
    <FadeAnimation visible={true}>
      <Header />
      <div className="calls-page">
        <CallsBadge />
        <Title textAlign={"center"} title={translate("calls.title")} />
        {calls.length ? (
          <ZoomAnimation visible={!!calls.length}>
            <AppStack direction={"column"} alignItems={"center"}>
              {calls
                .sort((a, b) => b.startTime - a.startTime)
                .map((call, i) => (
                  <SingleCall key={i} call={call} />
                ))}
            </AppStack>
          </ZoomAnimation>
        ) : (
          <ZoomAnimation visible={!calls.length}>
            <h1 className="no-calls">{translate("calls.no_calls")}</h1>
          </ZoomAnimation>
        )}
      </div>
    </FadeAnimation>
  );
};
