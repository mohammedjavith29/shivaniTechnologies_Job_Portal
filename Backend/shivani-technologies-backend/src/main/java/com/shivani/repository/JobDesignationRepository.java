package com.shivani.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivani.entity.JobDesignation;

@Repository
public interface JobDesignationRepository extends JpaRepository<JobDesignation, Long> {

    Optional<JobDesignation> findByDesignationName(String designationName);

}