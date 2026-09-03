package com.shivani.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "job_locations")
public class JobLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false, unique = true)
    private String locationName;

    @Column(length = 500)
    private String description;

    public JobLocation() {
    }

    public JobLocation(Long locationId, String locationName, String description) {
        this.locationId = locationId;
        this.locationName = locationName;
        this.description = description;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}