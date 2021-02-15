package com.yvolabs.ppmtool.services;

import com.yvolabs.ppmtool.domain.Backlog;
import com.yvolabs.ppmtool.domain.ProjectTask;
import com.yvolabs.ppmtool.repositories.BacklogRepository;
import com.yvolabs.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {
    private BacklogRepository backlogRepository;
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    public ProjectTaskService(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        // PTs to be added to a specific project (project != null meaning backlog(BL) also exists)
        // todo: handle project not found  exceptions

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        //set the BL to the PT
        projectTask.setBacklog(backlog);

        //sequence = (projectIdentifier + PTSequence)

        // Get BL sequence
        Integer backlogSequence = backlog.getPTSequence();

        // Update the BL sequence
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);


        // Add sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //Initial priority when priority is null
        if(projectTask.getPriority() == null){
            // later will also need to check if(projectTask.getPriority() == 0 ) to handle ui form
            projectTask.setPriority(3);
        }
        //Initial status when status is null
        if(projectTask.getStatus() == "" || projectTask.getStatus() == null){
            projectTask.setStatus("TO_DO");
            // could use enums instead
        }

        return projectTaskRepository.save(projectTask);

    }
}
