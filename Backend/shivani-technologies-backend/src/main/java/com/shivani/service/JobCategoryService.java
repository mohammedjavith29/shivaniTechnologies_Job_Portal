package com.shivani.service;

import java.util.List;

import com.shivani.entity.JobCategory;

public interface JobCategoryService {

    JobCategory saveCategory(JobCategory category);

    List<JobCategory> getAllCategories();

    JobCategory getCategoryById(Long id);

    JobCategory updateCategory(Long id, JobCategory category);

    void deleteCategory(Long id);

}