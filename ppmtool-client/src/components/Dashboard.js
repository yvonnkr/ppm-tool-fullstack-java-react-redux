import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "./project/ProjectItem";
import CreateProjectButton from "./project/CreateProjectButton";
import { getProjects } from "../actions/projectActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />

            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
