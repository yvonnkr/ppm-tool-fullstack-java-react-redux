import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../actions/projectActions";
import {
  inputConditionalClassname,
  displayInputErrorMessage,
  displayErrorMessage,
} from "../../helpers/validationErrors";

const AddProject = () => {
  const [state, setState] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
    errors: {},
  });

  // prettier-ignore
  const {projectName,projectIdentifier,description,startDate,endDate,errors} = state

  const stateErrors = useSelector((state) => state.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: { ...stateErrors },
    }));
  }, [stateErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      projectName,
      projectIdentifier,
      description,
      start_date: startDate,
      end_date: endDate,
    };

    dispatch(createProject(newProject, history));
  };

  // prettier-ignore
  return (
    <div>

      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">

              <h5 className="display-4 text-center">Create Project</h5>
              {errors.message &&  displayErrorMessage(errors.message)}
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
                    className={inputConditionalClassname(errors.projectIdentifier)}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    onChange={handleChange}
                  />

                   {errors.projectIdentifier && displayInputErrorMessage(errors.projectIdentifier)}               
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
    </div>
  );
};

export default AddProject;
