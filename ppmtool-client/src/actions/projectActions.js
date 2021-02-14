import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
} from "../actions/types";
import { actionErrorsPayload } from "../helpers/actionErrors";

export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/projects`, project);

    dispatch({ type: CLEAR_ERRORS });

    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: GET_PROJECTS_REQUEST });

    const { data } = await axios.get(`/api/projects`);

    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: GET_PROJECT_REQUEST });

    const { data } = await axios.get(`/api/projects/${id}`);

    dispatch({
      type: GET_PROJECT_SUCCESS,
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

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      `Are you sure? 
      This will delete the project and all the data related to it`
    )
  )
    try {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: DELETE_PROJECT_REQUEST });

      await axios.delete(`/api/projects/${id}`);

      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: actionErrorsPayload(error),
      });
    }
};
