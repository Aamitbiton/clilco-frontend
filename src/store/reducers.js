import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import video from "./video";
import app from "./app";
import matches from "./matches";
export default combineReducers({
  user,
  matches,
  auth,
  app,
  video,
});
