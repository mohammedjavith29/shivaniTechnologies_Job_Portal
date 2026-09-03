package com.shivani.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employers")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employerId;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String contactPerson;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(length = 1000)
    private String address;

    private String website;

    public Employer() {
    }

    public Employer(Long employerId, String companyName, String contactPerson,
                    String email, String mobile, String address, String website) {
        this.employerId = employerId;
        this.companyName = companyName;
        this.contactPerson = contactPerson;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.website = website;
    }

    public Long getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Long employerId) {
        this.employerId = employerId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}