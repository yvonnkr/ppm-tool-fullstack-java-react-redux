import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
} from "../actions/types";
import { GET_ERRORS } from "../actions/types";

const initialState = {
  projects: [],
  project: {},
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return { projects: [], project: {}, loading: true };
    case GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, loading: false };

    case GET_PROJECT_REQUEST:
      return { projects: [], project: {}, loading: true };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        loading: false,
        success: true,
      };

    case DELETE_PROJECT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (p) => p.projectIdentifier !== action.payload
        ),
      };

    case GET_ERRORS:
      return { ...state, loading: false };

    default:
      return state;
  }
};
