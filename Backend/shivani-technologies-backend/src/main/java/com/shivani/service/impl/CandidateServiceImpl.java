package com.shivani.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shivani.dto.CandidateProfileResponse;
import com.shivani.entity.Candidate;
import com.shivani.entity.CandidateOtp;
import com.shivani.repository.CandidateOtpRepository;
import com.shivani.repository.CandidateRepository;
import com.shivani.security.JwtService;
import com.shivani.service.CandidateService;
import com.shivani.service.EmailService;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository repository;

    @Autowired
    private CandidateOtpRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtService jwtService;


    // =====================================================
    // REGISTER CANDIDATE
    // =====================================================

    @Override
    public Candidate registerCandidate(Candidate candidate) {

        // Check email
        if (repository.findByEmail(candidate.getEmail()).isPresent()) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        // Check mobile
        if (candidate.getMobile() != null
                && !candidate.getMobile().trim().isEmpty()
                && repository.findByMobile(candidate.getMobile()).isPresent()) {

            throw new RuntimeException(
                    "Mobile number already exists"
            );
        }

        // Check password
        if (candidate.getPassword() == null
                || candidate.getPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "Password is required"
            );
        }

        // Encrypt password
        candidate.setPassword(
                passwordEncoder.encode(
                        candidate.getPassword()
                )
        );

        // Candidate must verify OTP
        candidate.setVerified(false);

        // Save candidate
        Candidate savedCandidate =
                repository.save(candidate);

        // Send OTP
        sendOtp(savedCandidate.getEmail());

        return savedCandidate;
    }


    // =====================================================
    // SEND OTP
    // =====================================================

    @Override
    @Transactional
    public String sendOtp(String email) {

        Candidate candidate =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                )
                        );

        // Already verified
        if (candidate.isVerified()) {

            return "Candidate is already verified";
        }

        // Generate 6 digit OTP
        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        // Delete previous OTP
        otpRepository.deleteByEmail(email);

        // Create OTP
        CandidateOtp candidateOtp =
                new CandidateOtp();

        candidateOtp.setEmail(email);
        candidateOtp.setOtp(otp);

        candidateOtp.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        otpRepository.save(candidateOtp);

        // Email subject
        String subject =
                "Shivani Technologies - Candidate OTP";

        // Email message
        String message =
                "Dear " + candidate.getFullName() + ",\n\n"
                + "Your OTP for Shivani Technologies "
                + "candidate verification is: "
                + otp + "\n\n"
                + "This OTP is valid for 5 minutes.\n\n"
                + "Regards,\n"
                + "Shivani Technologies";

        // Send email
        emailService.sendEmail(
                email,
                subject,
                message
        );

        return "OTP sent successfully";
    }


    // =====================================================
    // VERIFY OTP
    // =====================================================

    @Override
    @Transactional
    public String verifyOtp(
            String email,
            String otp) {

        Candidate candidate =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                )
                        );

        CandidateOtp candidateOtp =
                otpRepository
                        .findTopByEmailOrderByIdDesc(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        // Check OTP
        if (!candidateOtp.getOtp().equals(otp)) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // Check expiry
        if (LocalDateTime.now()
                .isAfter(candidateOtp.getExpiryTime())) {

            throw new RuntimeException(
                    "OTP expired"
            );
        }

        // Verify candidate
        candidate.setVerified(true);

        repository.save(candidate);

        // Delete used OTP
        otpRepository.deleteByEmail(email);

        return "Candidate verified successfully";
    }


    // =====================================================
    // CANDIDATE LOGIN
    // =====================================================

    @Override
    public String loginCandidate(
            String email,
            String password) {

        Candidate candidate =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        // Check email verification
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
        String token =
                jwtService.generateToken(
                        candidate.getEmail()
                );

        return token;
    }


    // =====================================================
    // GET LOGGED-IN CANDIDATE PROFILE
    // =====================================================

    @Override
    public CandidateProfileResponse getCandidateProfile(String email) {

        Candidate candidate = repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        return new CandidateProfileResponse(
                candidate.getCandidateId(),
                candidate.getFullName(),
                candidate.getEmail(),
                candidate.getMobile(),
                candidate.getQualification(),
                candidate.getExperience(),
                candidate.getSkills(),
                candidate.getLocation(),
                candidate.getResume(),
                candidate.isVerified()
        );
    }


    // =====================================================
    // GET ALL CANDIDATES
    // =====================================================

    @Override
    public List<Candidate> getAllCandidates() {

        return repository.findAll();
    }


    // =====================================================
    // GET CANDIDATE BY ID
    // =====================================================

    @Override
    public Candidate getCandidateById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate not found"
                        )
                );
    }


    // =====================================================
    // UPDATE CANDIDATE
    // =====================================================

    @Override
    public Candidate updateCandidate(
            Long id,
            Candidate candidate) {

        Candidate existing =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                )
                        );

        existing.setFullName(
                candidate.getFullName()
        );

        existing.setMobile(
                candidate.getMobile()
        );

        existing.setQualification(
                candidate.getQualification()
        );

        existing.setExperience(
                candidate.getExperience()
        );

        existing.setSkills(
                candidate.getSkills()
        );

        existing.setLocation(
                candidate.getLocation()
        );

        existing.setResume(
                candidate.getResume()
        );

        return repository.save(existing);
    }


    // =====================================================
    // DELETE CANDIDATE
    // =====================================================

    @Override
    public void deleteCandidate(
            Long id) {

        Candidate candidate =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                )
                        );

        repository.delete(candidate);
    }
}