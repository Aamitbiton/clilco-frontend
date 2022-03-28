import * as firestore from '../../firebase/firestore'
import actionsCreator from '../actionsCreator'
import {watch_auth_changes} from '../auth/authFunctions'
import {get_user} from '../user/userFunctions'
import {store} from "../index";
const {getState,dispatch} = store


export const init_app = async () => {
    await watch_auth_changes(async ()=>{
        await actionsCreator("SET_APP_READY", true);
        const user = await get_user();
        if (user) await actionsCreator("FINISHED_FETCHING_USER", true);
    })
}