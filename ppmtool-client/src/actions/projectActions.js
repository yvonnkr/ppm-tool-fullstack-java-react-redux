import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import { actionErrorsPayload } from "../helpers/actionErrors";

export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/project`, project);

    dispatch({
      type: CLEAR_ERRORS,
    });

    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};
