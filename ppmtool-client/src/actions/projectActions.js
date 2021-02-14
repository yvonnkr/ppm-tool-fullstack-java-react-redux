import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
} from "../actions/types";
import { actionErrorsPayload } from "../helpers/actionErrors";

export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8080/api/projects`, project);

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

    const { data } = await axios.get(`http://localhost:8080/api/projects`);

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

    const { data } = await axios.get(
      `http://localhost:8080/api/projects/${id}`
    );

    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: data,
    });

    //TODO: history
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};
