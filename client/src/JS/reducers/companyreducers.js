import {
  APPLICATIONFAILED,
  APPLICATIONLOADING,
  COMPANYFAILED,
  COMPANYLOADING,
  DELETECOMPANYSUCCESS,
  GETALLAPPLICATIONSUCCESS,
  GETALLCOMPANIESSUCCESS,
} from "../actiontypes/companytypes";

const initialState = {
  loading: true,
  companies: [],
  error: null,
  details: {},
  applications: [],
};

export const companyreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMPANYLOADING:
      return { ...state, loading: true };

    case GETALLCOMPANIESSUCCESS:
      return { ...state, companies: payload.companies, loading: false };

    case COMPANYFAILED:
      return { ...state, error: payload, loading: false };

    case DELETECOMPANYSUCCESS:
      return { ...state, Alert: payload };

    // applicationR

    case APPLICATIONLOADING:
      return { ...state, loading: true };

    case GETALLAPPLICATIONSUCCESS:
      return { ...state, applications: payload.applications, loading: false };

    case APPLICATIONFAILED:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
