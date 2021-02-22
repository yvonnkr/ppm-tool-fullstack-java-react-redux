import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { validToken, user } = useSelector((state) => state.security);

  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">
                Personal Project Management Tool
              </h1>
              <p className="lead">
                Create your account to join active projects or start your own
              </p>
              <hr />
              {!validToken && user && (
                <>
                  <Link
                    className="btn btn-lg btn-outline-info mr-2"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="btn btn-lg btn-outline-secondary mr-2"
                    to="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
