package com.yvolabs.ppmtool.exceptions;

public class ProjectNotFoundExceptionResponse {
    private String ProjectNotfound;

    public ProjectNotFoundExceptionResponse(String projectNotfound) {
        ProjectNotfound = projectNotfound;
    }

    public String getProjectNotfound() {
        return ProjectNotfound;
    }

    public void setProjectNotfound(String projectNotfound) {
        ProjectNotfound = projectNotfound;
    }
}
