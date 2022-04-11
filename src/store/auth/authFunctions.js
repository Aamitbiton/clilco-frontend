import * as firestore from "../../firebase/firestore";
import actionsCreator from "../actionsCreator";
import * as authService from "../../services/auth";
import * as userService from "../../services/user";
import * as api from "../../services/api";
import { store } from "../index";
import { watch_user } from "../user/userFunctions";
const { getState, dispatch } = store;

export const login_with_google = async () => {
  const firebaseUser = await authService.login_with_google();
  const user = getState().user.user;
  if (!user.private.phone) {
    getState().app.global_hooks.navigator("/verify-phone");
  } else {
    getState().app.global_hooks.navigator("/");
  }
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
  return await api.check_password(userId, code);
};

export const signOut = async () => {
  await authService.signOut();
};
export const login_with_email = async ({ email, password }) => {
  return await authService.login_with_email({ email, password });
};

export const resetPassword = async (email) => {
  return await authService.resetPassword(email);
};
