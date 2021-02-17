import React from "react";
import { useParams, Link } from "react-router-dom";
import Backlog from "./Backlog";

const ProjectBoard = () => {
  const { id } = useParams();

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
