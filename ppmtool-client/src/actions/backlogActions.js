import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types.js";
import { actionErrorsPayload } from "../helpers/actionErrors";

export const addProjectTask = (backlog_id, project_task, history) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, project_task);

    dispatch({ type: CLEAR_ERRORS });

    history.push(`/projectBoard/${backlog_id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};
