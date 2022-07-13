import React, { useEffect, useState } from "react";
import {
  handle_user_availability,
  set_user_is_online,
} from "../store/user/userFunctions";
import { useLocation } from "react-router-dom";
import AppRoutes from "../app/AppRoutes";

function useUserTracking(props) {
  const [visibilityState, setVisibilityState] = useState(null);
  const location = useLocation();
  const user_tracking = async ({ isOnline }) => {
    await set_user_is_online(isOnline);
  };
  useEffect(() => {
    user_tracking({ isOnline: true });
  }, []);
  window.addEventListener(
    "visibilitychange",
    async (event) => {
      event.stopImmediatePropagation();
      setVisibilityState(document.visibilityState);
      if (document.visibilityState === "hidden") {
        await set_user_is_online(false);
      } else if (document.visibilityState === "visible") {
        console.log({ currentPath: location.pathname });
        await set_user_is_online(true);
      }
    },
    false
  );
  window.addEventListener(
    "beforeunload",
    async (event) => {
      event.stopImmediatePropagation();
      // event.preventDefault();
      // event.returnValue = "";
      await set_user_is_online(false);
    },
    false
  );

  return {
    visibilityState,
  };
}

export default useUserTracking;
