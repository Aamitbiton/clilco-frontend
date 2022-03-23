import {store} from "../index";
import auth from '../../firebase/auth'
import firestore from '../../firebase/firestore'
const {getState,dispatch} = store

export const  runSignInWithGoogle =async ()=>{
let firebaseUser = await auth.logInWithGoogle();
//get the user from the firestore
let userDoc = await firestore.getDocument(`users/${firebaseUser.uid}`);
//write the user in state
await dispatch({type:'SET_USER',payload:userDoc})
//check if send to home or registration     
}

