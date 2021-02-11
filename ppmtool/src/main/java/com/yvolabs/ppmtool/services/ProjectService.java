package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.Project;
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

    public Project saveOrUpdateProject(Project project){

        // logic
        return projectRepository.save(project);

    }
}
