import { ACCOUNTFAILED, ACCOUNTLOADING, GETALLACCOUNTSSUCCESS } from "../actiontypes/accounttypes";

  
  const initialState = {
    loading: true,
    accounts: [],
    error: null,
  
  };
  
  export const accountreducers = (state = initialState, { type, payload }) => {
    switch (type) {
      case ACCOUNTLOADING:
        return { ...state, loading: true };
  
      case GETALLACCOUNTSSUCCESS:
        return { ...state, accounts: payload, loading: false };
  
      case ACCOUNTFAILED:
        return { ...state, error: payload, loading: false };
  
      default:
        return state;
    }
  };
  