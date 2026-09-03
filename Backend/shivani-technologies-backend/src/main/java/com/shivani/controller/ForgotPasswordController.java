package com.shivani.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.dto.ForgotPasswordRequest;
import com.shivani.dto.ResetPasswordRequest;
import com.shivani.dto.VerifyOtpRequest;
import com.shivani.service.ForgotPasswordService;

@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody ForgotPasswordRequest request) {
        return forgotPasswordService.sendOtp(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {
        return forgotPasswordService.verifyOtp(request);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        return forgotPasswordService.resetPassword(request);
    }
}