package com.shivani.service.candidateauth.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shivani.dto.CandidateLoginRequest;
import com.shivani.dto.CandidateLoginResponse;
import com.shivani.entity.Candidate;
import com.shivani.repository.CandidateRepository;
import com.shivani.security.JwtService;
import com.shivani.service.candidateauth.CandidateAuthService;

@Service
public class CandidateAuthServiceImpl
        implements CandidateAuthService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

//    @Override
//    public CandidateLoginResponse login(
//            CandidateLoginRequest request) {
//
//        Optional<Candidate> optionalCandidate =
//                candidateRepository.findByEmail(
//                        request.getEmail()
//                );
//
//        if (optionalCandidate.isEmpty()) {
//            throw new RuntimeException(
//                    "Invalid Email"
//            );
//        }
//
//        Candidate candidate =
//                optionalCandidate.get();
//
//        // Check OTP verification
//        if (!candidate.isVerified()) {
//            throw new RuntimeException(
//                    "Please verify your email before login"
//            );
//        }
//
//        // Check password
//        if (!passwordEncoder.matches(
//                request.getPassword(),
//                candidate.getPassword())) {
//
//            throw new RuntimeException(
//                    "Invalid Password"
//            );
//        }
//
//        // Generate JWT
//        String token =
//                jwtService.generateToken(
//                        candidate.getEmail()
//                );
//
//        return new CandidateLoginResponse(
//                "Candidate Login Successful",
//                token
//        );
//    }
    
    
    @Override
    public String loginCandidate(String email, String password) {

        Candidate candidate = candidateRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        ));

        // Candidate must verify email before login
        if (!candidate.isVerified()) {
            throw new RuntimeException(
                    "Please verify your email before login"
            );
        }

        // Check password
        if (!passwordEncoder.matches(
                password,
                candidate.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        // Generate JWT
        return jwtService.generateToken(
                candidate.getEmail()
        );
    }
}