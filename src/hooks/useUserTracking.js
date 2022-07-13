import React, { useEffect, useState } from "react";
import {
  handle_user_availability,
  set_user_is_online,
} from "../store/user/userFunctions";
import { useLocation } from "react-router-dom";
import AppRoutes from "../app/AppRoutes";

function useUserTracking() {
  const [visibilityState, setVisibilityState] = useState(null);
  const location = useLocation();
  const set_available_to_date = async (visibility) => {
    if (visibility === "visible" && location.pathname === AppRoutes.LOBBY) {
      await handle_user_availability(true);
    } else await handle_user_availability(false);
  };
  const user_tracking = async ({ isOnline }) => {
    await set_user_is_online(isOnline, "useUserTracking");
  };
  useEffect(() => {
    user_tracking({ isOnline: true });
  }, []);
  if (window.rn_app) {
    window.addEventListener(
      "visibilitychange",
      async (event) => {
        event.stopImmediatePropagation();
        setVisibilityState(document.visibilityState);
        await set_available_to_date(document.visibilityState);
        if (document.visibilityState === "hidden") {
          await set_user_is_online(false, "visibilitychange");
        } else if (document.visibilityState === "visible") {
          await set_user_is_online(true, "visibilitychange");
        }
      },
      false
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
    false
  );

  return {
    visibilityState,
  };
}

export default useUserTracking;
