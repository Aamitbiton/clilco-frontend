import {store} from "../index";
import firestore from '../../firebase/firestore'
const {getState,dispatch} = store
import actionsCreator from '../actionsCreator'
import * as authService from '../../services/auth'
import * as userService from '../../services/user'

export const  runSignInWithGoogle =async ()=>{
let firebaseUser = await authService.login_with_google();
//get the user from the firestore
let userDoc = await userService.get_user();
// let userDoc = await firestore.getDocument(`users/${firebaseUser.uid}`);
//write the user in state
await dispatch(actionsCreator("SET_USER", userDoc))
//check if send to home or registration     
}

