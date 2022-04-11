import * as auth from "../firebase/auth";
import { create_user_with_email } from "../firebase/auth";

export async function login_with_google() {
  return await auth.logInWithProvider("google");
}

export async function login_with_facebook() {
  return await auth.logInWithProvider("facebook");
}

export async function watch_auth_changes(callBack) {
  await auth.on_auth_state_changed(callBack);
}

export function get_current_user() {
  return auth.get_current_user();
}

export async function signOut() {
  await auth.logOut();
}

export async function resetPassword(email) {
  return await auth.resetPassword(email);
}

export async function login_with_email({ email, password }) {
  const res = await auth.create_user_with_email({ email, password });
  if (!res.error) return res;
  if (res.error && email_already_in_use()) {
    return await auth.login_with_email({ email, password });
  }
  function email_already_in_use() {
    return new RegExp(/email-already-in-use/g).test(res.message);
  }
}
