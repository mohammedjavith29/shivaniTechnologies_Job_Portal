package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.Company;
import com.shivani.service.CompanyService;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping
    public Company saveCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }
    
    @GetMapping("/pending")
    public List<Company> getPendingCompanies() {

        return companyService.getPendingCompanies();
    }
    
    @PutMapping("/{id}/verify")
    public Company verifyCompany(@PathVariable Long id) {

        return companyService.verifyCompany(id);
    }
    
    @PutMapping("/{id}/reject")
    public Company rejectCompany(@PathVariable Long id) {

        return companyService.rejectCompany(id);
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id,
                                 @RequestBody Company company) {
        return companyService.updateCompany(id, company);
    }

    @DeleteMapping("/{id}")
    public String deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return "Company Deleted Successfully";
    }
}