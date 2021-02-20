import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import {
  inputConditionalClassname,
  displayInputErrorMessage,
} from "../../helpers/validationErrors";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  // prettier-ignore
  const {username,fullName,password,confirmPassword,errors} = state

  const stateErrors = useSelector((state) => state.errors);
  const { validToken } = useSelector((state) => state.security);

  useEffect(() => {
    if (validToken) {
      history.push("/dashboard");
    }

    setState((prevState) => ({
      ...prevState,
      errors: { ...stateErrors },
    }));
  }, [stateErrors, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      fullName,
      password,
      confirmPassword,
    };

    dispatch(createNewUser(newUser, history));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form action="create-profile.html" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={inputConditionalClassname(errors.fullName)}
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={handleChange}
                />
                {errors.fullName && displayInputErrorMessage(errors.fullName)}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={inputConditionalClassname(errors.username)}
                  placeholder="Email Address (Username)"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                {errors.username && displayInputErrorMessage(errors.username)}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={inputConditionalClassname(errors.password)}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                {errors.password && displayInputErrorMessage(errors.password)}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={inputConditionalClassname(errors.confirmPassword)}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword &&
                  displayInputErrorMessage(errors.confirmPassword)}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
