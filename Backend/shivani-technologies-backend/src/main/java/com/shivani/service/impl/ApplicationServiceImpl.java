package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Application;
import com.shivani.repository.ApplicationRepository;
import com.shivani.service.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository repository;

    @Override
    public Application saveApplication(Application application) {
        return repository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {
        return repository.findAll();
    }

    @Override
    public Application getApplicationById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Application updateApplication(Long id, Application application) {

        Application existing = repository.findById(id).orElse(null);

        if (existing != null) {

            existing.setCandidateName(application.getCandidateName());
            existing.setEmail(application.getEmail());
            existing.setJobTitle(application.getJobTitle());
            existing.setCompanyName(application.getCompanyName());
            existing.setResume(application.getResume());
            existing.setStatus(application.getStatus());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }

}