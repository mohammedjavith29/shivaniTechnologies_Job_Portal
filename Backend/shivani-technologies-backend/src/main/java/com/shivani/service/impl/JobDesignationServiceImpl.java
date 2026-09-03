package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.JobDesignation;
import com.shivani.repository.JobDesignationRepository;
import com.shivani.service.JobDesignationService;

@Service
public class JobDesignationServiceImpl implements JobDesignationService {

    @Autowired
    private JobDesignationRepository designationRepository;

    @Override
    public JobDesignation saveDesignation(JobDesignation designation) {

        if (designationRepository.findByDesignationName(designation.getDesignationName()).isPresent()) {
            throw new RuntimeException("Designation already exists");
        }

        return designationRepository.save(designation);
    }

    @Override
    public List<JobDesignation> getAllDesignations() {
        return designationRepository.findAll();
    }

    @Override
    public JobDesignation getDesignationById(Long id) {
        return designationRepository.findById(id).orElse(null);
    }

    @Override
    public JobDesignation updateDesignation(Long id, JobDesignation designation) {

        JobDesignation existing = designationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Designation not found"));

        existing.setDesignationName(designation.getDesignationName());
        existing.setDescription(designation.getDescription());

        return designationRepository.save(existing);
    }

    @Override
    public void deleteDesignation(Long id) {
        designationRepository.deleteById(id);
    }
}