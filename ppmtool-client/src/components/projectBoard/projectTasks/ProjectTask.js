import React from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { useDispatch } from "react-redux";

const ProjectTask = ({ projectTask }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteProjectTask(
        projectTask.projectIdentifier,
        projectTask.projectSequence
      )
    );
  };

  let priorityString;
  let priorityClass;

  if (projectTask.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  }

  if (projectTask.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  }

  if (projectTask.priority === 3) {
    priorityClass = "bg-secondary text-light";
    priorityString = "LOW";
  }

  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority: {priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <Link
          to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
          className="btn btn-info"
        >
          View / Update
        </Link>

        <button className="btn btn-danger ml-4" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectTask;
