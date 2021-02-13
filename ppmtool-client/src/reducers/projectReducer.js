import { GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS } from "../actions/types";
import { GET_ERRORS } from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  loading: false,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return { projects: [], project: {}, loading: true };
    case GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload, loading: false };
    case GET_ERRORS:
      return { ...state, loading: false };

    default:
      return state;
  }
};
