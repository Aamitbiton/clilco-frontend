import * as firestore from "../../firebase/firestore";
import actionsCreator from "../actionsCreator";
import * as authService from "../../services/auth";
import * as userService from "../../services/user";
import * as api from "../../services/api";
import { store } from "../index";
import { set_user_is_online, watch_user } from "../user/userFunctions";
import USER_CONSTANTS from "../user/constants";
const { getState, dispatch } = store;

export const login_with_google = async () => {
  const firebaseUser = await authService.login_with_google();

  //todo: check if its work without this code;
  // const user = getState().user.user;
  // if (!user.private.phone) {
  //   getState().app.global_hooks.navigator("/verify-phone");
  // } else {
  //   getState().app.global_hooks.navigator("/");
  // }
};

export const watch_auth_changes = async (set_app_ready) => {
  await authService.watch_auth_changes(async (user) => {
    set_app_ready();
    await actionsCreator("SET_IS_LOGGED_IN", user != null);
    await watch_user();
  });
};

export const login_with_facebook = async () => {
  const firebaseUser = await authService.login_with_facebook();
  const user = getState().user.user;
  if (!user.private.phone) {
    getState().app.global_hooks.navigator("/verify-phone");
  } else {
    getState().app.global_hooks.navigator("/");
  }
};

export const send_sms = async (phoneNumber) => {
  let userId = getState().user.user.private.id;
  return await api.send_sms(phoneNumber, userId);
};

export const check_password = async (code) => {
  let userId = getState().user.user.private.id;
  const res = await api.check_password(userId, code);
  if (res.data.name) {
    await actionsCreator(USER_CONSTANTS.SET_TEMP_USER, res.data);
  }
  return res;
};

export const signOut = async () => {
  await set_user_is_online(false, "signOut");
  await authService.signOut();
};
export const login_with_email = async ({ email, password }) => {
  return await authService.login_with_email({ email, password });
};

export const resetPassword = async (email) => {
  return await authService.resetPassword(email);
};

export const remove_account = async () => {
  await authService.remove_account();
  await authService.signOut();
};
