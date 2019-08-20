import { combineReducers } from "redux";
import getWeatherReducer from "./getWeatherReducer";

export default combineReducers({
  weather: getWeatherReducer
});