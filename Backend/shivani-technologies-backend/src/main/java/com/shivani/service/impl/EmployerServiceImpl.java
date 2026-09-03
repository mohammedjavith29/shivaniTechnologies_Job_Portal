package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Employer;
import com.shivani.repository.EmployerRepository;
import com.shivani.service.EmployerService;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Override
    public Employer saveEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    @Override
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    @Override
    public Employer getEmployerById(Long id) {
        return employerRepository.findById(id).orElse(null);
    }

    @Override
    public Employer updateEmployer(Long id, Employer employer) {

        Employer existingEmployer = employerRepository.findById(id).orElse(null);

        if (existingEmployer != null) {

            existingEmployer.setCompanyName(employer.getCompanyName());
            existingEmployer.setContactPerson(employer.getContactPerson());
            existingEmployer.setEmail(employer.getEmail());
            existingEmployer.setMobile(employer.getMobile());
            existingEmployer.setAddress(employer.getAddress());
            existingEmployer.setWebsite(employer.getWebsite());

            return employerRepository.save(existingEmployer);
        }

        return null;
    }

    @Override
    public void deleteEmployer(Long id) {
        employerRepository.deleteById(id);
    }

}