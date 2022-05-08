import actionsCreator from "../actionsCreator";
import * as api from "../../services/api";
import { store } from "../index";
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
    alert("back btn detected");
  }
}

function get_expo_token(dispatch) {
  window.expoTokenEvent = new Event("expoTokenEvent");
  window.addEventListener("expoTokenEvent", (e) => {
    const expoToken = window.reactNativeData.expoToken;
    //save expo token
    alert("find expo token" + expoToken);
  });
}

export function saveExpoTokenOnUserDoc() {}

export async function set_expo_token() {
  // const idToken = await auth.getToken();
  // send_message_to_rn({
  //   type: "saveExpoToken",
  //   payload: idToken,
  // });
  alert("try to send the firebase token to rn");
}
