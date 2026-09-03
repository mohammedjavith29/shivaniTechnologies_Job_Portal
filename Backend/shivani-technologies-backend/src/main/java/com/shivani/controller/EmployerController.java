package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Employer;
import com.shivani.service.EmployerService;

@RestController
@RequestMapping("/api/employers")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @PostMapping
    public Employer saveEmployer(@RequestBody Employer employer) {
        return employerService.saveEmployer(employer);
    }

    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    @GetMapping("/{id}")
    public Employer getEmployerById(@PathVariable Long id) {
        return employerService.getEmployerById(id);
    }

    @PutMapping("/{id}")
    public Employer updateEmployer(@PathVariable Long id,
                                   @RequestBody Employer employer) {

        return employerService.updateEmployer(id, employer);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployer(@PathVariable Long id) {

        employerService.deleteEmployer(id);

        return "Employer Deleted Successfully";
    }

}