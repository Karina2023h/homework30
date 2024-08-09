import { combineReducers } from "redux";
import swapiReducer from "./swapiReducer";

const rootReducer = combineReducers({
  swapi: swapiReducer,
});

export default rootReducer;
