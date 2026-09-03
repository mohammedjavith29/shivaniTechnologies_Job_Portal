package com.shivani.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.entity.SavedJob;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByCandidateCandidateId(Long candidateId);

    Optional<SavedJob> findByCandidateCandidateIdAndJobJobId(
            Long candidateId,
            Long jobId);

}