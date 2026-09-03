package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.JobApplication;
import com.shivani.repository.JobApplicationRepository;
import com.shivani.service.JobApplicationService;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository repository;

    @Override
    public JobApplication save(JobApplication application) {
        return repository.save(application);
    }

    @Override
    public List<JobApplication> getAll() {
        return repository.findAll();
    }

    @Override
    public JobApplication getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Application Not Found"));
    }

    @Override
    public JobApplication update(Long id, JobApplication application) {

        JobApplication old = getById(id);

        old.setCandidateId(application.getCandidateId());
        old.setJobId(application.getJobId());
        old.setAppliedDate(application.getAppliedDate());
        old.setStatus(application.getStatus());
        old.setRemarks(application.getRemarks());

        return repository.save(old);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}