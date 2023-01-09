
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log("login success from api calls file front end")
    dispatch(loginSuccess(res.data));
   
  } catch (err) {
    console.log("login failed from api calls file front end")
    dispatch(loginFailure());
  }
};