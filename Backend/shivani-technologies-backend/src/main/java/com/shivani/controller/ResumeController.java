package com.shivani.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.shivani.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    // Upload Resume
    @PostMapping("/upload/{candidateId}")
    public ResponseEntity<String> uploadResume(
            @PathVariable Long candidateId,
            @RequestParam("file") MultipartFile file) throws IOException {

        return ResponseEntity.ok(
                resumeService.uploadResume(candidateId, file)
        );
    }

    // Download Resume
    @GetMapping("/download/{candidateId}")
    public ResponseEntity<byte[]> downloadResume(
            @PathVariable Long candidateId) throws IOException {

        return resumeService.downloadResume(candidateId);
    }

    // Delete Resume
    @DeleteMapping("/{candidateId}")
    public ResponseEntity<String> deleteResume(
            @PathVariable Long candidateId) throws IOException {

        resumeService.deleteResume(candidateId);

        return ResponseEntity.ok("Resume Deleted Successfully");
    }
}