package com.shivani.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private Boolean enabled = true;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "otp")
    private String otp;

    @Column(name = "otp_expiry")
    private LocalDateTime otpExpiry;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // =========================
    // Constructors
    // =========================

    public User() {
    }

    public User(
            Long userId,
            String username,
            String email,
            String password,
            String mobile,
            Boolean enabled,
            LocalDateTime createdAt,
            String otp,
            LocalDateTime otpExpiry,
            Role role) {

        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.otp = otp;
        this.otpExpiry = otpExpiry;
        this.role = role;
    }

    // =========================
    // Getters and Setters
    // =========================

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public LocalDateTime getOtpExpiry() {
        return otpExpiry;
    }

    public void setOtpExpiry(LocalDateTime otpExpiry) {
        this.otpExpiry = otpExpiry;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}