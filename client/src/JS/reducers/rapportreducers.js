import {
  RAPPORTFAILED,
  RAPPORTLOADING,
  CREATEREPORTSUCCESS,
  DOWNLOAD_REPORT_SUCCESS,
  DOWNLOAD_REPORT_FAILED,
  GETALLREPORTSSUCCESS,
} from "../actiontypes/rapporttypes";

const initialState = {
  loading: true,
  reports: [],
  error: null,
  downloadLoading: false,
  downloadError: null,
};

export const rapportreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case RAPPORTLOADING:
      return { ...state, loading: true };

    case CREATEREPORTSUCCESS:
      return { ...state, loading: false };

    case RAPPORTFAILED:
      return { ...state, error: payload, loading: false };

    case DOWNLOAD_REPORT_SUCCESS:
      return { ...state, downloadLoading: false };

    case DOWNLOAD_REPORT_FAILED:
      return { ...state, downloadError: payload, downloadLoading: false };

    case GETALLREPORTSSUCCESS:
      return { ...state, reports: payload, loading: false }; 


    default:
      return state;
  }
};