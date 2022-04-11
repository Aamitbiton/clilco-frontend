import VIDEO_CONSTANTS from "./constants";

const {
  SET_ROOM_UNSUBSCRIBES,
  SET_ROOM,
  SET_SPEED_DATE_TIME,
  SET_DATE_STARTED,
  SET_REMOTE_USER,
} = VIDEO_CONSTANTS;
const videoInterface = {
  room: null,
  speed_date_time: {},
  date_started: false,
  room_unsubscribes: false,
  remote_user: null,
};

export default function video(state = videoInterface, action) {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, room: action.payload };

    case SET_SPEED_DATE_TIME:
      return { ...state, speed_date_time: action.payload };

    case SET_DATE_STARTED:
      return { ...state, date_started: action.payload };

    case SET_ROOM_UNSUBSCRIBES:
      return { ...state, room_unsubscribes: action.payload };

    case SET_REMOTE_USER:
      return { ...state, remote_user: action.payload };

    default:
      return state;
  }
}
