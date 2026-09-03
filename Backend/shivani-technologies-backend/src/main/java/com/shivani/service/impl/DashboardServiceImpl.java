package com.shivani.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.dto.DashboardDTO;
import com.shivani.repository.ApplicationRepository;
import com.shivani.repository.CandidateRepository;
import com.shivani.repository.CompanyRepository;
import com.shivani.repository.EmployeeRepository;
import com.shivani.repository.EmployerRepository;
import com.shivani.repository.InterviewRepository;
import com.shivani.repository.JobRepository;
import com.shivani.repository.UserRepository;
import com.shivani.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public DashboardDTO getDashboardData() {

        DashboardDTO dto = new DashboardDTO();

        dto.setCompanies(companyRepository.count());
        dto.setEmployers(employerRepository.count());
        dto.setEmployees(employeeRepository.count());
        dto.setCandidates(candidateRepository.count());
        dto.setJobs(jobRepository.count());
        dto.setApplications(applicationRepository.count());
        dto.setInterviews(interviewRepository.count());
        dto.setUsers(userRepository.count());

        return dto;
    }
}