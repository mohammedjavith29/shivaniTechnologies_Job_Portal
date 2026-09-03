package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.JobDesignation;
import com.shivani.service.JobDesignationService;

@RestController
@RequestMapping("/api/designations")
@CrossOrigin(origins = "http://localhost:3000")
public class JobDesignationController {

    @Autowired
    private JobDesignationService designationService;

    @PostMapping
    public JobDesignation saveDesignation(@RequestBody JobDesignation designation) {
        return designationService.saveDesignation(designation);
    }

    @GetMapping
    public List<JobDesignation> getAllDesignations() {
        return designationService.getAllDesignations();
    }

    @GetMapping("/{id}")
    public JobDesignation getDesignationById(@PathVariable Long id) {
        return designationService.getDesignationById(id);
    }

    @PutMapping("/{id}")
    public JobDesignation updateDesignation(@PathVariable Long id,
                                            @RequestBody JobDesignation designation) {
        return designationService.updateDesignation(id, designation);
    }

    @DeleteMapping("/{id}")
    public String deleteDesignation(@PathVariable Long id) {
        designationService.deleteDesignation(id);
        return "Designation Deleted Successfully";
    }
}