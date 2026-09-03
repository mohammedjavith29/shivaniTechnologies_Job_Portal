package com.shivani.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    String uploadResume(Long candidateId, MultipartFile file) throws IOException;

    ResponseEntity<byte[]> downloadResume(Long candidateId) throws IOException;

    void deleteResume(Long candidateId) throws IOException;

}