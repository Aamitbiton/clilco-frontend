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
  window.postMessage = function (data) {
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(data);
  };
  init_back_btn();
  get_expo_token();
};

function init_back_btn() {
  window.backBtnAndroid = new Event("backBtnAndroid");
  window.addEventListener("backBtnAndroid", backBtnAndroidHandler, false);
  async function backBtnAndroidHandler() {
    const navigate = getState().app.global_hooks.navigator;
    if (window.location.pathname !== "/") navigate(-1);
    else send_message_to_rn({ closeApp: true });
  }
}

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
