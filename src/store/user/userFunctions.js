import * as firestore from '../../firebase/firestore'
import USER_CONSTANTS from './constants'
import actionsCreator from '../actionsCreator'
import * as userService from '../../services/user'
import {store} from "../index";
import APP_CONSTANTS from "../app/constants";
const {getState,dispatch} = store



export const get_user = async () => {
    const userDoc = await userService.get_user();
    await actionsCreator(USER_CONSTANTS.SET_USER, userDoc);
    return userDoc
}


export const watch_user = async () => {
    await userService.watch_user(async (user)=>{
        debugger
        await actionsCreator(USER_CONSTANTS.SET_USER, user);
        await actionsCreator(APP_CONSTANTS.FINISHED_FETCHING_USER, true);
    });}