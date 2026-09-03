package com.shivani.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivani.dto.DashboardDTO;
import com.shivani.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/counts")
    public DashboardDTO getDashboardCounts() {
        return dashboardService.getDashboardData();
    }
}