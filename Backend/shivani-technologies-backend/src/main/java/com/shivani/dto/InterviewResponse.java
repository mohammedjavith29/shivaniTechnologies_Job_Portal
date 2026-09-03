package com.shivani.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class InterviewResponse {

    private Long interviewId;

    private String candidateName;
    private String companyName;
    private String jobTitle;

    private String interviewerName;
    private LocalDate interviewDate;
    private LocalTime interviewTime;

    private String meetingLink;
    private String location;
    private String status;
    private String remarks;

    public InterviewResponse() {
    }

    // Generate getters and setters
}