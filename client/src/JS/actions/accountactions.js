import axios from "axios";
import {
  ACCOUNTFAILED,
  ACCOUNTLOADING,
  GETALLACCOUNTSSUCCESS,
} from "../actiontypes/accounttypes";

const baseURL = "http://localhost:4500/account/";

 /**
 *@method GET /auth/
 *@description  get all users
 *@access authenticated user
 */
export const getAllAccounts = () => async (dispatch) => {
  dispatch({ type: ACCOUNTLOADING });

  const opts = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  try {
    const { data } = await axios.get(baseURL, opts);
    
    dispatch({ type: GETALLACCOUNTSSUCCESS, payload: data.accounts });
    if (data.msg) {
      alert(data.msg);
    }
  } catch (error) {
    dispatch({ type: ACCOUNTFAILED, payload: error });
    console.log(error);
  }
};
