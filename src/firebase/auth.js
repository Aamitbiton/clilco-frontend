import {App} from './app';
import {
  getAuth,
  signOut,
  deleteUser,
  getIdToken,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import {callAbleFunction} from "../firebase/functions";

const Auth = getAuth();

const facebook_provider = new FacebookAuthProvider();
const google_provider = new GoogleAuthProvider()

export async function deleteAccount() {
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

export async function getToken() {
  return await getIdToken(Auth.currentUser);
}

export async function logOut() {
  return await signOut(Auth);
}

export function get_current_user() {
  return Auth.currentUser
}

export function on_auth_state_changed(callBack) {
  return onAuthStateChanged(Auth,callBack)
}

export async function logInWithProvider(providerName){
try {
  const provider = providerName === 'google' ? google_provider : facebook_provider
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

