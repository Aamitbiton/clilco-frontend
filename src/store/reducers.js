import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import app from "./app";
export default combineReducers({
  user,
  auth,
  app,
});
