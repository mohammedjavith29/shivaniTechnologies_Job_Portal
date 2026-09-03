package com.shivani.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shivani.dto.ForgotPasswordRequest;
import com.shivani.dto.ResetPasswordRequest;
import com.shivani.dto.VerifyOtpRequest;
import com.shivani.entity.User;
import com.shivani.repository.UserRepository;
import com.shivani.service.ForgotPasswordService;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String sendOtp(ForgotPasswordRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        String otp = String.format("%06d", new Random().nextInt(999999));

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        // Later we will send this OTP via Email
        System.out.println("Generated OTP : " + otp);

        return "OTP Generated Successfully";
    }

    @Override
    public String verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp() == null) {
            throw new RuntimeException("OTP not generated");
        }

        if (!user.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        return "OTP Verified Successfully";
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Password Reset Successfully";
    }
}