package com.shivani.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class InterviewRequest {

    private Long candidateId;
    private Long companyId;
    private Long jobId;

    private String interviewerName;
    private LocalDate interviewDate;
    private LocalTime interviewTime;

    private String meetingLink;
    private String location;
    private String status;
    private String remarks;

    public InterviewRequest() {
    }

    // Generate getters and setters
}