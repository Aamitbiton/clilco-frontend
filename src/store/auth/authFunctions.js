import * as firestore from '../../firebase/firestore'
import actionsCreator from '../actionsCreator'
import * as authService from '../../services/auth'
import * as userService from '../../services/user'
import * as api from '../../services/api'

import {store} from "../index";

const {getState, dispatch} = store


export const login_with_google = async () => {
    const firebaseUser = await authService.login_with_google();
    const userDoc = await userService.get_user();
    await actionsCreator("SET_USER", userDoc);
    debugger
    // if (!userDoc.phone) {
    // }// go to phone page
    // if (!userDoc.area) {
    // }// go to phone registration form

}

export const watch_auth_changes = async (set_app_ready) => {
    await authService.watch_auth_changes(async (user) => {
        set_app_ready();
        await actionsCreator("SET_IS_LOGGED_IN", user != null);
        if (user) {
            const userDoc = await userService.get_user();
            await actionsCreator("SET_USER", userDoc);
        }
    });
}

export const login_with_facebook = async () => {
    const firebaseUser = await authService.login_with_facebook();
    const userDoc = await userService.get_user();
    await actionsCreator("SET_USER", userDoc);
    if (!userDoc.phone) {
    }// go to phone page
    if (!userDoc.area) {
    }// go to phone registration form

}
export const send_sms = async (phoneNumber) => {
   await api.send_sms(phoneNumber)
    return true
}

