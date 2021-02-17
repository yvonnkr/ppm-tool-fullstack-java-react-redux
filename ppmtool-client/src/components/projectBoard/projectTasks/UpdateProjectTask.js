import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectTask } from "../../../actions/backlogActions";

const UpdateProjectTask = () => {
  const [state, setState] = useState({
    id: "",
    projectSequence: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: "",
    dueDate: "",
    projectIdentifier: "",
    create_At: "",
    errors: {},
  });

  const {
    id,
    projectSequence,
    summary,
    acceptanceCriteria,
    status,
    priority,
    dueDate,
    projectIdentifier,
    create_At,
  } = useSelector((state) => state.backlog.project_task);
  const { loading, success } = useSelector((state) => state.backlog);

  const dispatch = useDispatch();
  const { backlog_id, pt_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProjectTask(backlog_id, pt_id, history));
  }, []);

  useEffect(() => {
    if (!loading && success) {
      setState((prevState) => ({
        ...prevState,
        id: id == null ? "" : id,
        projectSequence: projectSequence == null ? "" : projectSequence,
        summary: summary == null ? "" : summary,
        acceptanceCriteria:
          acceptanceCriteria == null ? "" : acceptanceCriteria,
        status: status == null ? "" : status,
        priority: priority == null ? "" : priority,
        dueDate: dueDate == null ? "" : dueDate,
        projectIdentifier: projectIdentifier == null ? "" : projectIdentifier,
        create_At: create_At == null ? "" : create_At,
      }));
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const UpdateProjectTask = {
      id: state.id,
      projectSequence: state.projectSequence,
      summary: state.summary,
      acceptanceCriteria: state.acceptanceCriteria,
      status: state.status,
      priority: state.priority,
      dueDate: state.dueDate,
      projectIdentifier: state.projectIdentifier,
      create_At: state.create_At,
    };

    console.log(UpdateProjectTask);
    //TODO: updateProjectTask action
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${backlog_id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">
              Project Name: {state.projectIdentifier} | Project Task ID:{" "}
              {state.projectSequence}{" "}
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="summary"
                  placeholder="Project Task summary"
                  value={state.summary}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={state.acceptanceCriteria}
                  onChange={handleChange}
                />
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={state.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={state.priority}
                  onChange={handleChange}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={state.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectTask;
