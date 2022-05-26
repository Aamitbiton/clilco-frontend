import React, { useEffect, useState } from "react";
import {
  handle_user_availability,
  set_user_is_online,
} from "../store/user/userFunctions";
import { useSelector } from "react-redux";

function useUserTracking() {
  const is_logged_in = useSelector((s) => s.app.is_logged_in);
  const [visibilityState, setVisibilityState] = useState(null);

  const user_tracking = async ({ isOnline }) => {
    await set_user_is_online(isOnline, "useUserTracking");
  };
  useEffect(() => user_tracking({ isOnline: true }), []);

  if (window.rn_app) {
    window.addEventListener(
      "visibilitychange",
      async (event) => {
        event.stopImmediatePropagation();
        setVisibilityState(document.visibilityState);
        if (document.visibilityState === "hidden") {
          await set_user_is_online(false, "visibilitychange");
        } else if (document.visibilityState === "visible") {
          await set_user_is_online(true, "visibilitychange");
        }
      },
      { once: true }
    );
  }
  window.addEventListener(
    "beforeunload",
    async (event) => {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // event.returnValue = "";
      await set_user_is_online(false, "beforeunload");
    },
    { once: true }
  );

  return {
    visibilityState,
  };
}

export default useUserTracking;
