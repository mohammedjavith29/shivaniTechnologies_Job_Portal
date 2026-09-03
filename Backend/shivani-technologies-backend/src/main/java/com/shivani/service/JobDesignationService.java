package com.shivani.service;

import java.util.List;

import com.shivani.entity.JobDesignation;

public interface JobDesignationService {

    JobDesignation saveDesignation(JobDesignation designation);

    List<JobDesignation> getAllDesignations();

    JobDesignation getDesignationById(Long id);

    JobDesignation updateDesignation(Long id, JobDesignation designation);

    void deleteDesignation(Long id);

}