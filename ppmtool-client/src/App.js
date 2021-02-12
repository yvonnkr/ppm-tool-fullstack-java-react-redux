import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
};

export default App;
