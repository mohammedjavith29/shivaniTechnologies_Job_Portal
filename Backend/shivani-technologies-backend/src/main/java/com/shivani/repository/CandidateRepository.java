package com.shivani.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.entity.Candidate;

public interface CandidateRepository
        extends JpaRepository<Candidate, Long> {

    Optional<Candidate> findByEmail(String email);

    Optional<Candidate> findByMobile(String mobile);
}