package com.shivani.service;

import java.util.List;

import com.shivani.dto.CandidateProfileResponse;
import com.shivani.entity.Candidate;

public interface CandidateService {

    Candidate registerCandidate(
            Candidate candidate
    );

    String sendOtp(
            String email
    );

    String verifyOtp(
            String email,
            String otp
    );

    String loginCandidate(
            String email,
            String password
    );

    CandidateProfileResponse getCandidateProfile(
            String email
    );

    List<Candidate> getAllCandidates();

    Candidate getCandidateById(
            Long id
    );

    Candidate updateCandidate(
            Long id,
            Candidate candidate
    );

    void deleteCandidate(
            Long id
    );
}