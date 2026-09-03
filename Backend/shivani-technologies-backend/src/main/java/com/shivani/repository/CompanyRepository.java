package com.shivani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivani.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByVerificationStatus(String verificationStatus);

}