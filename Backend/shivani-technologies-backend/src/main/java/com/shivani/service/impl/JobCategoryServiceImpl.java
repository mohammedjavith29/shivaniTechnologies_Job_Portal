package com.shivani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.entity.JobCategory;
import com.shivani.repository.JobCategoryRepository;
import com.shivani.service.JobCategoryService;

@Service
public class JobCategoryServiceImpl implements JobCategoryService {

    @Autowired
    private JobCategoryRepository categoryRepository;

    @Override
    public JobCategory saveCategory(JobCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<JobCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public JobCategory getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public JobCategory updateCategory(Long id, JobCategory category) {

        JobCategory existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        existing.setCategoryName(category.getCategoryName());
        existing.setDescription(category.getDescription());

        return categoryRepository.save(existing);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}