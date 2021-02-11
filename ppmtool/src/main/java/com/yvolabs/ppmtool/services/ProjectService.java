package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.Project;
import com.yvolabs.ppmtool.exceptions.ProjectIdException;
import com.yvolabs.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdateProject(Project project) {

        String projectId = project.getProjectIdentifier().toUpperCase();

        try {
            project.setProjectIdentifier(projectId);
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + projectId + "' already exists");
        }

    }

    public Project findProjectByIdentifier(String projectId) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exists");
        }

        return project;

        /*
        return Optional.ofNullable(projectRepository.findByProjectIdentifier(projectId.toUpperCase()))
                .orElseThrow(() -> new ProjectIdException("Project ID '" + projectId + "' does not exists"));
         */

    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }
}
