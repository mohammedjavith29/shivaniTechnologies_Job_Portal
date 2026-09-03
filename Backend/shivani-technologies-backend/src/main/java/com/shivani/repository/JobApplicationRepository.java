package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivani.entity.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

}