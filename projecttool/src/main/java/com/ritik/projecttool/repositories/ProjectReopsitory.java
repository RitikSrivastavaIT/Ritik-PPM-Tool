package com.ritik.projecttool.repositories;

import com.ritik.projecttool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectReopsitory extends CrudRepository<Project, Long> {

    Project findByProjectIdentifier(String projectId);


}
