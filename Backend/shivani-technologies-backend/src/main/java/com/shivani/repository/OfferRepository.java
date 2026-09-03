package com.shivani.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.entity.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    Optional<Offer> findByJobApplicationApplicationId(Long applicationId);

    List<Offer> findByJobApplicationCandidateId(Long candidateId);

    List<Offer> findByJobApplicationJobId(Long jobId);

}