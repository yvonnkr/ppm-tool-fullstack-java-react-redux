import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addProject" component={AddProject} />
      </div>
    </BrowserRouter>
  );
};

export default App;
