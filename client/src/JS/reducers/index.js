import { combineReducers } from "redux";
import { userReducers } from "./userreducers";
import { companyreducers } from "./companyreducers";
import { accountreducers } from "./accountreducers";
import { rapportreducers } from "./rapportreducers";

export const rootReducer = combineReducers({
  userR: userReducers,
  companyR: companyreducers,
  accountR:accountreducers,
  rapportR:rapportreducers
});
