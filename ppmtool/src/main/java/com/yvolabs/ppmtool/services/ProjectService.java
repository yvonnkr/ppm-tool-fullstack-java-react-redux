package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.Backlog;
import com.yvolabs.ppmtool.domain.Project;
import com.yvolabs.ppmtool.exceptions.ProjectIdException;
import com.yvolabs.ppmtool.repositories.BacklogRepository;
import com.yvolabs.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    public Project saveOrUpdateProject(Project project) {

        String projectId = project.getProjectIdentifier().toUpperCase();

        try {
            project.setProjectIdentifier(projectId);

            // case: create new project
            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectId);
            }

            // case: update project
            if(project.getId() != null){
                Backlog backlog = backlogRepository.findByProjectIdentifier(projectId);
                project.setBacklog(backlog);
            }

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


    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project with id '" + projectId + "' not found");
        }

        projectRepository.delete(project);
    }
}
