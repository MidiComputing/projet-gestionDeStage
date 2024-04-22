import {
  AUTHFAILED,
  LOADING,
  LOGOUT,
  SIGNINSUCCESS,
  SIGNUPSUCCESS,
  CURRENTUSERAUTH,
} from "../actiontypes/usertypes";

const initialState = {
  authloading: true,
  error: null,
  Alert: "",
  currentUser: {}, 
  isAuth: false,
  currentUserR: {},
};

export const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, authloading: true };

    case SIGNUPSUCCESS:
      return { ...state, authloading: false, Alert: payload };

    case SIGNINSUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        Alert: payload.msg,
        currentUser: payload.user, // Update currentUser with the authenticated user data
        authloading: false,
        isAuth: true,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        authloading: true,
        error: null,
        Alert: null,
        currentUser: {},
        isAuth: false,
      };

    case AUTHFAILED:
      return { ...state, error: payload, authloading: false };

    case CURRENTUSERAUTH:
      return {
        ...state,
        authloading: false,
        currentUser: payload,
        isAuth: true,
      };
      

    default:
      return state;
  }
};
