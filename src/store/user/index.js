import USER_CONSTANTS from './constants';
const {SET_USER} = USER_CONSTANTS;

const userInterface = {
    user: {}
}

export default function user(state = userInterface, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

