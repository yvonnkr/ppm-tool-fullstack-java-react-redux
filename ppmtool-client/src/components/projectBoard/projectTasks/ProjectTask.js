import React from "react";

const ProjectTask = ({ projectTask }) => {
  return (
    <div className="card mb-1 bg-light">
      <div className="card-header text-primary">
        ID: {projectTask.projectSequence} -- Priority: {projectTask.priority}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <a href="" className="btn btn-info">
          View / Update
        </a>

        <button className="btn btn-danger ml-4">Delete</button>
      </div>
    </div>
  );
};

export default ProjectTask;
