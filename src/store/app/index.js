import APP_CONSTANTS from "./constants";

const {
  SET_APP_READY,
  FINISHED_FETCHING_USER,
  GLOBAL_HOOKS,
  LNG,
  SET_IS_MOBILE,
  SET_SNACK_BAR,
  SET_USER_TRACKED,
} = APP_CONSTANTS;
const appInterface = {
  app_ready: false,
  finished_fetching_user: false,
  global_hooks: null,
  lng: null,
  isMobile: false,
  user_tracked: false,
  snackBar: { open: false, handleClose: null, message: null },
};

export default function app(state = appInterface, action) {
  switch (action.type) {
    case SET_APP_READY:
      return { ...state, app_ready: action.payload };

    case FINISHED_FETCHING_USER:
      return { ...state, finished_fetching_user: action.payload };

    case GLOBAL_HOOKS:
      return { ...state, global_hooks: action.payload };

    case LNG:
      return { ...state, lng: action.payload };

    case SET_IS_MOBILE:
      return { ...state, isMobile: action.payload };
    case SET_SNACK_BAR:
      return { ...state, snackBar: { ...state.snackBar, ...action.payload } };
    case SET_USER_TRACKED:
      return { ...state, user_tracked: action.payload };
    default:
      return state;
  }
}
