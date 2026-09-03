package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Job;
import com.shivani.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public Job saveJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job Deleted Successfully";
    }

    @GetMapping("/company/{companyName}")
    public List<Job> getJobsByCompany(@PathVariable String companyName) {
        return jobService.getJobsByCompany(companyName);
    }

    @GetMapping("/location/{location}")
    public List<Job> getJobsByLocation(@PathVariable String location) {
        return jobService.getJobsByLocation(location);
    }
}