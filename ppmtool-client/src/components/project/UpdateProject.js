import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";

const UpdateProject = () => {
  const [state, setState] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
    errors: {},
  });
  // prettier-ignore
  // const {projectName,projectIdentifier,description,startDate,endDate,errors} = state

  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const stateProject = useSelector((state) => state.project.project);
  const { loading, success } = useSelector((state) => state.project);
  const stateErrors = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getProject(id, history));
  }, [id, dispatch]);

  useEffect(() => {
    if (!loading && success) {
      setState((prevState) => ({
        ...prevState,
        id: stateProject.id,
        projectName: stateProject.projectName,
        projectIdentifier: stateProject.projectIdentifier,
        description: stateProject.description,
        startDate:
          stateProject.start_date == null ? "" : stateProject.start_date,
        endDate: stateProject.end_date == null ? "" : stateProject.end_date,
        errors: { ...stateErrors },
      }));
    }
  }, [loading, success, stateProject, stateErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updateProject = {
      id: state.id,
      projectName: state.projectName,
      projectIdentifier: state.projectIdentifier,
      description: state.description,
      start_date: state.startDate,
      end_date: state.endDate,
    };

    dispatch(createProject(updateProject, history));
  };

  // prettier-ignore
  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project</h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  name="projectName"
                  value={state.projectName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={state.projectIdentifier}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                />
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="startDate"
                  value={state.startDate}
                  onChange={handleChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="endDate"
                  value={state.endDate}
                  onChange={handleChange}
                />
              </div>

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
