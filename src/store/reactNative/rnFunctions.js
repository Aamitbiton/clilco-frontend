import { update_user_private } from "../../services/user";
import actionsCreator from "../actionsCreator";
import * as api from "../../services/api";
import { store } from "../index";
import { infoLog } from "../../utils/logs";
const { getState, dispatch } = store;

export const send_message_to_rn = (data) => {
  console.log("message send to Rn");
  window.ReactNativeWebView && window.postMessage(JSON.stringify(data));
};

export const startReactNativeHandle = () => {
  window.rn.OS === "android"
    ? document.addEventListener("message", expo_message_handler)
    : window.addEventListener("message", expo_message_handler);
  get_expo_token();
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

export async function save_expo_token_in_db(expoToken) {
  await update_user_private({ expoToken });
}

export async function expo_message_handler() {}
