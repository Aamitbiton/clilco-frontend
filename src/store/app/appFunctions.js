import actionsCreator from "../actionsCreator";
import { watch_auth_changes } from "../auth/authFunctions";
import {
  get_next_speed_date_time,
  watch_start_date,
} from "../video/videoFunctions";
import {
  set_user_token_to_rn,
  startReactNativeHandle,
} from "../reactNative/rnFunctions";
import { store } from "../index";
import APP_CONSTANTS from "./constants";
import { init_i18next } from "../../i18next";
const { getState, dispatch } = store;

export const init_app = async ({ navigator }) => {
  await watch_auth_changes(async () => {
    const { translate, lng } = await init_i18next();
    await actionsCreator("GLOBAL_HOOKS", { navigator, translate });
    await actionsCreator(APP_CONSTANTS.SET_APP_READY, true);
    await actionsCreator(APP_CONSTANTS.LNG, lng);
    if (window.rn_app) await startReactNativeHandle();
  });
  await get_next_speed_date_time();
  const isMobile = window.innerWidth < 450;
  await actionsCreator(APP_CONSTANTS.SET_IS_MOBILE, isMobile);
  await watch_start_date();
};

export const create_snackBar = async ({ message, action }) => {
  await actionsCreator(APP_CONSTANTS.SET_SNACK_BAR, {
    open: true,
    handleClose: action,
    message,
  });
};

export const reset_snackBar = async () => {
  await actionsCreator(APP_CONSTANTS.SET_SNACK_BAR, {
    open: false,
    handleClose: null,
    message: null,
  });
};
