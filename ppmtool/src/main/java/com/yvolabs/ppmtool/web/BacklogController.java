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

@RestController
@RequestMapping("api/backlog")
@CrossOrigin("*")
public class BacklogController {
    private final MapValidationErrorService mapValidationErrorService;
    private ProjectTaskService projectTaskService;

    @Autowired
    public BacklogController(MapValidationErrorService mapValidationErrorService, ProjectTaskService projectTaskService) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.projectTaskService = projectTaskService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid
                                                     @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @PathVariable("backlog_id") String backlog_id) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorResult(result);
        if (errorMap != null) return errorMap;

        ProjectTask newProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask);
        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);

    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable("backlog_id") String backlog_id) {
        return projectTaskService.findBacklogById(backlog_id);

    }
}
