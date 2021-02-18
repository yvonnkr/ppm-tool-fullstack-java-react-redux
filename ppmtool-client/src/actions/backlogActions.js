import axios from "axios";
import { actionErrorsPayload } from "../helpers/actionErrors";
import { GET_ERRORS, CLEAR_ERRORS } from "./types.js";
import {
  GET_BACKLOG,
  GET_PROJECT_TASK_REQUEST,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "./types";

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

export const getBacklog = (backlog_id) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });

  try {
    const { data } = await axios.get(`/api/backlog/${backlog_id}`);

    dispatch({
      type: GET_BACKLOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const getProjectTask = (backlog_id, pt_id, history) => async (
  dispatch
) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: GET_PROJECT_TASK_REQUEST });

  try {
    const { data } = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });

    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  backlog_id,
  pt_id,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);

    dispatch({ type: CLEAR_ERRORS });

    history.push(`/projectBoard/${backlog_id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const deleteProjectTask = (backlog_id, pt_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting project task ${pt_id}, this action cannot be undone`
    )
  ) {
    try {
      dispatch({ type: CLEAR_ERRORS });

      await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);

      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: pt_id,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: actionErrorsPayload(error),
      });
    }
  }
};
