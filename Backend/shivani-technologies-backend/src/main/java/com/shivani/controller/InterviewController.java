package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Interview;
import com.shivani.service.InterviewService;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public Interview save(@RequestBody Interview interview) {

        System.out.println("Candidate = " + interview.getCandidateName());
        System.out.println("Company = " + interview.getCompanyName());
        System.out.println("Job = " + interview.getJobTitle());
        System.out.println("Date = " + interview.getInterviewDate());
        System.out.println("Time = " + interview.getInterviewTime());
        System.out.println("Mode = " + interview.getMode());
        System.out.println("Interviewer = " + interview.getInterviewerName());
        System.out.println("Status = " + interview.getStatus());
        System.out.println("Remarks = " + interview.getRemarks());

        return interviewService.saveInterview(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id);
    }

    @PutMapping("/{id}")
    public Interview updateInterview(@PathVariable Long id,
                                     @RequestBody Interview interview) {

        return interviewService.updateInterview(id, interview);
    }

    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id) {

        interviewService.deleteInterview(id);

        return "Interview Deleted Successfully";
    }
}