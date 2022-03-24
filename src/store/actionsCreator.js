import {store} from "./index";
const {getState, dispatch} = store

export default async function actionsCreator(type, payload) {
    await dispatch({type, payload});
}
