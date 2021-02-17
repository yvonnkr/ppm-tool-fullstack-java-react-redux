import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Backlog from "./Backlog";
import { getBacklog } from "../../actions/backlogActions";

const ProjectBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    errors: {},
  });

  const { project_tasks } = useSelector((state) => state.backlog);
  const stateErrors = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getBacklog(id));
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: { ...stateErrors },
    }));
  }, [stateErrors]);

  let BoardContent;

  const boardAlgorithm = (errors, projectTasks) => {
    if (projectTasks.length < 1) {
      if (errors) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors && errors.projectNotfound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      }
    } else {
      return <Backlog projectTasks={projectTasks} />;
    }
  };

  BoardContent = boardAlgorithm(state.errors, project_tasks);

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-info mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />

      {BoardContent}
    </div>
  );
};

export default ProjectBoard;
