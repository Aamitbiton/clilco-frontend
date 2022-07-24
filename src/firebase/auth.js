import { App } from "./app";
import {
  getAuth,
  signOut,
  deleteUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  onAuthStateChanged,
  signInWithPopup,
  signInWithCredential,
  sendPasswordResetEmail,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { callAbleFunction } from "./functions";
import { send_message_to_rn } from "../store/reactNative/rnFunctions";
import { globalFetch } from "../utils/fetch";

const Auth = getAuth();

const facebook_provider = new FacebookAuthProvider();
const google_provider = new GoogleAuthProvider();

export async function deleteAccount() {
  try {
    const token = await Auth.currentUser.getIdToken();
    const uid = Auth.currentUser.uid;
    const res = (await callAbleFunction("deleteAccountByUser", { token, uid }))
      .data;
    if (res.success) console.log("user removed");
    if (res.error) alert("הפעולה נכשלה, אנא פנה לתמיכה.");
  } catch (e) {
    alert("הפעולה נכשלה, בדוק את חיבור האינטרנט שלך או פנה לתמיכה");
  }
}

export async function getToken() {
  return await getIdToken(Auth.currentUser);
}

export async function logOut() {
  return await signOut(Auth);
}

export function get_current_user() {
  return Auth.currentUser;
}

export function on_auth_state_changed(callBack) {
  return onAuthStateChanged(Auth, callBack);
}

export async function create_user_with_email({ email, password }) {
  try {
    await createUserWithEmailAndPassword(Auth, email, password);
    return { error: false, message: "created_user_with_email" };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

export async function login_with_email({ email, password }) {
  try {
    await signInWithEmailAndPassword(Auth, email, password);
    return { error: false, message: "login_with_email" };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(Auth, email);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function login_with_facebook() {
  if (window.rn_app) {
    send_message_to_rn({ type: "login_with_facebook", payload: null });
    return;
  }
  try {
    const res = await signInWithPopup(Auth, facebook_provider);
    const credential = facebook_provider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user;
    console.log({ token, user });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.error({ errorCode, errorMessage, email, credential });
  }
}

export async function login_with_google() {
  // if (window.rn_app) {
  //   send_message_to_rn({ type: "login_with_google", payload: null });
  // } else {
  // }
  await login_with_google_web();

  async function login_with_google_web() {
    try {
      let result = await signInWithRedirect(Auth, google_provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
    } catch (e) {}
  }
}

export async function restore_email_by_phone(phone) {
  try {
    const res = await globalFetch({
      url: "https://us-central1-clilco.cloudfunctions.net/get_email_by_phone_number",
      data: { phone },
    });
    console.log("get_email_by_phone", res);
    return res;
  } catch (e) {
    console.error(e);
  }
}
