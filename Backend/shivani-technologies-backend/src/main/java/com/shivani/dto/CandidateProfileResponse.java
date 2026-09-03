package com.shivani.dto;

public class CandidateProfileResponse {

    private Long candidateId;
    private String fullName;
    private String email;
    private String mobile;
    private String qualification;
    private String experience;
    private String skills;
    private String location;
    private String resume;
    private boolean verified;

    public CandidateProfileResponse() {
    }

    public CandidateProfileResponse(
            Long candidateId,
            String fullName,
            String email,
            String mobile,
            String qualification,
            String experience,
            String skills,
            String location,
            String resume,
            boolean verified) {

        this.candidateId = candidateId;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.qualification = qualification;
        this.experience = experience;
        this.skills = skills;
        this.location = location;
        this.resume = resume;
        this.verified = verified;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}