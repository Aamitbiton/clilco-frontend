import {App} from './app';
import {
  getAuth,
  signOut,
  deleteUser,
  getIdToken,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "firebase/auth";
import {callAbleFunction} from "src/firebase/functions";

const Auth = getAuth();

async function deleteAccount() {
  try {
    const token = await Auth.currentUser.getIdToken();
    const uid = Auth.currentUser.uid;
    const res = await callAbleFunction("deleteAccountByUser", {token, uid});
    if(res.data.success) console.log("user removed");
    if(res.data.error) alert("הפעולה נכשלה, אנא פנה לתמיכה.");
  } catch (e) {
    alert("הפעולה נכשלה, בדוק את חיבור האינטרנט שלך או פנה לתמיכה")
  }
}

async function getToken() {
  return await getIdToken(Auth.currentUser);
}

async function logOut() {
  return await signOut(Auth);
}

async function logIn(phoneNumber, appVerifier) {
  try {
    return await signInWithPhoneNumber(Auth, phoneNumber, appVerifier)
  } catch (e) {
  }
}

export default {
  deleteAccount,
  logOut,
  logIn,
  getToken
}
