import VIDEO_CONSTANTS from './constants';

const {} = VIDEO_CONSTANTS;
const videoInterface = {
    someState:''
}

export default function video(state = videoInterface, action) {
    switch (action.type) {
        // case SET_APP_READY:
        //     return {...state, app_ready: action.payload};

        default:
            return state;
    }
}

