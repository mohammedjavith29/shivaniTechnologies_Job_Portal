package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Job;
import com.shivani.repository.JobRepository;
import com.shivani.service.JobService;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = jobRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setTitle(job.getTitle());
            existing.setDescription(job.getDescription());
            existing.setCompanyName(job.getCompanyName());
            existing.setLocation(job.getLocation());
            existing.setSalary(job.getSalary());
            existing.setExperience(job.getExperience());
            existing.setSkills(job.getSkills());
            existing.setPostedDate(job.getPostedDate());

            return jobRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public List<Job> getJobsByCompany(String companyName) {
        return jobRepository.findByCompanyNameIgnoreCase(companyName);
    }

    @Override
    public List<Job> getJobsByLocation(String location) {
        return jobRepository.findByLocationIgnoreCase(location);
    }
}