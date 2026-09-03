package com.shivani.dto;

public class CandidateOtpRequest {

    private String email;
    private String otp;

    public CandidateOtpRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}