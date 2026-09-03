package com.shivani.dto;

public class DashboardDTO {

    private long companies;
    private long employers;
    private long employees;
    private long candidates;
    private long jobs;
    private long applications;
    private long interviews;
    private long users;

    public DashboardDTO() {
    }

    public long getCompanies() {
        return companies;
    }

    public void setCompanies(long companies) {
        this.companies = companies;
    }

    public long getEmployers() {
        return employers;
    }

    public void setEmployers(long employers) {
        this.employers = employers;
    }

    public long getEmployees() {
        return employees;
    }

    public void setEmployees(long employees) {
        this.employees = employees;
    }

    public long getCandidates() {
        return candidates;
    }

    public void setCandidates(long candidates) {
        this.candidates = candidates;
    }

    public long getJobs() {
        return jobs;
    }

    public void setJobs(long jobs) {
        this.jobs = jobs;
    }

    public long getApplications() {
        return applications;
    }

    public void setApplications(long applications) {
        this.applications = applications;
    }

    public long getInterviews() {
        return interviews;
    }

    public void setInterviews(long interviews) {
        this.interviews = interviews;
    }

    public long getUsers() {
        return users;
    }

    public void setUsers(long users) {
        this.users = users;
    }
}