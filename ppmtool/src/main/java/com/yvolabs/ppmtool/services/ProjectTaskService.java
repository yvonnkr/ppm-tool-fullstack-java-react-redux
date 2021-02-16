package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.Backlog;
import com.yvolabs.ppmtool.domain.Project;
import com.yvolabs.ppmtool.domain.ProjectTask;
import com.yvolabs.ppmtool.exceptions.ProjectNotFoundException;
import com.yvolabs.ppmtool.repositories.BacklogRepository;
import com.yvolabs.ppmtool.repositories.ProjectRepository;
import com.yvolabs.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {
    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    public ProjectTaskService(ProjectRepository projectRepository, BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            //set the BL to the PT
            projectTask.setBacklog(backlog);

            // Get BL sequence
            Integer backlogSequence = backlog.getPTSequence();

            // Update the BL sequence
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);


            // Add sequence to Project Task
            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            //Initial priority when priority is null
            if (projectTask.getPriority() == null) {
                // later will also need to check if(projectTask.getPriority() == 0 ) to handle ui form
                projectTask.setPriority(3);
            }
            //Initial status when status is null
            if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
                // could use enums instead
            }

            return projectTaskRepository.save(projectTask);

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }

    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        Project project = projectRepository.findByProjectIdentifier(id);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: '" + id + "' does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
