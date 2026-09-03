package com.shivani.service;

import java.util.List;

import com.shivani.entity.Employer;

public interface EmployerService {

    Employer saveEmployer(Employer employer);

    List<Employer> getAllEmployers();

    Employer getEmployerById(Long id);

    Employer updateEmployer(Long id, Employer employer);

    void deleteEmployer(Long id);

}