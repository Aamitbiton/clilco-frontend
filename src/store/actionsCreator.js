import { store } from "./index";
const { getState, dispatch } = store;

export default function actionsCreator(type, payload) {
  dispatch({ type, payload });
}
