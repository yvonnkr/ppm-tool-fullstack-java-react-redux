import axios from "axios";
import jwt_decode from "jwt-decode";
import { actionErrorsPayload } from "../helpers/actionErrors";
import { setJWTToken } from "../helpers/securityUtils";
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post(`/api/users/register`, newUser);

    dispatch({ type: CLEAR_ERRORS });

    history.push("/login");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const login = (loginRequest) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });

  try {
    const { data } = await axios.post(`/api/users/login`, loginRequest);

    const token = data.token;

    localStorage.setItem("jwtToken", token);

    setJWTToken(token);

    const decodedToken = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};
