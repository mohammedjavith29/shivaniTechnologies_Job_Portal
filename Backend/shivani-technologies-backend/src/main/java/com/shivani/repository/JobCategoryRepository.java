package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivani.entity.JobCategory;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Long> {

}