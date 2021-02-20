import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import { actionErrorsPayload } from "../helpers/actionErrors";

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
