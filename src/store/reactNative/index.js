import constants from "./rnConstants";
const { SET_EXPO_TOKEN } = constants;

const authInterface = {
  expo_token: null,
};

export default function auth(state = authInterface, action) {
  switch (action.type) {
    case SET_EXPO_TOKEN:
      return { ...state, expo_token: action.payload };

    default:
      return state;
  }
}
