import AUTH_CONSTANTS from './constants';
const {SET_IS_LOGGED_IN,SET_APP_READY} = AUTH_CONSTANTS;

const authInterface = {
    is_logged_in: false,
    app_ready: false,
}

export default function auth(state = authInterface, action) {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return { ...state, is_logged_in: action.payload };

        default:
            return state;
    }
}

