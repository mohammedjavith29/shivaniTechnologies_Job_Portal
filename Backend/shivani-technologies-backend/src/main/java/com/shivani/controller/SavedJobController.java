package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.SavedJob;
import com.shivani.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    // Save a Job
    @PostMapping
    public SavedJob saveJob(
            @RequestParam Long candidateId,
            @RequestParam Long jobId) {

        return savedJobService.saveJob(candidateId, jobId);
    }

    // Get All Saved Jobs
    @GetMapping("/{candidateId}")
    public List<SavedJob> getSavedJobs(
            @PathVariable Long candidateId) {

        return savedJobService.getSavedJobs(candidateId);
    }

    // Remove Saved Job
    @DeleteMapping("/{savedJobId}")
    public String removeSavedJob(
            @PathVariable Long savedJobId) {

        savedJobService.removeSavedJob(savedJobId);

        return "Saved Job Removed Successfully";
    }

}