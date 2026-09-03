package com.shivani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByCompanyNameIgnoreCase(String companyName);

    List<Job> findByLocationIgnoreCase(String location);

}