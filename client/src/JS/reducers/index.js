import { combineReducers } from "redux";
import { userReducers } from "./userreducers";
import { companyreducers } from "./companyreducers";

export const rootReducer = combineReducers({
  userR: userReducers,
  companyR: companyreducers,
});
