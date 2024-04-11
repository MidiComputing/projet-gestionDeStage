import axios from "axios";
import {
  AUTHFAILED,
  LOADING,
  SIGNINSUCCESS,
  SIGNUPSUCCESS,
  LOGOUT,
  CURRENTUSERAUTH,
} from "../actiontypes/usertypes";

const baseURL = "http://localhost:4500/auth/";
/**
 *@method POST /auth/signup
 *@description register a new user
 *@access public
 */
export const addUser = (newUserData) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { data } = await axios.post(baseURL + "signup", { ...newUserData });

    dispatch({ type: SIGNUPSUCCESS, payload: data.msg });

    if (data.msg) {
      alert(data.msg);
    }
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((el) => alert(el.msg));
    }
    if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
  }
};

/**
 *@method POST /auth/signin
 *@description login user
 *@access public
 */

export const loginUser = (UserLoginData, navigate) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { data } = await axios.post(baseURL + "signin", { ...UserLoginData });

    const { userID } = data;

    dispatch({ type: SIGNINSUCCESS, payload: data });

    if (data.msg) {
      alert(data.msg);
    }
    data.user.role == "admin"
      ? navigate("/admin")
      : data.user.role == "teacher"
      ? navigate("/teacher")
      : navigate("/student");
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((el) => alert(el.msg));
    }
    if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
  }
};

/**
 *@method GET /auth/
 *@description  utilisateur authentifié
 *@access private
 */
export const getUser = () => async (dispatch) => {
  dispatch({ type: LOADING });

  const opts = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  try {
    const { data } = await axios.get(baseURL, opts);
    dispatch({ type: CURRENTUSERAUTH, payload: data.user });
    if (data.msg) {
      alert(data.msg);
    }
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
  }
};

//logout
export const logout = () => ({
  type: LOGOUT,
});
