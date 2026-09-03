package com.shivani.dto;

public class DashboardResponse {

    private long users;
    private long companies;
    private long categories;
    private long jobs;
    private long skills;
    private long locations;

    public DashboardResponse() {
    }

    public DashboardResponse(long users,
                             long companies,
                             long categories,
                             long jobs,
                             long skills,
                             long locations) {

        this.users = users;
        this.companies = companies;
        this.categories = categories;
        this.jobs = jobs;
        this.skills = skills;
        this.locations = locations;
    }

    public long getUsers() {
        return users;
    }

    public void setUsers(long users) {
        this.users = users;
    }

    public long getCompanies() {
        return companies;
    }

    public void setCompanies(long companies) {
        this.companies = companies;
    }

    public long getCategories() {
        return categories;
    }

    public void setCategories(long categories) {
        this.categories = categories;
    }

    public long getJobs() {
        return jobs;
    }

    public void setJobs(long jobs) {
        this.jobs = jobs;
    }

    public long getSkills() {
        return skills;
    }

    public void setSkills(long skills) {
        this.skills = skills;
    }

    public long getLocations() {
        return locations;
    }

    public void setLocations(long locations) {
        this.locations = locations;
    }

}