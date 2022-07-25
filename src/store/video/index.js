import VIDEO_CONSTANTS from "./constants";

const {
  SET_ROOM_UNSUBSCRIBES,
  SET_ROOM,
  SET_SPEED_DATE_TIME,
  SET_DATE_STARTED,
  SET_LAST_CALLS_DOCS,
  SET_REMOTE_USER,
  SET_REMOTE_USER_UNSUBSCRIBES,
  SET_REMOTE_USER_PUBLIC,
  SET_SUCCESS_CALLS,
} = VIDEO_CONSTANTS;
const videoInterface = {
  room: null,
  speed_date_time: {},
  date_started: false,
  room_unsubscribes: false,
  remote_user: null,
  current_question: { index: 0, url: null },
  last_calls_docs: {
    callerLastDoc: [],
    answererLastDoc: [],
  },
  success_calls: [],
  remote_user_unsubscribes: false,
  remote_user_public: null,
};

export default function video(state = videoInterface, action) {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, room: action.payload };

    case SET_SPEED_DATE_TIME:
      return {
        ...state,
        speed_date_time: { ...state.speed_date_time, ...action.payload },
      };

    case SET_DATE_STARTED:
      return { ...state, date_started: action.payload };

    case SET_ROOM_UNSUBSCRIBES:
      return { ...state, room_unsubscribes: action.payload };

    case SET_REMOTE_USER:
      return { ...state, remote_user: action.payload };

    case SET_LAST_CALLS_DOCS:
      return { ...state, last_calls_docs: action.payload };

    case SET_REMOTE_USER_UNSUBSCRIBES:
      return { ...state, remote_user_unsubscribes: action.payload };

    case SET_REMOTE_USER_PUBLIC:
      return { ...state, remote_user_public: action.payload };
    case SET_SUCCESS_CALLS:
      return { ...state, success_calls: action.payload };
    default:
      return state;
  }
}
