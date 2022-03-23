import {App} from './app';
import {
  getAuth,
  signOut,
  deleteUser,
  getIdToken,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {callAbleFunction} from "../firebase/functions";

const Auth = getAuth();
const provider = new GoogleAuthProvider()

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

async function logInWithGoogle(){
try {
    let result = await signInWithPopup(Auth, provider);
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  return user


}catch (e) {

}





}

export default {
  deleteAccount,
  logOut,
  getToken,
  logInWithGoogle
}
