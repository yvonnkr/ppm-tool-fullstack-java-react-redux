import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/securityActions";
import { displayErrorMessage } from "../../helpers/validationErrors";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    password: "",
    errors: {},
  });

  const { username, password, errors } = state;

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

    const userDetails = {
      username,
      password,
    };

    dispatch(login(userDetails));
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>

            {(errors.username || errors.password) &&
              displayErrorMessage(`${errors.username} or ${errors.password}`)}

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
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

export default Login;
