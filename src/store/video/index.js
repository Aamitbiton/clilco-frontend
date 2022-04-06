import VIDEO_CONSTANTS from "./constants";

const {
  SET_ROOM_UNSUBSCRIBES,
  SET_ROOM,
  SET_SPEED_DATE_TIME,
  SET_DATE_STARTED,
} = VIDEO_CONSTANTS;
const videoInterface = {
  room: null,
  speed_date_time: null,
  date_started: false,
  room_unsubscribes: false,
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

    default:
      return state;
  }
}
