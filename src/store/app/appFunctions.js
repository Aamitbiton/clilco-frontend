import actionsCreator from '../actionsCreator'
import {watch_auth_changes} from '../auth/authFunctions'
import {get_next_speed_date_time} from '../video/videoFunctions'
import {store} from "../index";
import APP_CONSTANTS from './constants';
import {init_i18next} from "../../i18next";
const {getState, dispatch} = store


export const init_app = async ({navigator}) => {
    await watch_auth_changes(async () => {
        const translate = await init_i18next()
        await actionsCreator('GLOBAL_HOOKS',{navigator, translate})
        await actionsCreator(APP_CONSTANTS.SET_APP_READY, true);
    })
    await get_next_speed_date_time()


}



