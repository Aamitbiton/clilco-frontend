import * as firestore from '../../firebase/firestore'
import actionsCreator from '../actionsCreator'
import * as userService from '../../services/user'
import {store} from "../index";
const {getState,dispatch} = store



export const get_user = async () => {
    const userDoc = await userService.get_user();
    await actionsCreator("SET_USER", userDoc);
    return userDoc
}