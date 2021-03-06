import {
  GET_BACKLOG,
  GET_PROJECT_TASK_REQUEST,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "../actions/types";

const initialState = {
  project_tasks: [],
  project_task: {},
};

export const backlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload,
      };

    case GET_PROJECT_TASK_REQUEST:
      return { project_tasks: [], project_task: {}, loading: true };
    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload,
        loading: false,
        success: true,
      };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (projectTask) => projectTask.projectSequence !== action.payload
        ),
      };

    default:
      return state;
  }
};
