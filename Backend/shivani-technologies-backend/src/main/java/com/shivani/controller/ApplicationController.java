package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Application;
import com.shivani.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @PostMapping
    public Application saveApplication(@RequestBody Application application) {
        return service.saveApplication(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return service.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplication(@PathVariable Long id) {
        return service.getApplicationById(id);
    }

    @PutMapping("/{id}")
    public Application updateApplication(@PathVariable Long id,
                                         @RequestBody Application application) {
        return service.updateApplication(id, application);
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        service.deleteApplication(id);

        return "Application Deleted Successfully";
    }
}