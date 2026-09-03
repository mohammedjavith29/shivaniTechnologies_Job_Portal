package com.shivani.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.shivani.entity.CandidateOtp;

public interface CandidateOtpRepository
        extends JpaRepository<CandidateOtp, Long> {

    Optional<CandidateOtp> findTopByEmailOrderByIdDesc(String email);

    @Modifying
    @Query("DELETE FROM CandidateOtp c WHERE c.email = :email")
    void deleteByEmail(@Param("email") String email);
}