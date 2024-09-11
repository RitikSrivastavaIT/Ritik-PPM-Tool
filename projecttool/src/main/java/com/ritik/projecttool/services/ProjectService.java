package com.ritik.projecttool.services;

import com.ritik.projecttool.domain.Project;
import com.ritik.projecttool.exceptions.ProjectIdException;
import com.ritik.projecttool.repositories.ProjectReopsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectReopsitory projectReopsitory;

    public Project saveOrUpdateProject(Project project){

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        return projectReopsitory.save(project);

        } catch (Exception e) {
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
        }

    }

    public Project findProjectByIdentifier(String projectId){

        Project project = projectReopsitory.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project with ID '"+projectId.toUpperCase()+"' does not exists");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectReopsitory.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = findProjectByIdentifier(projectId.toUpperCase());
        projectReopsitory.delete(project);
    }


}
