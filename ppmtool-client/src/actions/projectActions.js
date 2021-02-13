import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";

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
      payload:
        error.response && error.response.data
          ? error.response.data
          : { message: error.message },
    });
  }
};
