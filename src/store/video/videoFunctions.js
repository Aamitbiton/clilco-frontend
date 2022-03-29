import actionsCreator from '../actionsCreator'
import * as videoService from '../../services/video'
import {store} from "../index";
import VIDEO_CONSTANTS from './constants';
const {getState, dispatch} = store


export const watch_room = async () => {
    await videoService.watch_room((room)=>{
        //todo: if there is room - start video
        // after date consider to delete the room or add parameter to stop listening
        // maybe user the rooms as יומן שיחות
    })
}