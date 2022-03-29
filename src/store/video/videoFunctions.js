import actionsCreator from '../actionsCreator'
import * as videoService from '../../services/video'
import {store} from "../index";
import VIDEO_CONSTANTS from './constants';
const {getState, dispatch} = store


export const watch_room = async () => {
    await videoService.watch_room((room)=>{
        //todo: if there is room - start video
    })
}