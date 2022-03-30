import VIDEO_CONSTANTS from './constants';

const {SET_ROOM, SET_SPEED_DATE_TIME} = VIDEO_CONSTANTS;
const videoInterface = {
    room: null,
    speed_date_time: null
}

export default function video(state = videoInterface, action) {
    switch (action.type) {
        case SET_ROOM:
            return {...state, room: action.payload};

        case SET_SPEED_DATE_TIME:
            return {...state, speed_date_time: action.payload};

        default:
            return state;
    }
}

