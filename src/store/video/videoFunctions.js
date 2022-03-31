import actionsCreator from '../actionsCreator'
import * as videoService from '../../services/video'
import {store} from "../index";
import VIDEO_CONSTANTS from './constants';
import {set_user_available} from "../user/userFunctions";
import {webRTCConfiguration} from "../../views/videoDate/videoUtils";

const {getState, dispatch} = store


export const watch_room = async () => {
    await videoService.watch_room(async (room) => {
        if (room) await actionsCreator(VIDEO_CONSTANTS.SET_ROOM, room);
        //todo: if there is room - start video
        // after date consider to delete the room or add parameter to stop listening
        // maybe user the rooms as יומן שיחות

        // dont forget to stop watching rooms if not available
    })
}

export const get_next_speed_date_time = async () => {
    const time = await videoService.get_next_speed_date_time();
    if (time?.milliseconds) await actionsCreator(VIDEO_CONSTANTS.SET_SPEED_DATE_TIME, time.milliseconds)
}

export const go_available = async () => {
    await watch_room();
    await set_user_available();
}

export const watch_video_state = async () => {
    const room = getState().video.room
    room && await init_video_date()
    await actionsCreator(VIDEO_CONSTANTS.SET_DATE_STARTED, true)
}
export const init_video_date = async () => {

    const pc = new RTCPeerConnection(webRTCConfiguration);
    pc.onicecandidate = event => {
        // event.candidate && // todo: add to firebase event.candidate.toJSON()
    }
    const createOffer = async () => {
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };
        // todo: send offer to db;
    }

}


const DBroom = {
    userIds: [],
    offerCandidate: {},
    answerCandidate: {},
};
