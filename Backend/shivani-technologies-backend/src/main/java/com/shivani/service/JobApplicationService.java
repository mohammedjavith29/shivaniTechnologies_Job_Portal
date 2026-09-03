package com.shivani.service;

import java.util.List;

import com.shivani.entity.JobApplication;

public interface JobApplicationService {

    JobApplication save(JobApplication application);

    List<JobApplication> getAll();

    JobApplication getById(Long id);

    JobApplication update(Long id, JobApplication application);

    void delete(Long id);

}