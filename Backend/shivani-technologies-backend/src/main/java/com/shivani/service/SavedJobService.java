package com.shivani.service;

import java.util.List;

import com.shivani.entity.SavedJob;

public interface SavedJobService {

    // Save a job for a candidate
    SavedJob saveJob(Long candidateId, Long jobId);

    // Get all saved jobs of a candidate
    List<SavedJob> getSavedJobs(Long candidateId);

    // Remove a saved job
    void removeSavedJob(Long savedJobId);

}