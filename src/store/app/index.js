import APP_CONSTANTS from './constants';

const {SET_APP_READY,FINISHED_FETCHING_USER,GLOBAL_HOOKS} = APP_CONSTANTS;
const appInterface = {
    app_ready: false,
    finished_fetching_user:false,
    global_hooks: null

}

export default function app(state = appInterface, action) {
    switch (action.type) {
        case SET_APP_READY:
            return {...state, app_ready: action.payload};

        case FINISHED_FETCHING_USER:
            return {...state, finished_fetching_user: action.payload};

            case GLOBAL_HOOKS:
            return {...state, global_hooks: action.payload};

        default:
            return state;
    }
}

