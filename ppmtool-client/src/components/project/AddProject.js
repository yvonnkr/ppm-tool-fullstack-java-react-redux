import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../actions/projectActions";

const AddProject = () => {
  const [state, setState] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
    errors: {},
  });

  const errors = useSelector((state) => state.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: { ...errors },
    }));
  }, [errors]);

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
      projectName: state.projectName,
      projectIdentifier: state.projectIdentifier,
      description: state.description,
      start_date: state.startDate,
      end_date: state.endDate,
    };

    dispatch(createProject(newProject, history));
  };

  return (
    <div>
      {state.errors.message ? <h1>{state.errors.message}</h1> : null}

      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
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
                    // required
                  />
                  <p>{state.errors.projectName}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={state.projectIdentifier}
                    onChange={handleChange}
                    // required
                  />
                  <p>{state.errors.projectIdentifier}</p>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    // required
                  />
                  <p>{state.errors.description}</p>
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="startDate"
                    value={state.startDate}
                    onChange={handleChange}
                    // required
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
                    // required
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
