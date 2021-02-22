import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { validToken, user } = useSelector((state) => state.security);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const userIsAuthenticatedLinks = (
    <div
      className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
      id="mobile-nav"
    >
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user-circle mr-1" />
            {user.fullName}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const userIsNotAuthenticatedLinks = (
    <div
      className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
      id="mobile-nav"
    >
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Personal Project Management Tool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {validToken && user
          ? userIsAuthenticatedLinks
          : userIsNotAuthenticatedLinks}
      </div>
    </nav>
  );
};

export default Header;
