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
    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;
    private final ProjectTaskRepository projectTaskRepository;
    private final ProjectService projectService;

    @Autowired
    public ProjectTaskService(ProjectRepository projectRepository, BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectService projectService) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectService = projectService;
    }


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        Project project = projectService.findProjectByIdentifier(projectIdentifier, username); // throws
        Backlog backlog = project.getBacklog();

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

        //Initial status when status is null
        if (projectTask.getStatus() == null || projectTask.getStatus().equals("")) {
            projectTask.setStatus("TO_DO");
            // could use enums instead
        }

        //Initial priority when priority is null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }


        return projectTaskRepository.save(projectTask);


    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {

        projectService.findProjectByIdentifier(id, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id,String username) {
        projectService.findProjectByIdentifier(backlog_id , username);

        //make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + pt_id + "' not found");
        }

        //make sure that the backlog/project id in the path corresponds to the right project
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task '" + pt_id + "' does not exist in project: '" + backlog_id);
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id,String username) {

        findPTByProjectSequence(backlog_id, pt_id,username);
        ProjectTask projectTask;

        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);

    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id,username);

        projectTaskRepository.delete(projectTask);
    }
}
