import React, { useEffect, useRef, useState } from "react";
import "./callsHistory.scss";
import { get_calls } from "../../store/video/videoFunctions";
import { SingleCall } from "./components/singleCall/SingleCall";
import { Header } from "../home/components/header/header";
import AppButton from "../../components/Buttons/AppButton";
import { useSelector } from "react-redux";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";
import LoadingButton from "@mui/lab/LoadingButton";

export const CallsHistory = () => {
  const [calls, setCalls] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const created = async () => {
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
  return (
    <>
      <Header />
      <div className="calls">
        {calls.length ? (
          <>
            {calls
              .sort((a, b) => b.startTime - a.startTime)
              .map((call, i) => (
                <SingleCall key={i} call={call} />
              ))}

            {enabled && (
              <LoadingButton
                style={{
                  height: "50px",
                  width: "100%",
                  marginTop: "30px",
                }}
                loading={showLoading}
                className="get-more-btn"
                variant={"outlined"}
                onClick={get_more_calls}
              >
                {translate("calls.get_more_calls")}
              </LoadingButton>
            )}
          </>
        ) : (
          <h1>{translate("calls.no_calls")}</h1>
        )}
      </div>
    </>
  );
};
