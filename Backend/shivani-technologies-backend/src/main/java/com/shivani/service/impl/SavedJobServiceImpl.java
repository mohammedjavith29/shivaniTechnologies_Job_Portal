package com.shivani.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Candidate;
import com.shivani.entity.Job;
import com.shivani.entity.SavedJob;
import com.shivani.repository.CandidateRepository;
import com.shivani.repository.JobRepository;
import com.shivani.repository.SavedJobRepository;
import com.shivani.service.SavedJobService;

@Service
public class SavedJobServiceImpl implements SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Override
    public SavedJob saveJob(Long candidateId, Long jobId) {

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Check if already saved
        if (savedJobRepository
                .findByCandidateCandidateIdAndJobJobId(candidateId, jobId)
                .isPresent()) {

            throw new RuntimeException("Job already saved");
        }

        SavedJob savedJob = new SavedJob();

        savedJob.setCandidate(candidate);
        savedJob.setJob(job);
        savedJob.setSavedDate(LocalDateTime.now());

        return savedJobRepository.save(savedJob);
    }

    @Override
    public List<SavedJob> getSavedJobs(Long candidateId) {

        return savedJobRepository.findByCandidateCandidateId(candidateId);
    }

    @Override
    public void removeSavedJob(Long savedJobId) {

        savedJobRepository.deleteById(savedJobId);

    }

}