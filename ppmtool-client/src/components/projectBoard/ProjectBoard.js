import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Backlog from "./Backlog";
import { getBacklog } from "../../actions/backlogActions";

const ProjectBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const projectTasks = useSelector((state) => state.backlog.project_tasks);

  useEffect(() => {
    dispatch(getBacklog(id));
  }, []);

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-info mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <Backlog />
    </div>
  );
};

export default ProjectBoard;
