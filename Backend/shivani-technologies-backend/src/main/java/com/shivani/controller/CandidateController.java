package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.shivani.dto.CandidateLoginRequest;
import com.shivani.dto.CandidateOtpRequest;
import com.shivani.dto.CandidateProfileResponse;
import com.shivani.entity.Candidate;
import com.shivani.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

    @Autowired
    private CandidateService service;


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Candidate candidate) {

        try {

            Candidate savedCandidate =
                    service.registerCandidate(candidate);

            return ResponseEntity.ok(savedCandidate);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // SEND OTP
    // =========================

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(
            @RequestParam String email) {

        try {

            String response =
                    service.sendOtp(email);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // VERIFY OTP
    // =========================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody CandidateOtpRequest request) {

        try {

            String response =
                    service.verifyOtp(
                            request.getEmail(),
                            request.getOtp()
                    );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // CANDIDATE LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody CandidateLoginRequest request) {

        try {

            String token =
                    service.loginCandidate(
                            request.getEmail(),
                            request.getPassword()
                    );

            return ResponseEntity.ok(token);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // CANDIDATE PROFILE
    // =========================

    @GetMapping("/profile")
    public ResponseEntity<?> getMyProfile(
            Authentication authentication) {

        try {

            if (authentication == null) {

                return ResponseEntity
                        .status(401)
                        .body("Authentication required");
            }

            String email =
                    authentication.getName();

            System.out.println(
                    "Profile requested by: "
                            + email
            );

            CandidateProfileResponse profile =
                    service.getCandidateProfile(email);

            return ResponseEntity.ok(profile);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // GET ALL CANDIDATES
    // =========================

    @GetMapping
    public List<Candidate> getAllCandidates() {

        return service.getAllCandidates();
    }


    // =========================
    // GET CANDIDATE BY ID
    // =========================

    @GetMapping("/{id}")
    public Candidate getCandidate(
            @PathVariable Long id) {

        return service.getCandidateById(id);
    }


    // =========================
    // UPDATE CANDIDATE
    // =========================

    @PutMapping("/{id}")
    public Candidate updateCandidate(
            @PathVariable Long id,
            @RequestBody Candidate candidate) {

        return service.updateCandidate(
                id,
                candidate
        );
    }


    // =========================
    // DELETE CANDIDATE
    // =========================

    @DeleteMapping("/{id}")
    public String deleteCandidate(
            @PathVariable Long id) {

        service.deleteCandidate(id);

        return "Candidate Deleted Successfully";
    }
}