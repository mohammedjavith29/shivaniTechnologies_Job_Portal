package com.shivani.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivani.entity.Employer;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {

}