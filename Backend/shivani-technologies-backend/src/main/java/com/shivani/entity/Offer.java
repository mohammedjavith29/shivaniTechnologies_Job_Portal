package com.shivani.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offerId;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    private JobApplication jobApplication;

    private LocalDate offerDate;

    private LocalDate joiningDate;

    private Double offeredSalary;

    private String designation;

    private String status;

    public Offer() {
    }

    public Long getOfferId() {
        return offerId;
    }

    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
    }

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
    }

    public LocalDate getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(LocalDate offerDate) {
        this.offerDate = offerDate;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public Double getOfferedSalary() {
        return offeredSalary;
    }

    public void setOfferedSalary(Double offeredSalary) {
        this.offeredSalary = offeredSalary;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}