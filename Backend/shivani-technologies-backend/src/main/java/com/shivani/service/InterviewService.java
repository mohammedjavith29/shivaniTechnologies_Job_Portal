package com.shivani.service;

import java.util.List;

import com.shivani.entity.Interview;

public interface InterviewService {

    Interview saveInterview(Interview interview);

    List<Interview> getAllInterviews();

    Interview getInterviewById(Long id);

    Interview updateInterview(Long id, Interview interview);

    void deleteInterview(Long id);
}