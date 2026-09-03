package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.JobApplication;
import com.shivani.service.JobApplicationService;

@RestController
@RequestMapping("/api/job-applications")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    @PostMapping
    public JobApplication save(@RequestBody JobApplication application) {
        return service.save(application);
    }

    @GetMapping
    public List<JobApplication> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public JobApplication getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public JobApplication update(@PathVariable Long id,
                                 @RequestBody JobApplication application) {
        return service.update(id, application);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Job Application Deleted Successfully";
    }
}