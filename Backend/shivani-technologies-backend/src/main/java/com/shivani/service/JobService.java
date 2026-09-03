package com.shivani.service;

import java.util.List;

import com.shivani.entity.Job;

public interface JobService {

    Job saveJob(Job job);

    List<Job> getAllJobs();

    Job getJobById(Long id);

    Job updateJob(Long id, Job job);

    void deleteJob(Long id);

    List<Job> getJobsByCompany(String companyName);

    List<Job> getJobsByLocation(String location);

}