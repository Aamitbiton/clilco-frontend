import { SET_USERS, SET_TIPTOP_USERS } from "./constants";

const matches_state_interface = {
  users: [],
  tip_top_users: [],
};

export default function matches(state = matches_state_interface, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_TIPTOP_USERS:
      return { ...state, tip_top_users: action.payload };
    default:
      return state;
  }
}
