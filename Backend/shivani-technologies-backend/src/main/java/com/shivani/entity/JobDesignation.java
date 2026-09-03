package com.shivani.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_designations")
public class JobDesignation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long designationId;

    @Column(nullable = false, unique = true)
    private String designationName;

    @Column(length = 500)
    private String description;

    public JobDesignation() {
    }

    public JobDesignation(Long designationId, String designationName, String description) {
        this.designationId = designationId;
        this.designationName = designationName;
        this.description = description;
    }

    public Long getDesignationId() {
        return designationId;
    }

    public void setDesignationId(Long designationId) {
        this.designationId = designationId;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}