package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Interview;
import com.shivani.repository.InterviewRepository;
import com.shivani.service.InterviewService;

@Service
public class InterviewServiceImpl implements InterviewService {

    @Autowired
    private InterviewRepository repository;

    @Override
    public Interview saveInterview(Interview interview) {

        System.out.println("Saving Interview...");
        System.out.println(interview.getCandidateName());

        return repository.save(interview);
    }

    @Override
    public List<Interview> getAllInterviews() {
        return repository.findAll();
    }

    @Override
    public Interview getInterviewById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Not Found"));
    }

    @Override
    public Interview updateInterview(Long id, Interview interview) {

        Interview oldInterview = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Not Found"));

        oldInterview.setCandidateName(interview.getCandidateName());
        oldInterview.setCompanyName(interview.getCompanyName());
        oldInterview.setJobTitle(interview.getJobTitle());
        oldInterview.setInterviewDate(interview.getInterviewDate());
        oldInterview.setInterviewTime(interview.getInterviewTime());
        oldInterview.setMode(interview.getMode());
        oldInterview.setInterviewerName(interview.getInterviewerName());
        oldInterview.setStatus(interview.getStatus());
        oldInterview.setRemarks(interview.getRemarks());

        return repository.save(oldInterview);
    }

    @Override
    public void deleteInterview(Long id) {

        Interview interview = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Not Found"));

        repository.delete(interview);
    }
}