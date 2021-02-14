import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";
import {
  inputConditionalClassname,
  displayInputErrorMessage,
  displayErrorMessage,
} from "../../helpers/validationErrors";

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
  const {projectName,projectIdentifier,description,startDate,endDate,errors} = state

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, success, project } = useSelector((state) => state.project);
  const stateErrors = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getProject(id, history));
  }, [id, dispatch]);

  useEffect(() => {
    if (!loading && success) {
      setState((prevState) => ({
        ...prevState,
        id: project.id,
        projectName: project.projectName,
        projectIdentifier: project.projectIdentifier,
        description: project.description,
        startDate: project.start_date == null ? "" : project.start_date,
        endDate: project.end_date == null ? "" : project.end_date,
        errors: { ...stateErrors },
      }));
    }
  }, [loading, success, project, stateErrors]);

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
      projectName,
      projectIdentifier,
      description,
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
                  className={inputConditionalClassname(errors.projectName)}
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={handleChange}
                />
                {errors.projectName && displayInputErrorMessage(errors.projectName)} 
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <textarea
                  className={inputConditionalClassname(errors.description)}
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
                {errors.description && displayInputErrorMessage(errors.description)}
              </div>

              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="startDate"
                  value={startDate}
                  onChange={handleChange}
                />
              </div>
              
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="endDate"
                  value={endDate}
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
