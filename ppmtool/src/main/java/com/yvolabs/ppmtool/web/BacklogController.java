package com.yvolabs.ppmtool.web;

import com.yvolabs.ppmtool.domain.ProjectTask;
import com.yvolabs.ppmtool.services.MapValidationErrorService;
import com.yvolabs.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/backlog")
@CrossOrigin("*")
public class BacklogController {
    private final MapValidationErrorService mapValidationErrorService;
    private final ProjectTaskService projectTaskService;

    @Autowired
    public BacklogController(MapValidationErrorService mapValidationErrorService, ProjectTaskService projectTaskService) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.projectTaskService = projectTaskService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid
                                                     @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @PathVariable("backlog_id") String backlog_id,
                                                     Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorResult(result);
        if (errorMap != null) return errorMap;

        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);

    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable("backlog_id") String backlog_id,Principal principal) {
        return projectTaskService.findBacklogById(backlog_id, principal.getName());

    }

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable("backlog_id") String backlog_id,
                                            @PathVariable("pt_id") String pt_id,
                                            Principal principal) {
        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlog_id, pt_id, principal.getName());
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable("backlog_id") String backlog_id,
                                               @PathVariable("pt_id") String pt_id,
                                               Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorResult(result);
        if (errorMap != null) return errorMap;

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_id, principal.getName());

        return new ResponseEntity<>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable("backlog_id") String backlog_id,
                                               @PathVariable("pt_id") String pt_id,
                                               Principal principal) {
        projectTaskService.deletePTByProjectSequence(backlog_id, pt_id, principal.getName());

        return new ResponseEntity<>("Project Task " + pt_id + " was deleted successfully", HttpStatus.OK);
    }
}

