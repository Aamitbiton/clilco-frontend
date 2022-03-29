import actionsCreator from '../actionsCreator'
import {watch_auth_changes} from '../auth/authFunctions'
import {watch_user} from '../user/userFunctions'
import {store} from "../index";
import APP_CONSTANTS from './constants';
const {getState, dispatch} = store


export const init_app = async () => {
    await watch_auth_changes(async () => {
        await actionsCreator(APP_CONSTANTS.SET_APP_READY, true);
    })
}

export const init_app_data = async () => {
    await watch_user();
    // probably more functions will be added here
}