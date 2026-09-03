package com.shivani.service;

import com.shivani.dto.ForgotPasswordRequest;
import com.shivani.dto.ResetPasswordRequest;
import com.shivani.dto.VerifyOtpRequest;

public interface ForgotPasswordService {

    String sendOtp(ForgotPasswordRequest request);

    String verifyOtp(VerifyOtpRequest request);

    String resetPassword(ResetPasswordRequest request);

}