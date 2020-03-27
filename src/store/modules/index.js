import { combineReducers } from "redux";
import login from "./login";
import airports from "./airports";

export default combineReducers({
  login,
  airports
});
