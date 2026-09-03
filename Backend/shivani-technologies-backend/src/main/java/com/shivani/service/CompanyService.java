package com.shivani.service;

import java.util.List;

import com.shivani.entity.Company;

public interface CompanyService {

    Company saveCompany(Company company);

    List<Company> getAllCompanies();

    Company getCompanyById(Long id);

    Company updateCompany(Long id, Company company);

    void deleteCompany(Long id);

    List<Company> getPendingCompanies();

    Company verifyCompany(Long id);

    Company rejectCompany(Long id);

}