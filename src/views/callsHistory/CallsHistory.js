import React, { useEffect, useRef, useState } from "react";
import "./callsHistory.scss";
import { get_calls } from "../../store/video/videoFunctions";
import { SingleCall } from "./components/singleCall/SingleCall";
import AppButton from "../../components/Buttons/AppButton";
import { useSelector } from "react-redux";
import { create_snackBar, reset_snackBar } from "../../store/app/appFunctions";

export const CallsHistory = () => {
  const [calls, setCalls] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const created = async () => {
    await get_more_calls();
  };

  const get_more_calls = async () => {
    const new_calls = await get_calls();
    if (are_all_users_new(new_calls)) {
      setCalls([...calls, ...new_calls]);
    } else await handle_duplication();
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
      <div className="calls">
        {calls
          .sort((a, b) => b.startTime - a.startTime)
          .map((call, i) => (
            <SingleCall key={i} call={call} />
          ))}
        {enabled && (
          <AppButton
            margin={15}
            rounded={false}
            height={50}
            labelColor="white"
            borderColor="turquise"
            onClick={get_more_calls}
            width="75%"
            label={translate("calls.get_more_calls")}
          />
        )}
      </div>
    </>
  );
};
