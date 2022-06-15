import { update_user_private } from "../../services/user";
import actionsCreator from "../actionsCreator";
import * as api from "../../services/api";
import { store } from "../index";
import { infoLog } from "../../utils/logs";
import * as authServices from "../../services/auth";

const { getState, dispatch } = store;

export const send_message_to_rn = (data) => {
  console.log("message send to Rn");
  /** Accept object: {type: string, payload: any} */
  window.ReactNativeWebView && window.postMessage(JSON.stringify(data));
};

export const startReactNativeHandle = async () => {
  await set_user_token_to_rn();
  send_message_to_rn({ type: "fired_app_review", payload: null });
  window.rn_app.OS === "android"
    ? document.addEventListener("message", expo_message_handler)
    : window.addEventListener("message", expo_message_handler);
  // await get_expo_token();
  // await set_user_token_to_rn();
};

function get_expo_token(dispatch) {
  window.expoTokenEvent = new Event("expoTokenEvent");
  window.addEventListener("expoTokenEvent", async (e) => {
    try {
      const expoToken = window.reactNativeData.expoToken;
      await save_expo_token_in_db({ expoToken });
    } catch (e) {
      console.log(e);
      infoLog("failed to save expo token in user document");
    }
  });
}

export async function set_user_token_to_rn() {
  const user_token = await authServices.get_token_id();
  await send_message_to_rn({ type: "save_user_token", payload: user_token });
}

export async function save_expo_token_in_db(expoToken) {
  await update_user_private({ expoToken });
}

export async function set_user_id_to_rn(uid) {
  await send_message_to_rn({ type: "save_user_id", payload: uid });
}

export async function expo_message_handler() {}
