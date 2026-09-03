package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.Company;
import com.shivani.repository.CompanyRepository;
import com.shivani.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company saveCompany(Company company) {

        if (company.getVerified() == null) {
            company.setVerified(false);
        }

        company.setVerificationStatus("Pending");

        return companyRepository.save(company);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getCompanyById(Long id) {

        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company Not Found"));
    }

    @Override
    public Company updateCompany(Long id, Company company) {

        Company existing = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company Not Found"));

        existing.setCompanyName(company.getCompanyName());
        existing.setEmail(company.getEmail());
        existing.setMobile(company.getMobile());
        existing.setWebsite(company.getWebsite());
        existing.setAddress(company.getAddress());
        existing.setCity(company.getCity());
        existing.setState(company.getState());
        existing.setCountry(company.getCountry());

        existing.setVerified(company.getVerified());
        existing.setVerificationStatus(company.getVerificationStatus());

        return companyRepository.save(existing);
    }

    @Override
    public void deleteCompany(Long id) {

        companyRepository.deleteById(id);
    }

    @Override
    public List<Company> getPendingCompanies() {

        return companyRepository.findByVerificationStatus("Pending");
    }

    @Override
    public Company verifyCompany(Long id) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company Not Found"));

        company.setVerified(true);
        company.setVerificationStatus("Verified");

        return companyRepository.save(company);
    }

    @Override
    public Company rejectCompany(Long id) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company Not Found"));

        company.setVerified(false);
        company.setVerificationStatus("Rejected");

        return companyRepository.save(company);
    }
}