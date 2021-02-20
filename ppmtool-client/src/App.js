import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/Dashboard";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask";

import { handleLoginLogout } from "./helpers/handleLoginLogout";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//LOGIN-LOGOUT
const jwtToken = localStorage.jwtToken;
handleLoginLogout(jwtToken, store);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />

          {/* public routes */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {/* private routes */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          <Route
            exact
            path="/updateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
