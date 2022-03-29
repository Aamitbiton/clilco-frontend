import * as firestore from '../../firebase/firestore'
import actionsCreator from '../actionsCreator'
import {watch_auth_changes} from '../auth/authFunctions'
import {get_user} from '../user/userFunctions'
import {store} from "../index";
import APP_CONSTANTS from './constants';
const {getState,dispatch} = store


export const init_app = async () => {
    await watch_auth_changes(async ()=>{
        await actionsCreator(APP_CONSTANTS.SET_APP_READY, true);
        await get_user();
        await actionsCreator(APP_CONSTANTS.FINISHED_FETCHING_USER, true);
    })
}