package com.shivani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shivani.entity.JobCategory;
import com.shivani.service.JobCategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class JobCategoryController {

    @Autowired
    private JobCategoryService categoryService;

    @PostMapping
    public JobCategory saveCategory(@RequestBody JobCategory category) {
        return categoryService.saveCategory(category);
    }

    @GetMapping
    public List<JobCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public JobCategory getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public JobCategory updateCategory(@PathVariable Long id,
                                      @RequestBody JobCategory category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return "Category Deleted Successfully";
    }
}