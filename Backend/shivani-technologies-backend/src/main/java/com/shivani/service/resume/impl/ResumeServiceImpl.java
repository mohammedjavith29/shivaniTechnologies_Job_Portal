package com.shivani.service.resume.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shivani.entity.Candidate;
import com.shivani.entity.Resume;
import com.shivani.repository.CandidateRepository;
import com.shivani.repository.ResumeRepository;
import com.shivani.service.ResumeService;

@Service
public class ResumeServiceImpl implements ResumeService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Override
    public String uploadResume(Long candidateId, MultipartFile file) throws IOException {

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // Create uploads folder if it doesn't exist
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Unique filename
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        Files.write(filePath, file.getBytes());

        Resume resume = resumeRepository
                .findByCandidateCandidateId(candidateId)
                .orElse(new Resume());

        resume.setCandidate(candidate);
        resume.setFileName(fileName);
        resume.setFileType(file.getContentType());
        resume.setFilePath(filePath.toString());
        resume.setFileSize(file.getSize());

        resumeRepository.save(resume);

        // Save filename in Candidate table
        candidate.setResume(fileName);
        candidateRepository.save(candidate);

        return "Resume Uploaded Successfully";
    }

    @Override
    public ResponseEntity<byte[]> downloadResume(Long candidateId) throws IOException {

        Resume resume = resumeRepository.findByCandidateCandidateId(candidateId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        Path path = Paths.get(resume.getFilePath());

        byte[] file = Files.readAllBytes(path);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resume.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }

    @Override
    public void deleteResume(Long candidateId) throws IOException {

        Resume resume = resumeRepository.findByCandidateCandidateId(candidateId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        Path path = Paths.get(resume.getFilePath());

        Files.deleteIfExists(path);

        resumeRepository.delete(resume);

        Candidate candidate = candidateRepository.findById(candidateId).get();
        candidate.setResume(null);
        candidateRepository.save(candidate);
    }

}