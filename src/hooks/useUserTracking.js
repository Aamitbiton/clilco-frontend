import React, { useEffect, useState } from "react";
import {
  handle_user_availability,
  set_user_is_online,
} from "../store/user/userFunctions";

function useUserTracking() {
  const [visibilityState, setVisibilityState] = useState(null);
  const [previewsState, setPreviewsState] = useState(null);
  const user_tracking = async ({ isOnline }) => {
    await set_user_is_online(isOnline, "useUserTracking");
  };
  useEffect(() => user_tracking({ isOnline: true }), []);
  if (window.rn_app) {
    window.addEventListener(
      "visibilitychange",
      async (event) => {
        setVisibilityState(document.visibilityState);
        if (visibilityState === "hidden") {
          await set_user_is_online(false, "visibilitychange");
        } else if (visibilityState === "visible") {
          await set_user_is_online(true, "visibilitychange");
        }
      },
      { once: true }
    );
  }
  window.addEventListener(
    "beforeunload",
    async (event) => await set_user_is_online(false, "beforeunload"),
    { once: true }
  );

  return {
    visibilityState,
  };
}

export default useUserTracking;
